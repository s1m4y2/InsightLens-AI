from pydantic import BaseModel


class CountItem(BaseModel):
    label: str
    count: int


class DashboardResponse(BaseModel):

    total_reviews: int

    positive: int

    negative: int

    mixed: int

    top_emotions: list[CountItem]

    top_categories: list[CountItem]

    recent_reviews: list