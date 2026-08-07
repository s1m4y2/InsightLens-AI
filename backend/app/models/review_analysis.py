from dataclasses import dataclass


@dataclass
class ReviewAnalysis:

    summary: str

    sentiment: str

    emotion: str

    categories: list[str]

    keywords: list[str]

    confidence: int

    rating: int

    suggested_reply: str