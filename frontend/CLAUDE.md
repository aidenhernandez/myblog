# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native mobile and web application for a blog social platform. Built with Expo for cross-platform deployment (iOS, Android, Web) from a single TypeScript codebase.

**Backend Connection**: This frontend connects to a Rust API backend at `http://localhost:8080/api/v1` (configurable via `EXPO_PUBLIC_API_URL`).

## Tech Stack

- **Framework**: React Native 0.81.5 with Expo ~54.0
- **Language**: TypeScript 5.9
- **Navigation**: React Navigation (native-stack + bottom-tabs)
- **State Management**: Zustand 5.0
- **HTTP Client**: Axios 1.13
- **Forms**: React Hook Form 7.65
- **Secure Storage**: Expo SecureStore (JWT tokens)
- **Local Storage**: AsyncStorage (non-sensitive data)

## Development Commands

```bash
# Start development server (opens Expo Dev Tools)
npm start

# Start with cleared cache
npm start -- --clear

# Platform-specific runs
npm run web           # Run in web browser
npm run ios           # Run on iOS simulator (Mac only)
npm run android       # Run on Android emulator

# Type checking (no tests configured yet)
npx tsc --noEmit

# Production builds (requires EAS CLI setup)
eas build --platform ios
eas build --platform android
npx expo export:web   # Web production build
```

## Architecture

### Service-Based API Integration

All API communication flows through a centralized axios instance (`src/services/api.ts`) that implements:

**Request Interceptor**: Automatically injects JWT tokens from `expo-secure-store` into the `Authorization: Bearer <token>` header for every request.

**Response Interceptor**: Handles 401 errors by clearing tokens and preparing for navigation to login (navigation hook needs to be added when navigation is implemented).

**Service Layer Pattern**: Create resource-specific service files (e.g., `authService.ts`, `postService.ts`) that import this configured axios instance and export functions like:

```typescript
// Example pattern for services
import api from './api';
import { User, LoginRequest, AuthResponse } from '../types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  // ... other auth methods
};
```

All services throw `ApiError` type (from `types/index.ts`) on failure.

### Type System

**Central Type Definitions**: All TypeScript interfaces are defined in `src/types/index.ts`. This includes:
- Domain models (User, Post, Comment, etc.)
- Request/response types (LoginRequest, AuthResponse, etc.)
- API pagination types (PaginatedResponse<T>)
- Error types (ApiError)

**Backend Alignment**: Type field names use `snake_case` (not camelCase) to match the Rust backend's JSON serialization. Example: `display_name`, `created_at`, `profile_picture_url`.

### State Management with Zustand

Create stores in `src/store/` for global state. Example pattern:

```typescript
import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

**Why Zustand**: Chosen over Redux for simplicity and minimal boilerplate. No providers needed, direct hook-based access.

### Navigation Structure

React Navigation will be configured with:
- **Native Stack Navigator**: For main screen navigation
- **Bottom Tabs Navigator**: For primary app sections (Home, Explore, Create, Notifications, Profile)

Place navigation configuration in `src/navigation/` directory.

### Secure Token Storage

**Critical**: JWT tokens MUST be stored using `expo-secure-store`, not AsyncStorage:

```typescript
import * as SecureStore from 'expo-secure-store';
import { TOKEN_KEY } from '../constants/config';

// Save token
await SecureStore.setItemAsync(TOKEN_KEY, token);

// Retrieve token
const token = await SecureStore.getItemAsync(TOKEN_KEY);

// Delete token
await SecureStore.deleteItemAsync(TOKEN_KEY);
```

The axios interceptor in `src/services/api.ts` already handles automatic token injection.

## Directory Structure Conventions

```
src/
├── screens/          # Full-page screen components (e.g., LoginScreen.tsx)
├── components/       # Reusable UI components (e.g., Button.tsx, PostCard.tsx)
├── navigation/       # Navigation configuration
├── services/         # API service functions (one file per resource)
├── store/            # Zustand stores (one file per domain)
├── types/            # TypeScript types (centralized in index.ts)
├── utils/            # Helper functions (formatDate, validation, etc.)
└── constants/        # Config constants (API_URL, TOKEN_KEY, etc.)
```

**File Naming**:
- Components/Screens: PascalCase (e.g., `LoginScreen.tsx`, `PostCard.tsx`)
- Services/Utils: camelCase (e.g., `authService.ts`, `formatDate.ts`)
- Stores: camelCase with "Store" suffix (e.g., `authStore.ts`, `postStore.ts`)

## Environment Variables

**Critical Convention**: All environment variables MUST be prefixed with `EXPO_PUBLIC_` to be accessible in the app.

**Configuration** (`frontend/.env`):
```
EXPO_PUBLIC_API_URL=http://localhost:8080/api/v1
EXPO_PUBLIC_APP_ENV=development
```

**Access in Code**:
```typescript
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

**Config File**: Import constants from `src/constants/config.ts` rather than accessing `process.env` directly throughout the app.

## Cross-Platform Considerations

This codebase targets iOS, Android, and Web from a single source:

**Platform-Specific Code**: Use `Platform.select()` or platform-specific file extensions (`.ios.tsx`, `.android.tsx`, `.web.tsx`) when needed.

**Web Limitations**: Some native features (like secure storage) have web polyfills via Expo. Test on all three platforms before considering a feature complete.

**New Architecture Enabled**: `app.json` has `"newArchEnabled": true`, using React Native's new architecture (Fabric renderer).

## API Integration Pattern

When adding a new feature that requires API calls:

1. **Add Types** to `src/types/index.ts`:
   ```typescript
   export interface MyNewResource {
     id: number;
     // ... fields matching backend response
   }
   ```

2. **Create Service** in `src/services/myResourceService.ts`:
   ```typescript
   import api from './api';
   import { MyNewResource } from '../types';

   export const myResourceService = {
     getAll: async (): Promise<MyNewResource[]> => {
       const response = await api.get('/my-resource');
       return response.data;
     },
   };
   ```

3. **Create Store** (if needed) in `src/store/myResourceStore.ts`

4. **Build UI** in `src/screens/` and `src/components/`

5. **Add Navigation** route in `src/navigation/`

## Styling Approach

Currently using inline `StyleSheet.create()` (see `App.tsx`). No styling library configured yet.

**When adding UI library**, consider:
- React Native Paper (Material Design)
- NativeBase (customizable components)
- Tailwind via NativeWind (utility-first CSS)

## Current Implementation Status

**Completed**:
- ✅ Project structure and dependencies
- ✅ TypeScript type definitions for all resources
- ✅ Axios instance with auth interceptors
- ✅ Secure storage configuration
- ✅ Constants configuration

**Not Yet Implemented**:
- Navigation setup
- Authentication screens (Login, Register)
- Post screens (Feed, Create, Detail)
- UI component library
- State management stores
- Form validation setup
- Image upload handling
- Push notifications

## Troubleshooting

**Metro Bundler Cache Issues**:
```bash
npm start -- --clear
# or
npx expo start -c
# or
rm -rf node_modules/.cache
```

**iOS Simulator Not Opening**:
- Ensure Xcode Command Line Tools installed: `xcode-select --install`
- Reset simulators: `xcrun simctl erase all`

**Android Emulator Issues**:
- Verify `ANDROID_HOME` environment variable is set
- Cold boot emulator: `emulator -avd <device-name> -no-snapshot-load`

**Node Version Warnings**:
React Native 0.81.5 requires Node 20+. If seeing EBADENGINE warnings:
```bash
nvm install 20
nvm use 20
```

**Type Errors After API Changes**:
If backend response format changes, update `src/types/index.ts` first, then TypeScript will show all locations needing updates.

## Testing Strategy (When Implemented)

Recommended testing libraries:
- **Jest**: Unit tests for utilities and services
- **React Native Testing Library**: Component tests
- **Detox**: E2E tests for critical user flows

## Backend API Reference

Base URL: `http://localhost:8080/api/v1`

All authenticated endpoints require `Authorization: Bearer <token>` header (handled automatically by axios instance).

**Key Endpoints** (from backend plan):
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login (returns token + user)
- `POST /auth/logout` - Logout
- `GET /posts` - Get posts feed
- `POST /posts` - Create post
- `GET /posts/:id` - Get single post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `POST /posts/:id/like` - Like post
- `DELETE /posts/:id/like` - Unlike post
- `POST /posts/:id/comments` - Add comment
- `POST /users/:id/follow` - Follow user
- `GET /notifications` - Get notifications

See `../PRD.md` for complete API documentation.

## Code Style

**TypeScript**:
- Use functional components with hooks (no class components)
- Prefer `interface` over `type` for object shapes
- Use explicit return types for service functions
- Avoid `any` type; use `unknown` if type is truly unknown

**React Native**:
- Use `StyleSheet.create()` for styles (not inline objects)
- Extract reusable components early
- Keep screen components focused on layout, move logic to hooks/services
- Use React Hook Form for forms (dependency already installed)

**Async/Await**:
- Always use try/catch for API calls
- Service functions throw errors, UI components catch them
- Show user-friendly error messages from `ApiError.message`

## Known Limitations

- No testing framework configured yet
- No linting (ESLint) configured yet
- No pre-commit hooks (husky)
- App.tsx is still the default Expo boilerplate
- No navigation implemented yet
- No UI component library chosen yet
