use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Follow {
    pub id: u64,
    pub follower_id: u64,
    pub following_id: u64,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize)]
pub struct FollowResponse {
    pub id: u64,
    pub follower_id: u64,
    pub following_id: u64,
    pub created_at: DateTime<Utc>,
}

impl From<Follow> for FollowResponse {
    fn from(follow: Follow) -> Self {
        Self {
            id: follow.id,
            follower_id: follow.follower_id,
            following_id: follow.following_id,
            created_at: follow.created_at,
        }
    }
}
