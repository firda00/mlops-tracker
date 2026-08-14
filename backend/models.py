import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship

from database import Base, IS_POSTGRES

# Import pgvector Vector type if available on Postgres
try:
    from pgvector.sqlalchemy import Vector
    HAS_PGVECTOR = True
except ImportError:
    HAS_PGVECTOR = False

class Video(Base):
    __tablename__ = "videos"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    youtube_id = Column(String(50), index=True, nullable=False)
    url = Column(String(500), nullable=False)
    title = Column(String(500), nullable=False)
    duration = Column(Integer, default=0)
    summary_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    chunks = relationship("TranscriptChunk", back_populates="video", cascade="all, delete-orphan")
    quizzes = relationship("Quiz", back_populates="video", cascade="all, delete-orphan")
    flashcards = relationship("Flashcard", back_populates="video", cascade="all, delete-orphan")

class TranscriptChunk(Base):
    __tablename__ = "transcript_chunks"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    video_id = Column(String(36), ForeignKey("videos.id", ondelete="CASCADE"), nullable=False)
    start_time = Column(Float, nullable=False)
    end_time = Column(Float, nullable=False)
    start_timestamp = Column(String(20), nullable=False)
    text_content = Column(Text, nullable=False)

    # Use pgvector Vector(768) on PostgreSQL, otherwise JSON array
    if HAS_PGVECTOR and IS_POSTGRES:
        embedding = Column(Vector(768), nullable=True)
    else:
        embedding = Column(JSON, nullable=True)

    video = relationship("Video", back_populates="chunks")

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    video_id = Column(String(36), ForeignKey("videos.id", ondelete="CASCADE"), nullable=False)
    question = Column(Text, nullable=False)
    options_json = Column(JSON, nullable=False) # List of string options
    correct_option = Column(Integer, nullable=False) # 0-indexed correct option
    explanation = Column(Text, nullable=True)

    video = relationship("Video", back_populates="quizzes")

class Flashcard(Base):
    __tablename__ = "flashcards"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    video_id = Column(String(36), ForeignKey("videos.id", ondelete="CASCADE"), nullable=False)
    term = Column(String(255), nullable=False)
    definition = Column(Text, nullable=False)
    timestamp = Column(String(20), nullable=True)

    video = relationship("Video", back_populates="flashcards")
