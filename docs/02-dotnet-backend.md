# .NET Backend

## Why .NET?

- High performance and low memory footprint (ASP.NET Core ranks among the top in TechEmpower benchmarks)
- Strong type safety and compile-time checks
- Extensive ecosystem (Entity Framework, Identity, MediatR, etc.)
- Suitable for both REST APIs and microservices
- Cross-platform (runs on Linux in Docker)

## What this backend does

The Todo API provides a RESTful CRUD interface:

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/api/todos` | GET | Get all todos |
| `/api/todos/{id}` | GET | Get a specific todo |
| `/api/todos` | POST | Create a new todo |
| `/api/todos/{id}` | PUT | Update a todo |
| `/api/todos/{id}` | DELETE | Delete a todo |

Technical choices:
- **Entity Framework Core InMemory** for easy demo setup (no database required)
- **Controller-based API** with clear route and model binding
- **Primary constructor** for DI (.NET 12+ feature)

## Contract (what the frontend sees)

```json
// GET /api/todos
[
  {
    "id": 1,
    "title": "Buy groceries",
    "isCompleted": false,
    "createdAt": "2026-06-11T12:00:00Z"
  }
]

// POST /api/todos
// Body: { "title": "New task" }
```

The frontend has no knowledge of:
- How data is stored (InMemory, SQL, etc.)
- How business logic works
- Whether other services exist behind the API
