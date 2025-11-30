use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum PostStatus {
    Draft,
    Published,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Post {
    pub id: u64,
    pub author_id: u64,
    pub title: String,
    pub content: String,
    pub cover_image_url: Option<String>,
    pub status: String, // Will be converted to PostStatus
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub published_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Deserialize)]
pub struct CreatePostRequest {
    pub title: String,
    pub content: String,
    pub cover_image_url: Option<String>,
    pub status: Option<PostStatus>,
}

#[derive(Debug, Deserialize)]
pub struct UpdatePostRequest {
    pub title: Option<String>,
    pub content: Option<String>,
    pub cover_image_url: Option<String>,
    pub status: Option<PostStatus>,
}

#[derive(Debug, Serialize)]
pub struct PostResponse {
    pub id: u64,
    pub author_id: u64,
    pub title: String,
    pub content: String,
    pub cover_image_url: Option<String>,
    pub status: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub published_at: Option<DateTime<Utc>>,
}

impl From<Post> for PostResponse {
    fn from(post: Post) -> Self {
        Self {
            id: post.id,
            author_id: post.author_id,
            title: post.title,
            content: post.content,
            cover_image_url: post.cover_image_url,
            status: post.status,
            created_at: post.created_at,
            updated_at: post.updated_at,
            published_at: post.published_at,
        }
    }
}
