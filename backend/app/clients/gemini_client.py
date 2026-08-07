import time

from google import genai

from app.clients.base_client import BaseClient
from app.core.config import settings
from app.core.ai_logger import log_ai_request


class GeminiClient(BaseClient):

    def __init__(self):

        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    def generate(
        self,
        prompt: str
    ):

        start = time.time()

        response = self.client.models.generate_content(

            model=settings.MODEL_NAME,

            contents=prompt

        )

        duration = (
            time.time() - start
        ) * 1000

        log_ai_request(

            "Gemini",

            settings.MODEL_NAME,

            duration

        )

        return response.text