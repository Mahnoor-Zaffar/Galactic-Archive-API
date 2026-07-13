<p align="center">
  <img src="https://img.shields.io/badge/status-live-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://github.com/Mahnoor-Zaffar/Galactic-Archive-API/actions/workflows/ci.yml/badge.svg" alt="CI">
  <img src="https://img.shields.io/badge/PRs-welcome-orange" alt="PRs">
</p>

<h1 align="center">Galactic Archive API</h1>
<p align="center">
  <em>A production-grade REST API platform for exploring fictional universe data — characters, planets, species, starships, factions, and events.</em>
</p>
<p align="center">
  <strong><a href="https://galactic-archive-api.onrender.com">Live Demo</a></strong> ·
  <strong><a href="https://galactic-archive-api.onrender.com/api-docs">API Documentation</a></strong>
</p>

---

## Overview

Galactic Archive is not a Star Wars clone. It is a **public API platform** that happens to serve fictional universe data — designed with the same architectural principles as any real-world data API you'd find at SWAPI, Pokémon API, or REST Countries.

Built to demonstrate **senior-level backend engineering** — layered architecture, type-safe ORM, JWT authentication, role-based authorization, pagination, filtering, search, sorting, rate limiting, and CI-ready testing. The same patterns scale to any domain.

**Live URL:** `https://galactic-archive-api.onrender.com/api/v1`

```json
GET /api/v1/health
{ "status": "ok", "database": "connected", "uptime": 12837 }
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client                               │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   Express Router                              │
│            Validation · Rate Limiting · Auth                  │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   Controller Layer                            │
│            HTTP concerns — req/res parsing                    │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   Service Layer                               │
│            Business logic · Orchestration                     │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   Repository Layer                            │
│            Data access · Prisma ORM                           │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   PostgreSQL                                  │
│            8 tables · Relationships · Indexes                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Model

```
                    species
                       │
                       │
    users ──── characters ──── planets
                       │
                   factions
                       │
                 character_movies
                       │
                     movies
```

- **Users** — authentication & role-based access (USER / ADMIN)
- **Characters** — belongs to Species, Planet, Faction; has many Movies
- **Planets** — climate, terrain, population
- **Species** — language, lifespan
- **Starships** — model, manufacturer, crew capacity, speed
- **Factions** — alignment (LIGHT / DARK / NEUTRAL)
- **Movies** — episode, release date

**Junction table:** `character_movies` enables many-to-many relationships between characters and movies.

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Runtime** | Node.js 20 | Non-blocking I/O, vast ecosystem |
| **Framework** | Express 4 | De facto standard, mature middleware ecosystem |
| **ORM** | Prisma 5 | Type-safe queries, auto-generated client, declarative migrations |
| **Database** | PostgreSQL 16 | Relational integrity, JSON support, full-text search ready |
| **Auth** | JWT + bcrypt | Stateless authentication, industry-standard hashing |
| **Validation** | Zod | Runtime type safety, composable schemas |
| **Docs** | Swagger (OpenAPI 3) | Interactive API exploration |
| **Testing** | Jest + Supertest | Integration tests against live Express app |

---

## Features

- **🔐 JWT Authentication** — register/login with bcrypt password hashing. Role-based authorization (USER / ADMIN) on all write endpoints.
- **📄 Pagination** — `GET /characters?page=1&limit=20`. Configurable page size, max 100.
- **🔍 Filtering** — `GET /characters?speciesId={uuid}&planetId={uuid}`. Filter by any related entity.
- **🔎 Search** — `GET /characters?search=vader`. Full-text search across name and description fields.
- **📊 Sorting** — `GET /characters?sort=name&order=asc`. Sort by any supported field.
- **⏱ Rate Limiting** — 100 requests/hour per user, 20 requests/15min for auth endpoints.
- **🛡 Security** — Helmet headers, CORS, request size limits, input validation.
- **📖 Swagger Docs** — Interactive API documentation at `/api-docs`.
- **🐳 Docker** — One-command local setup with `docker-compose up`.

---

## API Endpoints

### Public (no auth required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check with database status |
| GET | `/characters` | List characters (filterable, pageable) |
| GET | `/characters/:id` | Get character with all relationships |
| GET | `/planets` | List planets |
| GET | `/planets/:id` | Get planet |
| GET | `/species` | List species |
| GET | `/species/:id` | Get species |
| GET | `/starships` | List starships |
| GET | `/starships/:id` | Get starship |
| GET | `/factions` | List factions |
| GET | `/factions/:id` | Get faction |
| GET | `/movies` | List movies |
| GET | `/movies/:id` | Get movie |

### Auth (public)

| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/auth/register` | `{ email, password }` |
| POST | `/auth/login` | `{ email, password }` |

### Admin (requires JWT + ADMIN role)

| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/characters` | `{ name, height, speciesId, ... }` |
| PUT | `/characters/:id` | `{ name, height, ... }` |
| DELETE | `/characters/:id` | — |
| POST | `/planets`, `/species`, `/starships`, `/factions`, `/movies` | Resource payload |
| PUT | `/:id` for all resources | Partial update |
| DELETE | `/:id` for all resources | — |

### Query Parameters (all list endpoints)

```
GET /characters?page=1&limit=10&search=luke&sort=name&order=asc&speciesId=...

GET /characters?page=2&limit=5&search=vader&sort=height&order=desc
```

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/Mahnoor-Zaffar/Galactic-Archive-API.git
cd Galactic-Archive-API
npm install

# Set up database
cp .env.example .env
npx prisma migrate dev --name init
npm run db:seed

# Start
npm run dev
```

The API will be available at `http://localhost:3000/api/v1`.

---

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

Tests cover:
- Controller responses and status codes
- Input validation (Zod schemas)
- Authentication (missing token, expired token, invalid credentials)
- Pagination edge cases
- 404 handling for non-existent resources

---

## Deployment

Deployed on **Render** with a **Supabase PostgreSQL** backend.

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Supabase connection URI |
| `JWT_SECRET` | Auto-generated |

---

## Project Structure

```
src/
├── app.js                      # Express application setup
├── server.js                   # Entry point
├── config/
│   ├── database.js             # Prisma client
│   ├── environment.js          # Environment config
│   └── swagger.js              # OpenAPI spec
├── middleware/
│   ├── auth.middleware.js      # JWT + role guard
│   ├── error.middleware.js     # Centralized error handler
│   ├── rateLimiter.middleware.js
│   └── validate.middleware.js  # Zod validation
├── modules/                    # Feature modules
│   ├── auth/
│   ├── characters/
│   ├── planets/
│   ├── species/
│   ├── starships/
│   ├── factions/
│   └── movies/
├── utils/                      # Base classes, pagination, errors
└── routes/                     # Route aggregator
```

---

## License

MIT
