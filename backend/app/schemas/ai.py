from pydantic import BaseModel


class SummarizeRequest(BaseModel):
    text: str

class SummarizeResponse(BaseModel):
    summary: str

class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    sentiment: str

class BusinessInsightsResponse(BaseModel):
    overall_summary: str
    strengths: list[str]
    issues: list[str]
    recommendations: list[str]