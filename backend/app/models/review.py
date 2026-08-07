from dataclasses import dataclass


@dataclass
class Review:
    title: str
    text: str
    rating: float
    reviewer: str
    country: str
    review_date: str