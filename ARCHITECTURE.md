# Architecture

## Layered Architecture

```
Client
  |
  v
Express Router      — routes, validation
  |
  v
Controller          — HTTP request/response handling
  |
  v
Service             — business logic
  |
  v
Repository          — data access (Prisma)
  |
  v
PostgreSQL          — relational database
```

## Why This Architecture

- **Separation of concerns**: Each layer has a single responsibility.
- **Testability**: Services and repositories can be tested in isolation.
- **Maintainability**: Adding new resources follows a consistent pattern.
- **Scalability**: Easy to add caching, search, or swap data sources.

## Data Model

```
species ──┐
          ├── characters ──── planets
factions ─┘       │
                  └── character_movies ──── movies
```

## API Design

- RESTful conventions
- API versioning (`/api/v1/`)
- Paginated responses
- Filtering, searching, sorting
- JWT authentication
- Role-based authorization (USER / ADMIN)
- Rate limiting per user/IP
