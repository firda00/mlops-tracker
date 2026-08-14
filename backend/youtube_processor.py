import re
from typing import List, Dict, Any, Optional
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound

class TranscriptError(Exception):
    def __init__(self, message, code, fallback_data):
        super().__init__(message)
        self.code = code
        self.fallback_data = fallback_data

class YouTubeProcessor:
    """Service for extracting and formatting YouTube video transcripts with precise timestamps."""
    
    _cache = {} # Basic in-memory cache for processed videos
    
    @staticmethod
    def extract_video_id(url_or_id: str) -> str:
        """Extracts 11-character YouTube video ID from various URL formats."""
        if len(url_or_id) == 11 and not ("/" in url_or_id or "." in url_or_id):
            return url_or_id
        
        regex = r"(?:v=|\/|youtu\.be\/|\/embed\/|\/v\/|\/e\/|watch\?v=|&v=)([^#&?]{11})"
        match = re.search(regex, url_or_id)
        if match:
            return match.group(1)
        raise ValueError(f"Could not extract YouTube video ID from input: {url_or_id}")

    @classmethod
    def get_transcript(cls, video_url_or_id: str, languages: List[str] = ["en", "ru"]) -> List[Dict[str, Any]]:
        """
        Fetches transcript entries with timestamp metadata.
        Returns a list of dicts: [{'text': str, 'start': float, 'duration': float}]
        """
        video_id = cls.extract_video_id(video_url_or_id)
        try:
            transcript_list = YouTubeTranscriptApi.get_transcript(video_id, languages=languages)
            return transcript_list
        except (TranscriptsDisabled, NoTranscriptFound) as e:
            fallback = {
                "modules": [{"title": "Субтитры недоступны", "start": "00:00", "summary": "Не удалось загрузить субтитры для данного видео."}],
                "quizzes": [],
                "flashcards": []
            }
            raise TranscriptError(
                message=f"No subtitles available for video {video_id}",
                code="NO_TRANSCRIPT",
                fallback_data=fallback
            )
        except Exception as e:
            raise RuntimeError(f"Error fetching YouTube transcript: {str(e)}")

    @classmethod
    def format_timestamp(cls, seconds: float) -> str:
        """Converts seconds into HH:MM:SS or MM:SS format."""
        mins, secs = divmod(int(seconds), 60)
        hours, mins = divmod(mins, 60)
        if hours > 0:
            return f"{hours:02d}:{mins:02d}:{secs:02d}"
        return f"{mins:02d}:{secs:02d}"

    @classmethod
    def format_transcript_with_timestamps(cls, transcript: List[Dict[str, Any]], interval_seconds: int = 60) -> str:
        """
        Groups transcript lines into timestamped intervals (e.g., every 60s) 
        to pass cleanly to an LLM without overwhelming token count.
        """
        if not transcript:
            return ""

        formatted_blocks = []
        current_block_start = transcript[0]['start']
        current_texts = []

        for entry in transcript:
            start_time = entry['start']
            text = entry['text'].replace('\n', ' ')
            
            if start_time - current_block_start >= interval_seconds and current_texts:
                time_str = cls.format_timestamp(current_block_start)
                block_content = f"[{time_str}] " + " ".join(current_texts)
                formatted_blocks.append(block_content)
                
                current_block_start = start_time
                current_texts = [text]
            else:
                current_texts.append(text)

        if current_texts:
            time_str = cls.format_timestamp(current_block_start)
            formatted_blocks.append(f"[{time_str}] " + " ".join(current_texts))

        return "\n\n".join(formatted_blocks)
