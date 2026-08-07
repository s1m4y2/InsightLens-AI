from datetime import datetime
from sqlalchemy import JSON
from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy import DateTime
from sqlalchemy.sql import func
from sqlalchemy import Integer
from app.database.database import Base


class ReviewAnalysisEntity(Base):

    __tablename__ = "review_analysis"

    id: Mapped[int] = mapped_column(primary_key=True)

    review_text: Mapped[str] = mapped_column(Text)

    summary: Mapped[str] = mapped_column(Text)

    sentiment: Mapped[str] = mapped_column(String(20))

    emotion: Mapped[str] = mapped_column(String(50))

    categories: Mapped[list] = mapped_column(JSON)

    keywords: Mapped[list] = mapped_column(JSON)

    suggested_reply: Mapped[str] = mapped_column(Text)
    confidence: Mapped[int] = mapped_column(Integer)

    rating: Mapped[int] = mapped_column(Integer)
    prompt_version: Mapped[str] = mapped_column(String(20), default="v1")

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())