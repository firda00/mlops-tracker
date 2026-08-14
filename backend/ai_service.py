import os
import json
import numpy as np
from typing import Dict, Any, List, Optional
from pydantic import BaseModel

try:
    from google import genai
    from google.genai import types
    HAS_GENAI = True
except ImportError:
    HAS_GENAI = False

class QuizQuestion(BaseModel):
    question: str
    options: list[str]
    correct_option_index: int
    explanation: str
    timestamp: str

class FlashcardSchema(BaseModel):
    term: str
    definition: str
    timestamp: str

class VideoModule(BaseModel):
    title: str
    start_timestamp: str
    end_timestamp: str
    summary: str
    key_takeaway: str

class ProcessedLectureSummary(BaseModel):
    executive_summary: str
    key_takeaways: list[str]
    modules: list[VideoModule]
    quizzes: list[QuizQuestion]
    flashcards: list[FlashcardSchema]

SYSTEM_PROMPT = """
You are an expert Computer Science & AI Professor.
Your task is to analyze the provided YouTube lecture transcript (which includes timestamps like [MM:SS]) 
and generate a comprehensive, highly structured study guide for a student.

Output MUST strictly follow the JSON schema:
1. "executive_summary": High level summary of the lecture.
2. "key_takeaways": 4-6 bullet points highlighting core conceptual insights.
3. "modules": Break down the lecture into 3-6 logical modules with exact timestamps (start_timestamp, end_timestamp) from the transcript.
4. "quizzes": 3-5 multiple-choice questions testing understanding of concepts discussed in the lecture, with explanations and timestamp references.
5. "flashcards": 4-8 key terms/definitions covered in the lecture with timestamp references.
"""

class AIService:
    """LLM Processing & Embedding Service using Gemini API."""

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY")
        if HAS_GENAI and self.api_key:
            self.client = genai.Client(api_key=self.api_key)
        else:
            self.client = None

    def generate_embedding(self, text: str) -> List[float]:
        """Generates a 768-dimensional vector embedding using text-embedding-004."""
        if not text.strip():
            return [0.0] * 768

        if self.client:
            try:
                result = self.client.models.embed_content(
                    model='text-embedding-004',
                    contents=text
                )
                if hasattr(result, 'embedding') and hasattr(result.embedding, 'values'):
                    return list(result.embedding.values)
                elif isinstance(result, dict) and 'embedding' in result:
                    return result['embedding']
            except Exception as e:
                print(f"[AIService] Error generating embedding via Gemini API: {e}")

        # Deterministic fallback pseudo-embedding (length 768) for offline/testing mode
        hash_val = sum(ord(c) for c in text)
        np.random.seed(hash_val % 2**32)
        vec = np.random.randn(768).astype(float)
        norm = np.linalg.norm(vec)
        return (vec / (norm if norm > 0 else 1.0)).tolist()

    def process_transcript(self, timestamped_transcript: str) -> Dict[str, Any]:
        """Sends transcript to Gemini for structured JSON summary generation."""
        if not self.client:
            return self._generate_fallback_summary(timestamped_transcript)

        try:
            prompt = f"Transcript:\n\n{timestamped_transcript}\n\nAnalyze this lecture and create the structured study guide."
            
            response = self.client.models.generate_content(
                model='gemini-1.5-flash',
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    response_mime_type="application/json",
                    response_schema=ProcessedLectureSummary,
                    temperature=0.2,
                ),
            )
            return json.loads(response.text)
        except Exception as e:
            print(f"[AIService] Error calling Gemini API: {e}")
            return self._generate_fallback_summary(timestamped_transcript)

    def answer_rag_question(self, user_question: str, context_chunks: List[str]) -> Dict[str, Any]:
        """Generates answer using top retrieved context chunks with timestamp citations."""
        context_str = "\n\n".join(context_chunks) if context_chunks else "No specific transcript chunks available."

        if not self.client:
            return {
                "answer": f"На основе материалов лекции: Вопрос '{user_question}' рассматривается в следующих секциях. {context_str[:200]}...",
                "timestamp_citations": ["00:00"]
            }

        rag_prompt = f"""
You are an interactive AI Tutor for this video lecture.
Answer the student's question strictly using the provided transcript context chunks below.
Always include exact clickable timestamp citations in your response like `[12:45]` when referencing relevant points.

Context Chunks:
{context_str}

Student Question: {user_question}
"""
        try:
            response = self.client.models.generate_content(
                model='gemini-1.5-flash',
                contents=rag_prompt,
                config=types.GenerateContentConfig(temperature=0.2)
            )
            return {
                "answer": response.text,
                "timestamp_citations": []
            }
        except Exception as e:
            return {
                "answer": f"Произошла ошибка при обращении к AI Tutor: {str(e)}",
                "timestamp_citations": []
            }

    def _generate_fallback_summary(self, transcript: str) -> Dict[str, Any]:
        """Provides structured fallback data for demonstration when API key is pending."""
        return {
            "executive_summary": "Интерактивный конспект лекции по Computer Science & ML. Лекция охватывает ключевые концепции, теоретические основы и практическую реализацию.",
            "key_takeaways": [
                "Фундаментальные принципы архитектуры и алгоритмов.",
                "Практическое применение в машинном обучении и MLOps.",
                "Оптимизация производительности и масштабирование."
            ],
            "modules": [
                {
                    "title": "1. Введение и базовые понятия",
                    "start_timestamp": "00:00",
                    "end_timestamp": "08:15",
                    "summary": "Обзор темы, постановка задачи и основные термины.",
                    "key_takeaway": "Формирование фундаментальных знаний по предмету."
                },
                {
                    "title": "2. Основная теория и архитектура",
                    "start_timestamp": "08:15",
                    "end_timestamp": "24:30",
                    "summary": "Разбор алгоритмов, формул и структур данных.",
                    "key_takeaway": "Математическая база и структура."
                },
                {
                    "title": "3. Практический пример и вывод",
                    "start_timestamp": "24:30",
                    "end_timestamp": "45:00",
                    "summary": "Демонстрация работы на практике и подведение итогов.",
                    "key_takeaway": "Применение изученных подходов на практике."
                }
            ],
            "quizzes": [
                {
                    "question": "Какова главная цель изученной в лекции концепции?",
                    "options": [
                        "Оптимизация использования ресурсов и скорости",
                        "Визуализация пользовательского интерфейса",
                        "Хранение неструктурированных текстовых файлов",
                        "Тестирование сетевого соединения"
                    ],
                    "correct_option_index": 0,
                    "explanation": "В лекции подчеркивается оптимизация алгоритмов для высокой производительности.",
                    "timestamp": "05:20"
                },
                {
                    "question": "Какой алгоритм используется для минимизации ошибки модели?",
                    "options": [
                        "Градиентный спуск (Gradient Descent)",
                        "Сортировка пузырьком",
                        "Бинарный поиск",
                        "Алгоритм Дейкстры"
                    ],
                    "correct_option_index": 0,
                    "explanation": "Градиентный спуск итеративно обновляет параметры для снижения значений функции потерь.",
                    "timestamp": "14:10"
                }
            ],
            "flashcards": [
                {
                    "term": "Gradient Descent",
                    "definition": "Итеративный алгоритм оптимизации для поиска минимума функции потерь.",
                    "timestamp": "12:40"
                },
                {
                    "term": "Overfitting",
                    "definition": "Явление, когда модель слишком хорошо подстраивается под обучающие данные и плохо обобщает новые.",
                    "timestamp": "18:15"
                },
                {
                    "term": "Learning Rate",
                    "definition": "Гиперпараметр, определяющий размер шага на каждой итерации при движении к минимуму функции потерь.",
                    "timestamp": "22:05"
                }
            ]
        }
