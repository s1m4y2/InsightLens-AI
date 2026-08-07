from datetime import datetime

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import Text
from sqlalchemy import DateTime

from sqlalchemy.sql import func

from app.database.database import Base


class PromptEntity(Base):

    __tablename__ = "prompts"

    id: Mapped[int] = mapped_column(primary_key=True)

    module: Mapped[str] = mapped_column(String(100))

    version: Mapped[str] = mapped_column(String(20))

    content: Mapped[str] = mapped_column(Text)

    is_active: Mapped[bool] = mapped_column(Boolean, default=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )