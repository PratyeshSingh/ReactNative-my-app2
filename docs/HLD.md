# High-Level Design (HLD): Product Browser App

## 1. Architectural Pattern
The application follows **Clean Architecture** principles to separate business logic from UI and infrastructure. This ensures the code is highly testable and independent of the framework.

## 2. Unidirectional Data Flow (UDF)
The system architecture maintains a strict unidirectional data flow across three primary layers:

1.  **UI/Presentation Layer**: 
    *   React components (Screens/UI).
    *   Trigger actions via Custom Hooks (ViewModels).
    *   Observe state changes and update the UI.

2.  **Domain Layer**: 
    *   Contains pure business rules.
    *   **Entities**: Data models representing business objects (`Product`).
    *   **Use Cases**: Orchestrate data flow and encapsulate specific business logic (`GetProducts`, `SearchProducts`).
    *   **Repository Interfaces**: Define the contract for data operations.

3.  **Data Layer**: 
    *   Implements the Repository interfaces.
    *   Fetches data from external REST APIs (DummyJSON).
    *   Maps raw DTOs (Data Transfer Objects) into clean Domain Entities.

## 3. Data Flow Diagram
`UI Component` -> `ViewModel (Hook)` -> `Use Case` -> `Repository` -> `API Client` -> `Remote Server`

## 4. Layer Isolation
- **Domain** has no dependencies on other layers.
- **Data** depends on **Domain** (to implement interfaces).
- **Presentation** depends on **Domain** (to execute use cases).

---

## 5. Restructured Project Tree
To support **Expo Router** efficiently while maintaining Clean Architecture, the project is structured to isolate the routing layer from the implementation logic.

### Directory Layout:
```text
my-app2/
├── app/                  # Routing Layer (Scanned by Expo Router)
│   ├── index.tsx         # Entry screen
│   ├── product_list.tsx  # Catalog route
│   └── product_detail.tsx# Detail route
├── src/                  # Implementation Layer (Ignored by Bundler)
│   ├── style.tsx         # Global design system
│   └── product_browser/  # Feature Module
│       ├── di/           # Dependency Injection
│       ├── domain/       # Use Cases & Entities
│       │   └── usecases/_test_/ # Unit tests isolated from app runtime
│       ├── data/         # API & Repositories
│       └── presenter/    # ViewModels & Screen Components
└── ...
```

### Rationale:
- **Expo Router Isolation**: Expo Router automatically bundles everything inside the `app/` folder. By moving business logic and tests to `src/`, we prevent the mobile JS runtime from attempting to execute test code (e.g., Jest globals), which causes launch-time crashes.
- **Clear Boundaries**: The `app/` directory acts strictly as a "Configuration Layer" for routes, while `src/` serves as the "Engine" of the application.
