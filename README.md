# Blog Social Platform

A full-stack blog and social media application that allows users to create accounts, write blog posts, and engage with content through likes and comments.

## Project Overview

This is a monorepo containing both the backend API and frontend application for a blog-centric social platform.

### Features

- User authentication (register, login, logout)
- Create, edit, and delete blog posts
- Rich text editor for content creation
- Social features (likes, comments, follows)
- User profiles
- Feed and discovery
- Notifications
- Cross-platform support (iOS, Android, Web)

## Tech Stack

### Backend
- **Language:** Rust
- **Framework:** Axum
- **Database:** MySQL
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt

### Frontend
- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Navigation:** React Navigation
- **State Management:** Zustand
- **HTTP Client:** Axios

## Project Structure

```
myblog/
├── PRD.md                # Product Requirements Document
├── README.md             # This file
├── backend/              # Rust API server
│   ├── src/
│   │   ├── main.rs
│   │   ├── models/
│   │   ├── handlers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── db/
│   │   └── utils/
│   ├── Cargo.toml
│   ├── .env.example
│   └── README.md
└── frontend/             # React Native app
    ├── src/
    │   ├── screens/
    │   ├── components/
    │   ├── navigation/
    │   ├── services/
    │   ├── store/
    │   ├── types/
    │   ├── utils/
    │   └── constants/
    ├── App.tsx
    ├── package.json
    ├── .env.example
    └── README.md
```

## Getting Started

### Prerequisites

**For Backend:**
- Rust (1.70+) - [Install Rust](https://rustup.rs/)
- MySQL (8.0+)
- Cargo (comes with Rust)

**For Frontend:**
- Node.js (20+ recommended, 18+ minimum)
- npm or yarn
- Expo CLI

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install MySQL and create database:**
   ```bash
   # macOS
   brew install mysql
   brew services start mysql

   # Create database
   mysql -u root -p
   CREATE DATABASE blog_db;
   EXIT;
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Run the server:**
   ```bash
   cargo run
   ```

   The API will be available at `http://localhost:8080`

For more details, see [backend/README.md](backend/README.md)

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env if needed (default points to localhost:8080)
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Run on your preferred platform:**
   ```bash
   # Web
   npm run web

   # iOS (Mac only)
   npm run ios

   # Android
   npm run android
   ```

For more details, see [frontend/README.md](frontend/README.md)

## Development Workflow

### Running Both Backend and Frontend

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   cargo run
   # Or for auto-reload during development:
   cargo watch -x run
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```

### Database Migrations

Once implemented, run migrations:
```bash
cd backend
sqlx migrate run
```

### API Documentation

The API follows RESTful conventions. Base URL: `http://localhost:8080/api/v1`

Key endpoints:
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /posts` - Get all posts
- `POST /posts` - Create new post
- `GET /posts/:id` - Get single post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `POST /posts/:id/like` - Like a post
- `POST /posts/:id/comments` - Add comment

For complete API documentation, see the PRD or backend documentation.

## Project Status

**Current Status:** Initial setup complete

- [x] Backend project structure initialized
- [x] Frontend project structure initialized
- [x] Dependencies configured
- [ ] Database schema and migrations
- [ ] Authentication implementation
- [ ] Post management implementation
- [ ] Social features implementation
- [ ] UI/UX design and components
- [ ] Testing
- [ ] Deployment

## Documentation

- [Product Requirements Document](PRD.md) - Complete product specifications
- [Backend README](backend/README.md) - Backend setup and development guide
- [Frontend README](frontend/README.md) - Frontend setup and development guide

## Development Guidelines

### Backend (Rust)

- Follow Rust naming conventions and idioms
- Use `cargo fmt` to format code
- Use `cargo clippy` for linting
- Write tests for critical functionality
- Use proper error handling with `Result` types

### Frontend (TypeScript)

- Use TypeScript for type safety
- Follow React and React Native best practices
- Use functional components and hooks
- Keep components small and focused
- Write meaningful component and variable names

### Git Workflow

1. Create feature branches from `main`
2. Make your changes
3. Test thoroughly on all platforms (for frontend)
4. Submit pull request for review
5. Merge after approval

### Commit Messages

Use conventional commit format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Build process or auxiliary tool changes

## Testing

### Backend
```bash
cd backend
cargo test
```

### Frontend
```bash
cd frontend
npm test
```

## Building for Production

### Backend
```bash
cd backend
cargo build --release
```

### Frontend

Using Expo Application Services (EAS):
```bash
cd frontend
eas build --platform ios
eas build --platform android
npx expo export:web  # For web
```

## Troubleshooting

### Backend Issues

- **Database connection failed:** Check MySQL is running and credentials in `.env` are correct
- **Cargo build errors:** Ensure you have the latest Rust version: `rustup update`
- **Port already in use:** Change PORT in `.env` file

### Frontend Issues

- **Metro bundler issues:** Clear cache with `npm start -- --clear`
- **Node version warnings:** Upgrade to Node 20+
- **Dependencies issues:** Delete `node_modules` and run `npm install` again

## Contributing

1. Read the [PRD](PRD.md) to understand the project requirements
2. Check the project board for available tasks
3. Create a feature branch
4. Implement your changes
5. Test thoroughly
6. Submit a pull request

## License

[Add your license here]

## Support

For questions or issues:
- Check the documentation in each directory's README
- Review the PRD for product specifications
- Open an issue on the project repository

## Roadmap

See the [PRD](PRD.md) for the complete feature roadmap and timeline.

### Phase 1 (Current - MVP)
- Authentication system
- Post creation and management
- Basic social features
- Core UI implementation

### Phase 2 (Post-Launch)
- Advanced search
- Enhanced notifications
- Performance optimization
- Additional social features

---

**Happy Coding!** 🚀
