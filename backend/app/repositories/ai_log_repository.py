from sqlalchemy import select

from app.database.database import SessionLocal

from app.entities.ai_log_entity import AILogEntity


class AILogRepository:

    def save(self, entity):

        db = SessionLocal()

        try:

            db.add(entity)

            db.commit()

            db.refresh(entity)

            return entity

        finally:

            db.close()

    def get_all(self):

        db = SessionLocal()

        try:

            stmt = (
                select(AILogEntity)
                .order_by(AILogEntity.id.desc())
            )

            return db.scalars(stmt).all()

        finally:

            db.close()

    def get_by_id(
        self,
        log_id: int
    ):

        db = SessionLocal()

        try:

            return db.get(
                AILogEntity,
                log_id
            )

        finally:

            db.close()