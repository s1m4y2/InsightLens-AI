from sqlalchemy import select

from app.database.database import SessionLocal
from app.entities.user_entity import UserEntity


class UserRepository:

    def save(self, entity):

        db = SessionLocal()

        try:

            db.add(entity)

            db.commit()

            db.refresh(entity)

            return entity

        finally:

            db.close()

    def find_by_email(
        self,
        email: str
    ):

        db = SessionLocal()

        try:

            stmt = select(UserEntity).where(
                UserEntity.email == email
            )

            return db.execute(stmt).scalar_one_or_none()

        finally:

            db.close()