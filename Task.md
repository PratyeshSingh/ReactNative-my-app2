# Technical Task: Product Browser App (React Native)

## 1. Project Overview & Business Value

Expectation is here to translate business requirements into highly scalable, maintainable codebases across platforms. This technical task evaluates your understanding of:

* **Clean Architecture** design patterns.
* Multiplatform application development utilizing **React Native App**.
* Your ability to build a highly functional, responsive mobile experience for both Android and iOS.

The application serves as a mobile product catalog prototype designed for personal exploration. It consumes live product data from the public [DummyJSON Products API](https://dummyjson.com/docs/products).

---

## 2. Core Functional Requirements

The prototype must provide a fluid user experience supporting these core interactions:

1. **Product List:** Display a scrollable list of products containing:
* Product Name (Title)
* Price
* Thumbnail Image


2. **Product Details:** Tapping a product navigates the user to a detailed screen showing:
* Full Title & Description
* Brand Name
* Price
* User Rating


3. **Search Functionality:** An active keyword-based search that integrates directly with the [DummyJSON search API endpoint](https://dummyjson.com/docs/products).
4. **Category Filtering (Optional / Bonus):** Provide a clean way to filter products by their respective categories.

---

## 3. Architecture & Technical Specifications

To ensure enterprise-grade code quality, the implementation must adhere strictly to the following parameters:

### Architectural Design

* **Clean Architecture Rules:** Explicitly separate concerns into isolated **Data**, **Domain**, and **Presentation** layers.
* **Unified UI:** Build shared user interface components across both Android and iOS using **React Native**.
* **State Management:** Maintain a unidirectional data flow (UDF) using React's **useState** within the Hooks/useEffects to expose UI state.

### Technical Stack

* **Networking Client:** [Ktor Client](https://ktor.io/) for cross-platform API requests.
* **JSON Serialization:** React serialization support sdk for parsing network payloads safely without reflection.
* **Dependency Injection:** Optional. Manual DI is fully acceptable, though you may use frameworks if preferred.(i.e. createContext , useContext etc).

---

## 4. Deliverables & Evaluation Criteria

### Mandatory Deliverables

1. **Source Code:** A fully accessible GitHub repository containing the complete React Native source code.
2. **README Documentation:** A robust documentation file containing:
* A summary of the target business requirements.
* A high-level project architecture overview.
* Step-by-step instructions on compiling and running the application on both Android and iOS hosts.
* Any key technical trade-offs or structural assumptions made during development.


3. **Test Suite:** At least one business logic unit test targeting a business use case (e.g., `GetProducts`, `SearchProducts`) or the underlying Repository implementation.

### Evaluation Criteria

Your work will be reviewed against the following engineering benchmarks:

* **Architecture:** Clean separation of concerns with well-structured multiplatform modules.
* **API Integration:** Proper configurations of the Ktor client and robust parsing of remote data models.
* **UI/UX Design:** Functional, responsive, and consistent UI presentation using Compose on both Android and iOS targets.
* **Code Quality:** Clean, highly readable, maintainable, and testable idiomatic React code.
* **Platform Support:** Working platform builds for both Android and iOS native targets.
* **Business Translation:** Direct and accurate mapping of requirements into functional logic.
* **Bonus Points:** Implement Category Filtering, Local Caching (offline capabilities), or active iOS live previews using Compose Multiplatform.