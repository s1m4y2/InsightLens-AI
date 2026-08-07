from app.ai.base_ai_module import BaseAIModule


class Summarizer(BaseAIModule):

    def summarize(
        self,
        text: str
    ):

        return self.execute(

            "summarize",

            {

                "text": text

            }

        )