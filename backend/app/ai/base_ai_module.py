from app.clients.gemini_client import GeminiClient
from app.utils.json_parser import parse_json
from app.loaders.prompt_loader import PromptLoader
from app.clients.client_factory import ClientFactory
from app.mappers.ai_log_mapper import AILogMapper
from app.repositories.ai_log_repository import AILogRepository
from app.core.config import settings
import time

class BaseAIModule:

    def __init__(self):

        self.client = ClientFactory.create()
        self.prompt_loader = PromptLoader()
        self.mapper = AILogMapper()
        self.repository = AILogRepository()

    def execute(
        self,
        prompt_name: str,
        variables: dict,
        version: str = "v1",
    ):

        prompt = self.prompt_loader.load(prompt_name, version)

        for key, value in variables.items():

            prompt = prompt.replace(
                "{{" + key + "}}",
                str(value)
            )


        start = time.perf_counter()

        response = self.client.generate(prompt)

        execution_time = int(
            (time.perf_counter() - start) * 1000
        )

        entity = self.mapper.to_entity(

            module=prompt_name,

            version=version,

            provider=settings.LLM_PROVIDER,

            prompt=prompt,

            response=response,

            execution_time_ms=execution_time

        )

        self.repository.save(entity)

        

        return parse_json(response)