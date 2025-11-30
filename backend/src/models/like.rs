use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Like {
    pub id: u64,
    pub post_id: u64,
    pub user_id: u64,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize)]
pub struct LikeResponse {
    pub id: u64,
    pub post_id: u64,
    pub user_id: u64,
    pub created_at: DateTime<Utc>,
}

impl From<Like> for LikeResponse {
    fn from(like: Like) -> Self {
        Self {
            id: like.id,
            post_id: like.post_id,
            user_id: like.user_id,
            created_at: like.created_at,
        }
    }
}
