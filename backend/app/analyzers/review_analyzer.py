from app.ai.base_ai_module import BaseAIModule

class ReviewAnalyzer(BaseAIModule):

    def analyze(
        self,
        review: str
    ):

        return self.execute(

            "review_analysis",

            {

                "review": review

            }

        )