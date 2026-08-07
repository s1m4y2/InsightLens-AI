from sqlalchemy import select

from app.database.database import SessionLocal
from app.entities.prompt_entity import PromptEntity


class PromptRepository:

    def get_all(self):

        with SessionLocal() as db:

            return db.scalars(

                select(PromptEntity)

                .order_by(PromptEntity.id.desc())

            ).all()


    def get_by_id(self, prompt_id: int):

        with SessionLocal() as db:

            return db.get(PromptEntity, prompt_id)


    def save(self, entity: PromptEntity):

        with SessionLocal() as db:

            db.add(entity)

            db.commit()

            db.refresh(entity)

            return entity


    def update(self, entity: PromptEntity):

        with SessionLocal() as db:

            db.merge(entity)

            db.commit()


    def delete(self, prompt_id: int):

        with SessionLocal() as db:

            entity = db.get(PromptEntity, prompt_id)

            if entity:

                db.delete(entity)

                db.commit()


    def deactivate_all(self):

        with SessionLocal() as db:

            prompts = db.query(PromptEntity).all()

            for prompt in prompts:

                prompt.is_active = False

            db.commit()

    def get_active(self, module: str):

        with SessionLocal() as db:

            return db.scalar(

                select(PromptEntity)

                .where(
                    PromptEntity.module == module,
                    PromptEntity.is_active == True
                )

            )

    def get_by_module(self, module: str):

        with SessionLocal() as db:

            return db.scalars(

                select(PromptEntity)

                .where(
                    PromptEntity.module == module
                )

                .order_by(PromptEntity.version)

            ).all()