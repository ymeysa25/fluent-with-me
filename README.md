# fluent-with-me


backend/
├── app.ts                    ✅ App entry point
│
├── domain/                  💡 Core business logic
│   ├── entities/            🧠 Business objects (Word, User, Flashcard)
│   ├── enums/               📚 Domain-level constants/enums
│   └── interfaces/          🔌 Contract-level (no implementation)
│       ├── repositories/    🔌 IRepository abstractions (e.g., IWordRepo)
│       └── usecases/        🔌 IUseCase interfaces (Input/Output types)
│
├── application/             🚪 Use case implementations (domain logic orchestrator)
│   ├── usecases/            🎯 UseCase logic that implements `interfaces/usecases`
│   ├── adapters/            🧩 Data mappers, serializers, DTO builders (optional)
│   └── middleware/          🧱 Express middlewares
│
├── infrastructure/          🏗️ External tech dependencies (DB, Redis, APIs)
│   ├── controllers/         🚦 Express route handlers (connect UI ↔ use cases)
│   ├── composers/           🧬 UseCase + Repository + Controller wiring (Dependency Injection)
│   ├── databases/           🛢️ Prisma/TypeORM/Postgres config
│   └── redis/               ⚡ Redis client logic (if used)
│
├── http/                    🌐 Web layer
│   ├── routes/              📍 Route definitions (bind route ↔ controller)
│   ├── helpers/             🧰 Utility for responses, errors, validation
│   └── server.ts            🚀 Express app + middleware bootstrap
