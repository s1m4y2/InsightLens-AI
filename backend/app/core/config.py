from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):

    APP_NAME: str = "InsightLens AI"

    APP_VERSION: str = "1.0.0"

    ENVIRONMENT: str = "development"

    GEMINI_API_KEY: str

    DATABASE_URL: str

    JWT_SECRET_KEY: str

    JWT_ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480

    LLM_PROVIDER: str = "gemini"

    MODEL_NAME: str = "gemini-3-flash-preview"

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        extra="ignore"
    )


settings = Settings()