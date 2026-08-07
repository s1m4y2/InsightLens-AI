from app.entities.prompt_entity import PromptEntity
from app.repositories.prompt_repository import PromptRepository


class PromptService:

    def __init__(self):

        self.repository = PromptRepository()

    def get_all(self):

        return self.repository.get_all()

    def get_by_id(self, prompt_id: int):

        return self.repository.get_by_id(prompt_id)

    def create(self, request):

        entity = PromptEntity(

            module=request.module,

            version=request.version,

            content=request.content,

            is_active=request.is_active,

        )

        return self.repository.save(entity)

    def update(self, prompt_id: int, request):

        entity = self.repository.get_by_id(prompt_id)

        if entity is None:

            raise Exception("Prompt not found.")

        entity.module=request.module
        entity.version = request.version
        entity.content = request.content
        entity.is_active = request.is_active

        self.repository.update(entity)

        return entity

    def delete(self, prompt_id: int):

        self.repository.delete(prompt_id)

    def activate(self, prompt_id: int):

        self.repository.deactivate_all()

        entity = self.repository.get_by_id(prompt_id)

        if entity is None:

            raise Exception("Prompt not found.")

        entity.is_active = True

        self.repository.update(entity)

        return entity

    def get_by_module(self, module: str):

        return self.repository.get_by_module(module)

    def get_active(self, module: str):

        return self.repository.get_active(module)