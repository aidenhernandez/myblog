# Blog API - Backend

Rust backend API for the blog social platform.

## Tech Stack

- **Language:** Rust
- **Web Framework:** Axum
- **Database:** MySQL with sqlx
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt

## Project Structure

```
backend/
├── src/
│   ├── main.rs           # Application entry point
│   ├── models/           # Database models
│   ├── handlers/         # Request handlers
│   ├── routes/           # API route definitions
│   ├── middleware/       # Middleware (auth, logging, etc.)
│   ├── db/               # Database connection and utilities
│   └── utils/            # Helper functions
├── Cargo.toml            # Dependencies
└── .env.example          # Environment variables template
```

## Setup

1. **Install Rust:**
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Install MySQL:**
   - macOS: `brew install mysql`
   - Linux: `sudo apt install mysql-server`

3. **Create database:**
   ```sql
   CREATE DATABASE blog_db;
   ```

4. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. **Install dependencies:**
   ```bash
   cargo build
   ```

6. **Run migrations** (once implemented):
   ```bash
   sqlx migrate run
   ```

7. **Run the server:**
   ```bash
   cargo run
   ```

   The server will start on `http://127.0.0.1:8080`

## Development

### Run in development mode with auto-reload:
```bash
cargo install cargo-watch
cargo watch -x run
```

### Run tests:
```bash
cargo test
```

### Check code:
```bash
cargo check
cargo clippy
```

### Format code:
```bash
cargo fmt
```

## API Endpoints

Coming soon...

## Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `DATABASE_URL` - MySQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 8080)
- `RUST_LOG` - Logging level (debug, info, warn, error)
