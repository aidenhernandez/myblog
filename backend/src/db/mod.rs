use sqlx::sqlite::{SqlitePool, SqlitePoolOptions};
use std::time::Duration;

/// Create a new database connection pool
pub async fn create_pool(database_url: &str) -> Result<SqlitePool, sqlx::Error> {
    SqlitePoolOptions::new()
        .max_connections(5)
        .acquire_timeout(Duration::from_secs(3))
        .connect(database_url)
        .await
}

/// Type alias for the SQLite connection pool
pub type DbPool = SqlitePool;
