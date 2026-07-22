# Engineering Guide: Technical Foundations

## 1. Project Topology
To align with **Expo Router's** file-based convention while preserving architectural purity, the project utilizes a bifurcated structure. This separation ensures that logic and tests do not interfere with the application runtime.

| Tier | Path | Responsibility |
| :--- | :--- | :--- |
| **Routing** | `app/` | Scanned by Expo Router; contains lightweight route entry points. |
| **Core** | `src/` | Ignored by auto-bundler; contains the application's engine and business logic. |
| **Domain** | `src/product_browser/domain/` | Pure business logic, Use Cases, and Entities. Zero external dependencies. |
| **Data** | `src/product_browser/data/` | Infrastructure, API clients, and Repository implementations. |
| **Presentation** | `src/product_browser/presenter/` | State management (ViewModels/Hooks) and Screen components. |
| **Injection** | `src/product_browser/di/` | Centralized Dependency Injection (DI) orchestration. |

## 2. Strategic Engineering Decisions

### 2.1 Bundler Optimization
**Problem**: Placing unit tests and complex logic inside the `app/` directory caused runtime failures due to the injection of Node-specific globals (e.g., `describe`, `it`) into the mobile environment.
**Solution**: Implementation of the `src/` directory pattern. This restricts Expo Router to a minimal "Navigation Manifest" while the actual logic remains safely encapsulated in a standard TypeScript environment.

### 2.2 Dependency Management
The system utilizes a manual **Dependency Injection** container (`productContainer.ts`). This approach was chosen over third-party frameworks to maintain a low footprint and provide absolute transparency in object lifecycle management—crucial for high-performance mobile applications.

## 3. Operations & Validation
- **Logic Validation**: Use cases are validated via Jest, targeting the Domain layer through interface mocking.
- **Dependency Audit**: Refer to the **[SDK Specifications](./SDKDetails.md)** for a complete breakdown of the technology stack.
- **Architectural Flow**: Refer to the **[HLD](./HLD.md)** for detailed data flow diagrams.
