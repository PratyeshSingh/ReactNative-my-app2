# Low-Level Design (LLD): Product Browser App

## 1. Core Modules & Responsibilities

### 1.1 Data Layer Modules
- **ProductApiClient**: 
    *   Handles raw HTTP requests using the `fetch` API.
    *   Methods: `fetchProducts`, `searchProducts`, `fetchProduct(id)`, `fetchCategories`.
    *   Responsible for network-level error handling.
- **ProductRepositoryImpl**: 
    *   Implements the `ProductRepository` interface.
    *   Maps API DTOs to the `Product` domain entity.
    *   Aggregates data or handles repository-specific logic.

### 1.2 Domain Layer Modules
- **Use Cases**:
    *   `GetProducts`: Fetches the initial list of products.
    *   `SearchProducts`: Handles keyword filtering via the API.
    *   `GetProductDetail`: Fetches full details for a single product.
- **Entities**:
    *   `Product`: TypeScript type definition for the core data model.

### 1.3 Presentation Layer Modules
- **useProductCatalog (ViewModel Hook)**:
    *   Manages searching and loading states.
    *   Handles category filtering logic in-memory.
    *   Exposes a clean interface for the `ProductListScreen`.
- **UI Components**:
    *   `ProductListScreen`: Main catalog view.
    *   `ProductDetailScreen`: Detailed product view.
    *   `ProductListItem` & `ProductDetailView`: Presentational components.

### 1.4 Dependency Injection (DI)
- **productContainer**: 
    *   A manual DI container.
    *   Instantiates `ProductApiClient`, `ProductRepositoryImpl`, and Use Cases.
    *   Ensures singleton-like behavior for repository and API instances.

## 2. Testing Strategy
- **Unit Testing (Domain)**:
    *   Focuses on Use Cases.
    *   Uses `jest.fn()` to mock Repository interfaces.
    *   Verifies that business logic handles success and error states correctly.
- **Environment**: Jest with `ts-jest` for TypeScript support.

## 3. Implementation Details
- **Navigation**: Expo Router (File-based).
- **Styling**: Shared `style.tsx` utilizing `StyleSheet`.
- **Images**: `expo-image` for optimized loading.
