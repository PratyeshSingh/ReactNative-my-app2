# Product Browser | Clean Architecture & React Native

A sophisticated mobile product catalog built with **React Native (Expo)**, demonstrating enterprise-grade architectural patterns and optimized performance.

## 🏗️ Architecture Philosophy
This project implements **Clean Architecture** to achieve a decoupled, testable, and maintainable codebase. By isolating the **Domain** (Business Rules) from **Data** (Infrastructure) and **Presentation** (UI), the application remains resilient to changes in external frameworks or APIs.

## 🚀 Key Features
- **High-Performance Catalog**: Smooth list rendering using optimized UI patterns.
- **Context-Aware Search**: Real-time product discovery via API integration.
- **Modular DI**: Manual dependency injection for controlled object lifecycles.
- **Comprehensive Testing**: Robust unit test suite for core business use cases.

## 🛠️ Quick Start
1.  **Environment Setup**:
    ```bash
    npm install
    ```
2.  **Execution**:
    - **Expo Launch**: `npx expo start`
    - **iOS**: `npm run ios`
    - **Android**: `npm run android`
    
3.  **Verification**:
    ```bash
    - npm test
    - npm test -- --runInBand
    ```

## 📚 Documentation
Detailed engineering specifications are available in the `/docs` directory:
- **[Engineering Guide](./docs/Engineering_Guide.md)**: Project structure and runtime rationale.
- **[High-Level Design (HLD)](./docs/HLD.md)**: Architectural patterns and data flow.
- **[Low-Level Design (LLD)](./docs/LLD.md)**: Module definitions and DI strategy.
- **[SDK Specifications](./docs/SDKDetails.md)**: Complete dependency audit.
- **[Business Requirements](./docs/Task.md)**: Original project objectives.
