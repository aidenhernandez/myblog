# Blog Social - Frontend

React Native mobile and web application for the blog social platform, built with Expo and TypeScript.

## Tech Stack

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Navigation:** React Navigation
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Forms:** React Hook Form
- **Storage:** AsyncStorage + Expo SecureStore

## Project Structure

```
frontend/
├── src/
│   ├── screens/          # Screen components
│   ├── components/       # Reusable UI components
│   ├── navigation/       # Navigation configuration
│   ├── services/         # API services and utilities
│   ├── store/            # State management (Zustand stores)
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Helper functions
│   └── constants/        # App constants and configuration
├── assets/               # Images, fonts, etc.
├── App.tsx              # Root component
├── app.json             # Expo configuration
└── package.json         # Dependencies

```

## Prerequisites

- Node.js 20+ (recommended) or 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Create a `.env` file in the frontend directory:
   ```
   EXPO_PUBLIC_API_URL=http://localhost:8080/api/v1
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   This will open Expo Dev Tools in your browser.

## Running the App

### Web
```bash
npm run web
```

### iOS (Mac only)
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Development

### Project Commands

```bash
# Start Expo development server
npm start

# Start with cache cleared
npm start -- --clear

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Type checking
npx tsc --noEmit

# Lint code (when ESLint is configured)
npm run lint
```

### Adding Dependencies

```bash
# Install a new package
npm install package-name

# Install a dev dependency
npm install --save-dev package-name
```

### Environment Variables

Environment variables must be prefixed with `EXPO_PUBLIC_` to be accessible in the app:

```
EXPO_PUBLIC_API_URL=http://localhost:8080/api/v1
EXPO_PUBLIC_APP_ENV=development
```

Access them in code:
```typescript
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

## Building for Production

### Development Build
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure the project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Web Build
```bash
npx expo export:web
```

## Project Dependencies

### Core Dependencies
- `expo` - Expo SDK
- `react` - React library
- `react-native` - React Native framework

### Navigation
- `@react-navigation/native` - Navigation library
- `@react-navigation/native-stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Tab navigator

### State & Data
- `zustand` - State management
- `axios` - HTTP client
- `react-hook-form` - Form management

### Storage & Security
- `@react-native-async-storage/async-storage` - Async storage
- `expo-secure-store` - Secure token storage

## Folder Structure Conventions

### `src/screens/`
Each screen represents a full page in the app:
- `HomeScreen.tsx`
- `LoginScreen.tsx`
- `ProfileScreen.tsx`
etc.

### `src/components/`
Reusable UI components:
- `Button.tsx`
- `Input.tsx`
- `PostCard.tsx`
etc.

### `src/services/`
API services and business logic:
- `api.ts` - Axios instance with interceptors
- `authService.ts` - Authentication API calls
- `postService.ts` - Post-related API calls
etc.

### `src/store/`
Zustand stores for state management:
- `authStore.ts` - Authentication state
- `postStore.ts` - Posts state
etc.

### `src/types/`
TypeScript type definitions:
- `index.ts` - All type definitions

### `src/utils/`
Helper functions:
- `formatDate.ts`
- `validation.ts`
etc.

## API Integration

The app connects to the Rust backend API. Base URL is configured in `src/constants/config.ts`.

All API requests use the axios instance from `src/services/api.ts` which includes:
- Automatic JWT token injection
- Error handling
- Request/response interceptors

## Troubleshooting

### Metro Bundler Issues
```bash
# Clear cache
npm start -- --clear

# Reset Metro bundler
npx expo start -c
```

### iOS Simulator Issues
```bash
# Reset simulator
xcrun simctl erase all
```

### Android Emulator Issues
```bash
# Cold boot the emulator
emulator -avd <device-name> -no-snapshot-load
```

### Node Version Issues
If you see Node version warnings, upgrade to Node 20+:
```bash
# Using nvm
nvm install 20
nvm use 20
```

## Deployment

### Expo Application Services (EAS)

1. **Configure EAS:**
   ```bash
   eas build:configure
   ```

2. **Build for iOS:**
   ```bash
   eas build --platform ios
   ```

3. **Build for Android:**
   ```bash
   eas build --platform android
   ```

4. **Submit to stores:**
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

### Web Deployment

Build and deploy the web version:
```bash
npx expo export:web
# Deploy the web-build folder to your hosting service
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test on iOS, Android, and Web
4. Submit a pull request

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
