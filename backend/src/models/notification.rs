use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum NotificationType {
    Like,
    Comment,
    Follow,
    Reply,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Notification {
    pub id: u64,
    pub user_id: u64,
    #[serde(rename = "type")]
    pub notification_type: String, // Will be converted to NotificationType
    pub actor_id: u64,
    pub post_id: Option<u64>,
    pub comment_id: Option<u64>,
    pub is_read: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize)]
pub struct NotificationResponse {
    pub id: u64,
    pub user_id: u64,
    #[serde(rename = "type")]
    pub notification_type: String,
    pub actor_id: u64,
    pub post_id: Option<u64>,
    pub comment_id: Option<u64>,
    pub is_read: bool,
    pub created_at: DateTime<Utc>,
}

impl From<Notification> for NotificationResponse {
    fn from(notification: Notification) -> Self {
        Self {
            id: notification.id,
            user_id: notification.user_id,
            notification_type: notification.notification_type,
            actor_id: notification.actor_id,
            post_id: notification.post_id,
            comment_id: notification.comment_id,
            is_read: notification.is_read,
            created_at: notification.created_at,
        }
    }
}
