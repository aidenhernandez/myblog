# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Rust backend API for a blog social platform using the Axum web framework. The project follows a layered architecture pattern with async/await throughout.

## Architecture

The codebase uses a modular layered architecture:

```
src/
├── main.rs          # Entry point, server setup, route registration
├── models/          # Database models (structs matching DB schema)
├── handlers/        # Request handlers (business logic layer)
├── routes/          # Route definitions grouped by resource
├── middleware/      # Auth, logging, CORS middleware
├── db/              # Database connection pool, query utilities
└── utils/           # Helper functions, validation, error types
```

**Key architectural decisions:**

- **Axum + Tokio**: Async web framework with the tokio runtime (full features enabled)
- **sqlx**: Type-safe SQL queries at compile time (no ORM). Uses runtime-tokio-rustls with MySQL
- **JWT Authentication**: Token-based auth with bcrypt for password hashing
- **Error Handling**: `anyhow` for application errors, `thiserror` for custom error types
- **Validation**: `validator` crate with derive macros for request validation
- **Tracing**: `tracing` and `tracing-subscriber` for structured logging with env-filter support

**Database connection**: Should be initialized once at startup and shared via Axum's state mechanism (Arc-wrapped connection pool).

## Development Commands

### Running the server

```bash
cargo run                    # Start server (default: http://127.0.0.1:8080)
cargo watch -x run          # Auto-reload on file changes (requires: cargo install cargo-watch)
```

### Testing & Quality

```bash
cargo test                   # Run all tests
cargo test <test_name>       # Run specific test
cargo test -- --nocapture    # Run tests with output visible
cargo fmt                    # Format code
cargo clippy                 # Linting with suggestions
cargo check                  # Fast compile check without building binary
```

### Database Operations

```bash
sqlx migrate run            # Run pending migrations
sqlx migrate revert         # Rollback last migration
sqlx migrate add <name>     # Create new migration file
```

Note: sqlx performs compile-time verification of SQL queries, so `DATABASE_URL` must be set and the database must exist before running `cargo build` or `cargo check`.

### Build

```bash
cargo build                  # Debug build
cargo build --release        # Optimized production build
```

## Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL`: MySQL connection string (format: `mysql://username:password@localhost:3306/blog_db`)
- `JWT_SECRET`: Secret key for signing JWT tokens (change in production)
- `JWT_EXPIRATION`: Token expiration in seconds (default: 86400 = 24 hours)
- `PORT`: Server port (default: 8080)
- `RUST_LOG`: Log level (debug, info, warn, error)

## Database Setup

Requires MySQL 8.0+:

```bash
# macOS
brew install mysql
brew services start mysql

# Linux
sudo apt install mysql-server
sudo systemctl start mysql

# Create database
mysql -u root -p
CREATE DATABASE blog_db;
EXIT;
```

## Code Conventions

- Use `snake_case` for functions, variables, modules
- Use `PascalCase` for types, structs, enums
- Prefer `Result<T, E>` for error handling; avoid panics in request handlers
- Use `#[derive(serde::Deserialize)]` for request bodies
- Use `#[derive(serde::Serialize)]` for response bodies
- Database queries should use sqlx macros: `sqlx::query!` or `sqlx::query_as!` for compile-time checking
- All handlers should be async functions returning `Result<impl IntoResponse, StatusCode>` or similar

## Request/Response Pattern

Handlers should follow this pattern:

```rust
use axum::{Json, extract::State};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct RequestBody {
    // fields
}

#[derive(Serialize)]
struct ResponseBody {
    // fields
}

async fn handler(
    State(pool): State<MySqlPool>,
    Json(payload): Json<RequestBody>,
) -> Result<Json<ResponseBody>, StatusCode> {
    // implementation
}
```

## Dependency Notes

**Web Stack:**
- `axum` 0.7 - Web framework
- `tokio` 1.x with "full" features - Async runtime
- `tower` + `tower-http` - Middleware (CORS, tracing)

**Database:**
- `sqlx` 0.7 with features: runtime-tokio-rustls, mysql, chrono, uuid

**Auth & Security:**
- `jsonwebtoken` 9.2 - JWT tokens
- `bcrypt` 0.15 - Password hashing

**Serialization:**
- `serde` + `serde_json` - JSON handling

**Utilities:**
- `chrono` - Date/time with serde support
- `uuid` - UUID generation (v4)
- `validator` - Request validation with derive macros
- `dotenv` - Environment variable loading

## Troubleshooting

**Database connection fails:**
- Check MySQL is running: `brew services list` (macOS) or `systemctl status mysql` (Linux)
- Verify `DATABASE_URL` in `.env` matches your MySQL credentials
- Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`

**Port already in use:**
- Change `PORT` in `.env`, or
- Kill existing process: `lsof -ti:8080 | xargs kill`

**sqlx compile-time errors:**
- Ensure `DATABASE_URL` is set in `.env`
- Ensure database exists and migrations are run
- Run `cargo clean` and rebuild if queries were recently modified

**Build errors after dependency changes:**
- Run `cargo clean` then `cargo build`
- Check `Cargo.lock` is committed to ensure reproducible builds
