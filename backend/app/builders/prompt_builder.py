class PromptBuilder:

    @staticmethod
    def build_review_prompt(
        template: str,
        review: str
    ) -> str:

        return template.replace(
            "{{review}}",
            review
        )