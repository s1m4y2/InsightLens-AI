from google import genai
from app.core.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def test_connection():
    response = client.models.generate_content(
        model=settings.MODEL_NAME,
        contents="Say hello in one sentence."
    )

    return response.text