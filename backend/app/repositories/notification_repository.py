from sqlalchemy import select

from app.database.database import SessionLocal
from app.entities.notification_entity import NotificationEntity


class NotificationRepository:

    def save(self, entity):

        db = SessionLocal()

        try:

            db.add(entity)

            db.commit()

            db.refresh(entity)

            return entity

        finally:

            db.close()

    def get_all_for_user(self, user_id: int):

        db = SessionLocal()

        try:

            stmt = (
                select(NotificationEntity)
                .where(
                    NotificationEntity.user_id == user_id
                )
                .order_by(
                    NotificationEntity.id.desc()
                )
            )

            return db.scalars(stmt).all()

        finally:

            db.close()

    def get_unread_for_user(self, user_id: int):

        db = SessionLocal()

        try:

            stmt = (
                select(NotificationEntity)
                .where(
                    NotificationEntity.user_id == user_id,
                    NotificationEntity.is_read == False
                )
                .order_by(
                    NotificationEntity.id.desc()
                )
            )

            return db.scalars(stmt).all()

        finally:

            db.close()

    def mark_as_read(
        self,
        notification_id: int,
        user_id: int
    ):

        db = SessionLocal()

        try:

            notification = db.get(
                NotificationEntity,
                notification_id
            )

            if (
                notification is None
                or notification.user_id != user_id
            ):
                return None

            notification.is_read = True

            db.commit()

            db.refresh(notification)

            return notification

        finally:

            db.close()

    def mark_all_as_read(self, user_id: int):

        db = SessionLocal()

        try:

            stmt = (
                select(NotificationEntity)
                .where(
                    NotificationEntity.user_id == user_id,
                    NotificationEntity.is_read == False
                )
            )

            notifications = db.scalars(stmt).all()

            for notification in notifications:

                notification.is_read = True

            db.commit()

            return len(notifications)

        finally:

            db.close()