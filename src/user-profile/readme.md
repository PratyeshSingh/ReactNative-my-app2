
Layered Architecture (Presentation / Domain / Data)

This is a Clean Architecture pattern adapted to React Native. It's asked in interviews at mid-to-senior level to see if you can structure an app beyond "everything in the component."

┌─────────────────────────────────────────┐
│         Presentation Layer               │
│  Screens, Components, ViewModels/Hooks   │
│  (React Native / Expo UI code)           │
└───────────────────┬───────────────────────┘
                    │ depends on
┌───────────────────▼───────────────────────┐
│           Domain Layer                     │
│  Entities, Use Cases (business rules),     │
│  Repository INTERFACES                     │
│  — pure TypeScript, zero RN/React imports  │
└───────────────────┬───────────────────────┘
                    │ implemented by
┌───────────────────▼───────────────────────┐
│           Data Layer                       │
│  Repository implementations, API clients,  │
│  local DB/cache, mappers (DTO → Entity)    │
└─────────────────────────────────────────┘