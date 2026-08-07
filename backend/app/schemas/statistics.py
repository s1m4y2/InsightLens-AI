from pydantic import BaseModel

class StatisticsResponse(BaseModel):

    total_reviews: int

    positive_reviews: int

    negative_reviews: int

    mixed_reviews: int

    positive_percentage: float

    negative_percentage: float

    mixed_percentage: float

    average_review_length: float