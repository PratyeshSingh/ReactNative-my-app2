# SDK and Library Details: Product Browser App

## 1. Runtime SDK

| Dependency | Version | Purpose |
| :--- | :--- | :--- |
| `expo` | `^57.0.14` | Core framework and native module runtime. |
| `expo-router` | `~57.0.14` | File-based navigation and the application entry point. |
| `react-native` | `0.86.2` | Native UI rendering runtime. |
| `react` / `react-dom` | `19.2.3` | React runtime for native and web targets. |
| `react-native-web` | `~0.21.0` | Web rendering support for Expo. |
| `typescript` | `~6.0.3` | Static type checking and typed route support. |

The app uses Expo's New Architecture (`newArchEnabled: true`), typed routes, and the React Compiler experiment. The web target uses static output.

## 2. Native Modules and UI

| Dependency | Version | Purpose |
| :--- | :--- | :--- |
| `expo-image` | `~57.0.3` | Optimized image loading and caching. |
| `expo-asset` | `~57.0.12` | Asset loading and bundling. |
| `expo-font` | `~57.0.1` | Font loading. |
| `expo-haptics` | `~57.0.1` | Haptic feedback. |
| `expo-status-bar` | `~57.0.1` | Status bar control. |
| `expo-splash-screen` | `^57.0.7` | Configured native splash screen. |
| `expo-symbols` | `~57.0.2` | System symbol support. |
| `expo-system-ui` | `~57.0.2` | System UI configuration. |
| `expo-web-browser` | `~57.0.2` | Opening web content from the app. |
| `expo-secure-store` | `~57.0.1` | Secure token storage on native platforms. |
| `@react-native-async-storage/async-storage` | `2.2.0` | Persistent storage fallback. |
| `react-native-reanimated` | `4.5.1` | High-performance animations. |
| `react-native-worklets` | `0.10.1` | Worklet runtime used by Reanimated. |
| `react-native-gesture-handler` | `~2.32.0` | Native gesture handling. |
| `react-native-safe-area-context` | `~5.7.0` | Safe-area insets. |
| `react-native-screens` | `~4.26.0` | Native screen primitives. |

Expo plugins are registered in `app.json` for Router, splash screen, Secure Store, assets, fonts, images, status bar, and web browser support. iOS uses bundle identifier `com.anonymous.myapp`; Android uses package `com.anonymous.myapp`, edge-to-edge rendering, and predictive-back disabled.

## 3. Navigation

| Dependency | Version | Purpose |
| :--- | :--- | :--- |
| `@react-navigation/native` | `^7.3.13` | Navigation primitives used by Expo Router. |
| `@react-navigation/bottom-tabs` | `^7.18.13` | Bottom-tab navigation. |
| `@react-navigation/elements` | `^2.9.35` | Shared navigation UI elements. |
| `@expo/vector-icons` | `^15.0.3` | Icon set used by the UI. |

## 4. Development and Testing

| Dependency | Version | Purpose |
| :--- | :--- | :--- |
| `jest` | `^29.7.0` | Unit and integration tests. |
| `jest-environment-jsdom` | `^30.4.1` | Browser-like test environment. |
| `ts-jest` | `^29.1.0` | TypeScript Jest preprocessor. |
| `eslint` | `^9.25.0` | JavaScript and TypeScript linting. |
| `eslint-config-expo` | `~57.0.1` | Expo-compatible ESLint configuration. |
| `eslint-plugin-jest` | `^29.16.0` | Jest-specific lint rules. |
| `complexity-report` | `^2.0.0-alpha` | Complexity analysis. |

Use `npm run ios` and `npm run android` for native builds (`expo run:ios` and `expo run:android`). Use `npm run web` for the static web target, `npm test` for tests, and `npm run lint` for linting.

## 5. API and Data Handling

The application uses the Fetch API through shared generic helpers in `src/hooks/fetchJson.ts`:

- Base URL: `https://dummyjson.com`.
- `getCall<T>` and `postCall<T>` apply JSON headers, serialize POST bodies, parse API error messages, and throw for non-2xx responses.
- Product endpoints support listing (`/products?limit=100`), details, search, categories, and category filtering. Product DTOs include title, description, brand, price, rating, thumbnail, images, and category.
- Authentication endpoints support login (`POST /auth/login`), current-user lookup (`GET /auth/me` with a Bearer token), and refresh (`POST /auth/refresh`).

Authentication tokens are stored under `auth.token`. Storage falls back from Expo Secure Store to AsyncStorage and then browser `localStorage`. Login, current-user lookup, and refresh persist returned tokens.

## 6. Application Architecture

The product and user-profile features use typed DTOs, domain repositories, use cases, and presenters. Manual containers in `src/core-di/container.ts` and `src/product_browser/di/productContainer.ts` create shared API clients, repositories, and use-case instances. Product search is debounced by 500 ms, and the catalog derives category filtering locally from loaded products.
