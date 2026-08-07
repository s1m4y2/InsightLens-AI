from app.ai.base_ai_module import BaseAIModule


class SentimentDetector(BaseAIModule):

    def analyze(
        self,
        text: str
    ):

        return self.execute(
            "sentiment",
            {
                "text": text
            }
        )