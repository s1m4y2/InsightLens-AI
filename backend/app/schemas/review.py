from datetime import datetime
from typing import Literal
from pydantic import (BaseModel, field_validator, ConfigDict)

class ReviewRequest(BaseModel):

    review: str

    @field_validator("review")
    @classmethod
    def validate_review(cls, value: str):

        value = value.strip()

        if len(value) < 5:
            raise ValueError(
                "Review is too short."
            )

        invalid_reviews = {
            "string",
            "test",
            "asdf",
            "qwerty",
            "12345"
        }

        if value.lower() in invalid_reviews:

            raise ValueError(
                "Invalid review."
            )

        return value


class ReviewAnalysisResponse(BaseModel):

    summary:str

    sentiment:str

    emotion:str

    categories:list[str]

    keywords:list[str]

    confidence:int

    rating:int

    suggested_reply:str

class ReviewHistoryResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )
    
    id:int

    review_text:str

    summary:str

    sentiment:str

    emotion:str

    categories:list[str]

    keywords:list[str]

    confidence:int

    rating:int

    suggested_reply:str

    created_at:datetime

class ReviewListResponse(BaseModel):

    total: int

    page: int

    page_size: int

    total_pages: int

    has_next: bool

    has_previous: bool

    items: list[ReviewHistoryResponse]