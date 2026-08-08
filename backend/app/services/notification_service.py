from app.entities.notification_entity import NotificationEntity
from app.repositories.notification_repository import NotificationRepository


class NotificationService:

    def __init__(self):

        self.repository = NotificationRepository()

    def create(
        self,
        user_id: int,
        title: str,
        description: str,
        type: str
    ):

        entity = NotificationEntity(

            user_id=user_id,

            title=title,

            description=description,

            type=type

        )

        return self.repository.save(entity)

    def get_notifications(
        self,
        user_id: int
    ):

        notifications = (
            self.repository.get_all_for_user(
                user_id
            )
        )

        unread_count = len([
            notification
            for notification in notifications
            if not notification.is_read
        ])

        return {
            "items": notifications,
            "unread_count": unread_count
        }

    def mark_as_read(
        self,
        notification_id: int,
        user_id: int
    ):

        return self.repository.mark_as_read(
            notification_id,
            user_id
        )

    def mark_all_as_read(
        self,
        user_id: int
    ):

        return self.repository.mark_all_as_read(
            user_id
        )