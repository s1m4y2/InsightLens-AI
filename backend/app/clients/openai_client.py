from app.clients.base_client import BaseClient


class OpenAIClient(BaseClient):

    def generate(
        self,
        prompt: str
    ) -> str:

        raise NotImplementedError()