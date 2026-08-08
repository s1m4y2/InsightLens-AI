from datetime import datetime

from pydantic import BaseModel


class NotificationResponse(BaseModel):

    id: int

    title: str

    description: str

    type: str

    is_read: bool

    created_at: datetime

    class Config:

        from_attributes = True


class NotificationListResponse(BaseModel):

    items: list[NotificationResponse]

    unread_count: int