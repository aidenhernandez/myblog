use axum::{
    extract::State,
    http::StatusCode,
    Json,
};
use chrono::Utc;
use sqlx::SqlitePool;
use validator::Validate;

use crate::models::{AuthResponse, LoginRequest, MessageResponse, RegisterRequest, User, UserResponse};
use crate::utils::jwt::create_jwt_token;

/// Register a new user
pub async fn register(
    State(pool): State<SqlitePool>,
    Json(payload): Json<RegisterRequest>,
) -> Result<Json<AuthResponse>, (StatusCode, Json<MessageResponse>)> {
    // Validate input
    if let Err(errors) = payload.validate() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(MessageResponse {
                message: format!("Validation error: {}", errors),
            }),
        ));
    }

    // Convert email to lowercase for case-insensitive storage
    let email = payload.email.to_lowercase();

    // Check if user already exists with this email
    let existing_email = sqlx::query!("SELECT id FROM users WHERE email = ?", email)
        .fetch_optional(&pool)
        .await
        .map_err(|e| {
            tracing::error!("Database error checking email: {}", e);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(MessageResponse {
                    message: "Internal server error".to_string(),
                }),
            )
        })?;

    if existing_email.is_some() {
        return Err((
            StatusCode::CONFLICT,
            Json(MessageResponse {
                message: "Email already registered".to_string(),
            }),
        ));
    }

    // Check if username already exists
    let existing_username = sqlx::query!("SELECT id FROM users WHERE username = ?", payload.username)
        .fetch_optional(&pool)
        .await
        .map_err(|e| {
            tracing::error!("Database error checking username: {}", e);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(MessageResponse {
                    message: "Internal server error".to_string(),
                }),
            )
        })?;

    if existing_username.is_some() {
        return Err((
            StatusCode::CONFLICT,
            Json(MessageResponse {
                message: "Username already taken".to_string(),
            }),
        ));
    }

    // Hash password with bcrypt (cost factor 12)
    let password_hash = bcrypt::hash(&payload.password, 12).map_err(|e| {
        tracing::error!("Error hashing password: {}", e);
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(MessageResponse {
                message: "Internal server error".to_string(),
            }),
        )
    })?;

    // Insert new user into database
    let result = sqlx::query!(
        r#"
        INSERT INTO users (username, email, password_hash, display_name, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
        "#,
        payload.username,
        email,
        password_hash,
        payload.display_name,
        Utc::now(),
        Utc::now()
    )
    .execute(&pool)
    .await
    .map_err(|e| {
        tracing::error!("Database error inserting user: {}", e);
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(MessageResponse {
                message: "Internal server error".to_string(),
            }),
        )
    })?;

    let user_id = result.last_insert_rowid() as u64;

    // Fetch the created user
    let user = sqlx::query_as!(
        User,
        r#"
        SELECT id as "id: u64", username, email, password_hash, display_name, bio,
               profile_picture_url, created_at, updated_at, deleted_at
        FROM users
        WHERE id = ?
        "#,
        user_id
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| {
        tracing::error!("Database error fetching created user: {}", e);
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(MessageResponse {
                message: "Internal server error".to_string(),
            }),
        )
    })?;

    // Create JWT token
    let token = create_jwt_token(user_id).map_err(|e| {
        tracing::error!("Error creating JWT token: {}", e);
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(MessageResponse {
                message: "Internal server error".to_string(),
            }),
        )
    })?;

    Ok(Json(AuthResponse {
        token,
        user: UserResponse::from(user),
    }))
}

/// Login an existing user
pub async fn login(
    State(pool): State<SqlitePool>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<AuthResponse>, (StatusCode, Json<MessageResponse>)> {
    // Validate input
    if let Err(errors) = payload.validate() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(MessageResponse {
                message: format!("Validation error: {}", errors),
            }),
        ));
    }

    // Convert email to lowercase for case-insensitive comparison
    let email = payload.email.to_lowercase();

    // Fetch user by email
    let user = sqlx::query_as!(
        User,
        r#"
        SELECT id as "id: u64", username, email, password_hash, display_name, bio,
               profile_picture_url, created_at, updated_at, deleted_at
        FROM users
        WHERE email = ? AND deleted_at IS NULL
        "#,
        email
    )
    .fetch_optional(&pool)
    .await
    .map_err(|e| {
        tracing::error!("Database error fetching user: {}", e);
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(MessageResponse {
                message: "Internal server error".to_string(),
            }),
        )
    })?;

    let user = user.ok_or_else(|| {
        (
            StatusCode::UNAUTHORIZED,
            Json(MessageResponse {
                message: "Invalid email or password".to_string(),
            }),
        )
    })?;

    // Verify password
    let password_valid = bcrypt::verify(&payload.password, &user.password_hash).map_err(|e| {
        tracing::error!("Error verifying password: {}", e);
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(MessageResponse {
                message: "Internal server error".to_string(),
            }),
        )
    })?;

    if !password_valid {
        return Err((
            StatusCode::UNAUTHORIZED,
            Json(MessageResponse {
                message: "Invalid email or password".to_string(),
            }),
        ));
    }

    // Create JWT token
    let token = create_jwt_token(user.id).map_err(|e| {
        tracing::error!("Error creating JWT token: {}", e);
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(MessageResponse {
                message: "Internal server error".to_string(),
            }),
        )
    })?;

    Ok(Json(AuthResponse {
        token,
        user: UserResponse::from(user),
    }))
}

/// Logout (client-side token invalidation)
pub async fn logout() -> Json<MessageResponse> {
    Json(MessageResponse {
        message: "Logged out successfully".to_string(),
    })
}
