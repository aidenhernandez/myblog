# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo for a blog social platform - a full-stack application combining blog content creation with social media features (likes, comments, follows). The project is split into two independent applications:

- **Backend**: Rust API using Axum web framework with MySQL database
- **Frontend**: React Native mobile/web app using Expo and TypeScript

## Context File Structure

This monorepo uses a layered context approach for Claude Code:

- **This file** (`/CLAUDE.md`) - High-level monorepo overview, cross-project conventions
- **`backend/CLAUDE.md`** - Detailed Rust/Axum specific guidance, Cargo commands, sqlx patterns
- **`frontend/CLAUDE.md`** - Detailed React Native/Expo specific guidance, service patterns, cross-platform considerations

**For subagents and specialized tasks**: When working specifically within the `backend/` or `frontend/` directories, read the respective subdirectory CLAUDE.md file for detailed implementation guidance and technology-specific conventions.

## Architecture

### Backend Architecture (Rust/Axum)

The backend follows a layered architecture pattern:

```
backend/src/
├── main.rs          # Entry point, server setup, route registration
├── models/          # Database models (structs matching DB tables)
├── handlers/        # Request handlers (business logic)
├── routes/          # Route definitions grouped by resource
├── middleware/      # Auth, logging, CORS middleware
├── db/              # Database connection pool, query utilities
└── utils/           # Helper functions, validation, etc.
```

**Key architectural decisions:**
- **Axum + Tokio**: Async web framework with tokio runtime
- **sqlx**: Compile-time checked SQL queries, no ORM
- **JWT Authentication**: Token-based auth with bcrypt password hashing
- **MySQL**: Primary database with connection pooling
- **Error Handling**: Uses `anyhow` for application errors, `thiserror` for custom error types
- **Validation**: `validator` crate for request validation with derive macros

**Database connection**: Initialized once at startup and shared via Axum's state mechanism (Arc-wrapped connection pool).

### Frontend Architecture (React Native/Expo)

The frontend uses a service-based architecture with centralized state management:

```
frontend/src/
├── screens/         # Full-page screen components
├── components/      # Reusable UI components
├── navigation/      # React Navigation setup
├── services/        # API clients (one per resource)
├── store/           # Zustand stores for global state
├── types/           # TypeScript type definitions (shared across app)
├── constants/       # Config values (API_URL, TOKEN_KEY, etc.)
└── utils/           # Helper functions
```

**Key architectural decisions:**
- **Zustand**: Lightweight state management (preferred over Redux for simplicity)
- **React Navigation**: Native stack + bottom tabs navigation
- **Axios**: HTTP client with interceptors for auth tokens
- **expo-secure-store**: Secure JWT token storage
- **TypeScript**: Strict typing throughout, all API types defined in `types/index.ts`

**API Integration**: The `services/api.ts` file exports a configured axios instance that:
1. Automatically injects JWT tokens from secure storage into request headers
2. Handles 401 errors by clearing tokens and redirecting to login
3. Standardizes error responses into `ApiError` type

**Cross-Platform**: Single codebase deploys to iOS, Android, and Web via Expo.

## Development Commands

### Backend (from `backend/` directory)

```bash
# Development
cargo run                        # Start server on localhost:8080
cargo watch -x run              # Auto-reload on file changes (requires cargo-watch)

# Testing & Code Quality
cargo test                       # Run all tests
cargo test <test_name>          # Run specific test
cargo fmt                        # Format code
cargo clippy                     # Linting

# Database
sqlx migrate run                # Run pending migrations
sqlx migrate revert             # Rollback last migration

# Build
cargo build                      # Debug build
cargo build --release           # Optimized production build
cargo check                      # Fast compile check without binary
```

### Frontend (from `frontend/` directory)

```bash
# Development
npm start                        # Start Expo dev server
npm start -- --clear            # Start with cache cleared
npm run web                      # Run on web browser
npm run ios                      # Run on iOS simulator (Mac only)
npm run android                  # Run on Android emulator

# Type Checking
npx tsc --noEmit                # TypeScript type checking

# Production Builds
eas build --platform ios        # Build iOS app (requires EAS CLI)
eas build --platform android    # Build Android app
npx expo export:web             # Build for web deployment
```

## Environment Configuration

Both backend and frontend require `.env` files (use `.env.example` as template):

**Backend** (`backend/.env`):
```
DATABASE_URL=mysql://username:password@localhost:3306/blog_db
JWT_SECRET=your-secret-key
PORT=8080
RUST_LOG=debug
```

**Frontend** (`frontend/.env`):
```
EXPO_PUBLIC_API_URL=http://localhost:8080/api/v1
```

**Important**: Frontend environment variables MUST be prefixed with `EXPO_PUBLIC_` to be accessible at runtime.

## Database Setup

The backend requires MySQL 8.0+. Initial setup:

```bash
# Install MySQL (macOS)
brew install mysql
brew services start mysql

# Create database
mysql -u root -p
CREATE DATABASE blog_db;
EXIT;
```

**Migrations**: Database schema changes are managed via sqlx migrations in `backend/migrations/` (once created). Run with `sqlx migrate run`.

**Schema overview** (from PRD):
- `users` - User accounts with authentication
- `posts` - Blog posts (title, content, status: draft/published)
- `comments` - Comments on posts (supports nested replies via parent_comment_id)
- `likes` - Post likes (unique constraint on post_id + user_id)
- `follows` - User follows (unique constraint on follower_id + following_id)
- `tags` - Post tags/categories
- `post_tags` - Many-to-many junction table
- `notifications` - User notifications (like, comment, follow, reply types)

All tables use `BIGINT UNSIGNED` for IDs and include `created_at`/`updated_at` timestamps.

## API Structure

Base URL: `http://localhost:8080/api/v1`

**Endpoint organization** (as implemented, group routes by resource):
- `/auth/*` - Authentication (register, login, logout, password reset)
- `/users/:id/*` - User profiles, posts, followers, following
- `/posts/*` - Post CRUD, feed, search
- `/posts/:id/comments` - Comments on posts
- `/posts/:id/like` - Like/unlike posts
- `/notifications/*` - User notifications
- `/tags/*` - Browse tags

**Authentication**: All protected endpoints expect `Authorization: Bearer <token>` header. Frontend axios instance handles this automatically.

## Type System Alignment

The TypeScript types in `frontend/src/types/index.ts` mirror the Rust backend models. When adding new endpoints:

1. Define Rust structs in `backend/src/models/`
2. Add corresponding TypeScript interfaces in `frontend/src/types/index.ts`
3. Ensure field names and types match exactly (Rust's `snake_case` → TypeScript `snake_case`, not camelCase)

**Example alignment**:
```rust
// backend/src/models/user.rs
pub struct User {
    pub id: u64,
    pub username: String,
    pub display_name: String,
    pub created_at: DateTime<Utc>,
}
```

```typescript
// frontend/src/types/index.ts
export interface User {
  id: number;
  username: string;
  display_name: string;
  created_at: string;  // ISO 8601 string from Rust chrono
}
```

## Code Style & Conventions

### Backend (Rust)
- Use `snake_case` for functions, variables, modules
- Use `PascalCase` for types, structs, enums
- Prefer `Result<T, E>` for error handling over panics
- Use `#[derive(serde::Deserialize)]` for request bodies
- Use `#[derive(serde::Serialize)]` for response bodies
- Database queries use sqlx macros: `sqlx::query!`, `sqlx::query_as!`

### Frontend (TypeScript)
- Functional components with hooks only (no class components)
- Component files use PascalCase: `LoginScreen.tsx`, `PostCard.tsx`
- Service files use camelCase: `authService.ts`, `postService.ts`
- Export types from `src/types/index.ts` (central type definitions)
- API calls return `Promise<T>` and throw `ApiError` on failure

## Commit Message Format

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code formatting
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Build/tooling changes

## Current Status

**Completed**:
- ✅ Project structure initialized
- ✅ Backend dependencies configured (Axum, sqlx, JWT, bcrypt)
- ✅ Frontend dependencies configured (React Navigation, Zustand, Axios)
- ✅ Basic Axum server with health check endpoint
- ✅ API client with auth interceptors
- ✅ TypeScript type definitions for all resources

**Pending** (see PRD.md for full roadmap):
- Database migrations and schema implementation
- Authentication endpoints (register, login, logout)
- Post CRUD endpoints
- Social features (likes, comments, follows)
- UI screens and components
- Navigation setup
- State management stores

## Key Files to Reference

- `PRD.md` - Complete product requirements and feature specifications
- `README.md` - Setup instructions and development workflow
- `backend/src/main.rs` - Backend entry point and route registration
- `frontend/src/types/index.ts` - All TypeScript type definitions
- `frontend/src/services/api.ts` - Configured axios instance with auth

## Troubleshooting

**Backend**:
- If database connection fails: Check MySQL is running (`brew services list`), verify `DATABASE_URL` in `.env`
- If port 8080 in use: Change `PORT` in `.env` or kill process using `lsof -ti:8080 | xargs kill`
- If `cargo build` fails on sqlx: Ensure `DATABASE_URL` is set and database exists (sqlx compile-time checks)

**Frontend**:
- If Metro bundler issues: Clear cache with `npm start -- --clear` or `rm -rf node_modules/.cache`
- If Node version warnings: Project requires Node 20+ (use `nvm install 20 && nvm use 20`)
- If iOS simulator not opening: Ensure Xcode Command Line Tools installed
- If Android build fails: Ensure `ANDROID_HOME` env var set and emulator running

## Development Workflow

**Typical feature implementation flow**:

1. **Backend**:
   - Add migration in `backend/migrations/` (if schema changes needed)
   - Create model struct in `backend/src/models/`
   - Implement handler function in `backend/src/handlers/`
   - Add route in `backend/src/routes/` or `main.rs`
   - Write tests in same file or `tests/` directory

2. **Frontend**:
   - Add TypeScript types to `frontend/src/types/index.ts`
   - Create API service function in `frontend/src/services/`
   - Create/update Zustand store if needed in `frontend/src/store/`
   - Build UI components in `frontend/src/components/`
   - Create screen in `frontend/src/screens/`
   - Add navigation route in `frontend/src/navigation/`

3. **Testing**:
   - Backend: `cd backend && cargo test`
   - Frontend: Manual testing on web (`npm run web`), then iOS/Android
   - Integration: Start backend (`cargo run`), then frontend (`npm start`)

**Running full stack locally**: Open two terminals:
```bash
# Terminal 1
cd backend && cargo run

# Terminal 2
cd frontend && npm start
```

Frontend connects to backend via `EXPO_PUBLIC_API_URL` environment variable.
