import api from "@/lib/api";


export interface Notification {

    id: number;

    title: string;

    description: string;

    type: string;

    is_read: boolean;

    created_at: string;

}


export interface NotificationResponse {

    items: Notification[];

    unread_count: number;

}


export async function getNotifications(): Promise<NotificationResponse> {

    const { data } = await api.get(
        "/notifications"
    );

    return data;

}


export async function markNotificationAsRead(
    notificationId: number
) {

    const { data } = await api.post(
        `/notifications/${notificationId}/read`
    );

    return data;

}


export async function markAllNotificationsAsRead() {

    const { data } = await api.post(
        "/notifications/read-all"
    );

    return data;

}