use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,      // Subject (user_id)
    pub exp: usize,       // Expiration time (as UTC timestamp)
    pub iat: usize,       // Issued at (as UTC timestamp)
}

/// Create a JWT token for a user
pub fn create_jwt_token(user_id: u64) -> Result<String, jsonwebtoken::errors::Error> {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    let expiration = env::var("JWT_EXPIRATION")
        .unwrap_or_else(|_| "86400".to_string())
        .parse::<i64>()
        .expect("JWT_EXPIRATION must be a valid number");

    let now = chrono::Utc::now();
    let iat = now.timestamp() as usize;
    let exp = (now.timestamp() + expiration) as usize;

    let claims = Claims {
        sub: user_id.to_string(),
        exp,
        iat,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
}

/// Verify and decode a JWT token
pub fn verify_jwt_token(token: &str) -> Result<Claims, jsonwebtoken::errors::Error> {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");

    let token_data = decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::default(),
    )?;

    Ok(token_data.claims)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_and_verify_token() {
        std::env::set_var("JWT_SECRET", "test-secret");
        std::env::set_var("JWT_EXPIRATION", "3600");

        let user_id = 123u64;
        let token = create_jwt_token(user_id).expect("Failed to create token");

        let claims = verify_jwt_token(&token).expect("Failed to verify token");
        assert_eq!(claims.sub, user_id.to_string());
    }
}
