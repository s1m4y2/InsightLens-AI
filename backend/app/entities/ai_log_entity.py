from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class AILogEntity(Base):

    __tablename__ = "ai_logs"

    id = Column(Integer, primary_key=True, index=True)

    module = Column(String(100), nullable=False)

    version = Column(String(20), nullable=False)

    provider = Column(String(50), nullable=False)

    prompt = Column(Text, nullable=False)

    response = Column(Text, nullable=False)

    execution_time_ms = Column(Integer)

    created_at = Column(
        DateTime,
        server_default=func.now()
    )