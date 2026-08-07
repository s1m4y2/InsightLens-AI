from app.ai.base_ai_module import BaseAIModule


class BusinessInsights(BaseAIModule):

    def generate(
        self,
        dashboard: str
    ):

        return self.execute(
            "business_insights",
            {
                "dashboard": dashboard
            }
        )