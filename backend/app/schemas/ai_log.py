from datetime import datetime

from pydantic import BaseModel


class AILogResponse(BaseModel):

    id: int

    module: str

    version: str

    provider: str

    execution_time_ms: int | None

    created_at: datetime

    class Config:

        from_attributes = True

class AILogDetailResponse(AILogResponse):

    prompt: str

    response: str