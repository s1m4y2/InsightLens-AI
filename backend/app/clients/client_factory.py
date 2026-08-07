from app.core.config import settings

from app.clients.gemini_client import GeminiClient
from app.clients.openai_client import OpenAIClient


class ClientFactory:

    @staticmethod
    def create():

        if settings.LLM_PROVIDER == "gemini":
            return GeminiClient()

        if settings.LLM_PROVIDER == "openai":
            return OpenAIClient()

        raise Exception(
            f"Unknown provider: {settings.LLM_PROVIDER}"
        )