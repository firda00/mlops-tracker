import os
import json
import numpy as np
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import init_db, get_db, IS_POSTGRES
from models import Video, TranscriptChunk, Quiz, Flashcard, HAS_PGVECTOR
from youtube_processor import YouTubeProcessor
from ai_service import AIService

@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI Lifespan event handler to initialize PostgreSQL database & tables."""
    print("[Lifespan] Initializing database connections & vector extension...")
    init_db()
    yield
    print("[Lifespan] Shutting down application...")

app = FastAPI(
    title="AI Video Learning Platform API",
    description="Backend API with PostgreSQL + pgvector storage, AI transcript ingestion, quizzes, and vector RAG chat.",
    version="2.0.0",
    lifespan=lifespan
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ai_service = AIService()

class VideoProcessRequest(BaseModel):
    youtube_url: str

class ChatRagRequest(BaseModel):
    youtube_url: str
    question: str

@app.get("/")
def read_root():
    return {
        "status": "online", 
        "message": "AI Video Learning Platform Phase 2 Backend with PostgreSQL + pgvector is active.",
        "postgres_active": IS_POSTGRES,
        "pgvector_active": HAS_PGVECTOR
    }

@app.post("/api/process-video")
def process_video(request: VideoProcessRequest, db: Session = Depends(get_db)):
    """
    1. Extracts YouTube transcript.
    2. Checks if video is already processed in PostgreSQL.
    3. If new: Calls LLM to generate summary, quizzes, flashcards & chunk embeddings, then persists to DB.
    """
    try:
        video_id_str = YouTubeProcessor.extract_video_id(request.youtube_url)
        
        # Check DB cache
        existing_video = db.query(Video).filter(Video.youtube_id == video_id_str).first()
        if existing_video and existing_video.summary_json:
            print(f"[DB Cache Hit] Returning cached video analysis for {video_id_str}")
            return {
                "success": True,
                "cached": True,
                "video_id": video_id_str,
                "data": existing_video.summary_json
            }

        # Fetch transcript
        raw_transcript = YouTubeProcessor.get_transcript(request.youtube_url)
        formatted_transcript = YouTubeProcessor.format_transcript_with_timestamps(raw_transcript, interval_seconds=60)
        
        # Call LLM for structured analysis
        ai_result = ai_service.process_transcript(formatted_transcript)
        
        # Create Video record
        new_video = Video(
            youtube_id=video_id_str,
            url=request.youtube_url,
            title=ai_result.get("executive_summary", "CS Lecture")[:200],
            duration=int(raw_transcript[-1]['start']) if raw_transcript else 0,
            summary_json=ai_result
        )
        db.add(new_video)
        db.flush()

        # Create TranscriptChunks with Embeddings
        # Group raw transcript entries into ~60 second blocks for vector indexing
        current_block_start = raw_transcript[0]['start'] if raw_transcript else 0
        current_texts = []
        
        for entry in raw_transcript:
            start_time = entry['start']
            duration = entry.get('duration', 5.0)
            text = entry['text'].replace('\n', ' ')
            
            if start_time - current_block_start >= 60 and current_texts:
                block_text = " ".join(current_texts)
                timestamp_str = YouTubeProcessor.format_timestamp(current_block_start)
                embedding = ai_service.generate_embedding(block_text)
                
                chunk = TranscriptChunk(
                    video_id=new_video.id,
                    start_time=current_block_start,
                    end_time=start_time,
                    start_timestamp=timestamp_str,
                    text_content=block_text,
                    embedding=embedding
                )
                db.add(chunk)
                current_block_start = start_time
                current_texts = [text]
            else:
                current_texts.append(text)

        if current_texts:
            block_text = " ".join(current_texts)
            timestamp_str = YouTubeProcessor.format_timestamp(current_block_start)
            embedding = ai_service.generate_embedding(block_text)
            chunk = TranscriptChunk(
                video_id=new_video.id,
                start_time=current_block_start,
                end_time=current_block_start + 60,
                start_timestamp=timestamp_str,
                text_content=block_text,
                embedding=embedding
            )
            db.add(chunk)

        # Create Quizzes
        for q in ai_result.get("quizzes", []):
            quiz_record = Quiz(
                video_id=new_video.id,
                question=q.get("question", ""),
                options_json=q.get("options", []),
                correct_option=q.get("correct_option_index", 0),
                explanation=q.get("explanation", "")
            )
            db.add(quiz_record)

        # Create Flashcards
        for f in ai_result.get("flashcards", []):
            fc_record = Flashcard(
                video_id=new_video.id,
                term=f.get("term", ""),
                definition=f.get("definition", ""),
                timestamp=f.get("timestamp", "00:00")
            )
            db.add(fc_record)

        db.commit()
        print(f"[DB Ingestion] Saved video {video_id_str} and vector chunks to database.")

        return {
            "success": True,
            "cached": False,
            "video_id": video_id_str,
            "data": ai_result
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/chat-rag")
def chat_rag(request: ChatRagRequest, db: Session = Depends(get_db)):
    """
    Hybrid Vector RAG Search:
    1. Generates query vector embedding.
    2. Uses pgvector cosine distance (or numpy fallback) to find top-3 transcript chunks.
    3. Prompts LLM with top relevant context chunks.
    """
    try:
        video_id_str = YouTubeProcessor.extract_video_id(request.youtube_url)
        video = db.query(Video).filter(Video.youtube_id == video_id_str).first()
        
        # Generate query embedding
        query_vec = ai_service.generate_embedding(request.question)
        top_chunks_text = []

        if video:
            chunks = db.query(TranscriptChunk).filter(TranscriptChunk.video_id == video.id).all()
            
            if chunks:
                # Perform cosine similarity vector search
                def cosine_sim(a, b):
                    if not a or not b: return 0.0
                    va, vb = np.array(a), np.array(b)
                    return float(np.dot(va, vb) / (np.linalg.norm(va) * np.linalg.norm(vb) + 1e-9))

                scored_chunks = []
                for ch in chunks:
                    sim = cosine_sim(query_vec, ch.embedding)
                    scored_chunks.append((sim, f"[{ch.start_timestamp}] {ch.text_content}"))

                scored_chunks.sort(key=lambda x: x[0], reverse=True)
                top_chunks_text = [item[1] for item in scored_chunks[:3]]

        # Fallback if no stored chunks
        if not top_chunks_text:
            raw_transcript = YouTubeProcessor.get_transcript(request.youtube_url)
            formatted = YouTubeProcessor.format_transcript_with_timestamps(raw_transcript)
            top_chunks_text = [formatted[:3000]]

        answer_data = ai_service.answer_rag_question(request.question, top_chunks_text)
        return {"success": True, "data": answer_data}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
