from fastapi import APIRouter, Depends, HTTPException

from app.schemas.notification import (
    NotificationListResponse,
    NotificationResponse
)

from app.services.notification_service import (
    NotificationService
)

from app.security.dependencies import get_current_user


router = APIRouter(

    prefix="/api/v1/notifications",

    tags=["Notifications"]

)


service = NotificationService()


@router.get(
    "",
    response_model=NotificationListResponse
)
def get_notifications(
    user=Depends(get_current_user)
):

    return service.get_notifications(
        user.id
    )


@router.post(
    "/{notification_id}/read",
    response_model=NotificationResponse
)
def mark_as_read(
    notification_id: int,
    user=Depends(get_current_user)
):

    notification = service.mark_as_read(

        notification_id,

        user.id

    )

    if notification is None:

        raise HTTPException(

            status_code=404,

            detail="Notification not found."

        )

    return notification


@router.post(
    "/read-all"
)
def mark_all_as_read(
    user=Depends(get_current_user)
):

    count = service.mark_all_as_read(
        user.id
    )

    return {

        "message": "Notifications marked as read.",

        "count": count

    }

@router.post("/test")
def create_test_notification(
    user=Depends(get_current_user)
):

    return service.create(

        user_id=user.id,

        title="Test notification",

        description="Your notification system is working.",

        type="ai"

    )