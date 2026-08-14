import re
from typing import List, Dict, Any, Optional
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound

class YouTubeProcessor:
    """Service for extracting YouTube video IDs and transcripts with precise timestamps."""
    
    @staticmethod
    def extract_video_id(url_or_id: str) -> str:
        """
        Universal YouTube ID extractor that supports all URL variations:
        - https://www.youtube.com/watch?v=ID
        - https://youtu.be/ID
        - https://www.youtube.com/embed/ID
        - https://www.youtube.com/shorts/ID
        - https://www.youtube.com/live/ID
        - Raw 11-char ID
        """
        if not url_or_id:
            raise ValueError("URL cannot be empty")

        url_str = url_or_id.strip()

        # Check if already 11-char ID
        if re.fullmatch(r"[a-zA-Z0-9_-]{11}", url_str):
            return url_str

        # Match YouTube standard formats
        patterns = [
            r"(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*?(?:v=)([a-zA-Z0-9_-]{11})",
            r"(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})",
            r"(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})",
            r"(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})",
            r"(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]{11})",
            r"(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})",
        ]

        for pattern in patterns:
            match = re.search(pattern, url_str)
            if match:
                return match.group(1)

        # Fallback query regex
        fallback_match = re.search(r"(?:v=|\/)([a-zA-Z0-9_-]{11})(?:[&?]|$)", url_str)
        if fallback_match:
            return fallback_match.group(1)

        raise ValueError(f"Could not extract YouTube video ID from URL: {url_or_id}")

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
        except (TranscriptsDisabled, NoTranscriptFound):
            try:
                transcripts = YouTubeTranscriptApi.list_transcripts(video_id)
                transcript = transcripts.find_transcript(['en', 'ru', 'de', 'fr', 'es'])
                return transcript.fetch()
            except Exception as inner_e:
                raise RuntimeError(f"No usable transcript found for video {video_id}: {str(inner_e)}")
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
    def parse_timestamp_to_seconds(cls, timestamp_str: str) -> int:
        """Parses MM:SS or HH:MM:SS string into total seconds."""
        parts = list(map(int, timestamp_str.strip().split(':')))
        if len(parts) == 3:
            return parts[0] * 3600 + parts[1] * 60 + parts[2]
        elif len(parts) == 2:
            return parts[0] * 60 + parts[1]
        elif len(parts) == 1:
            return parts[0]
        return 0

    @classmethod
    def format_transcript_with_timestamps(cls, transcript: List[Dict[str, Any]], interval_seconds: int = 60) -> str:
        """Groups transcript lines into timestamped intervals for LLM processing."""
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
