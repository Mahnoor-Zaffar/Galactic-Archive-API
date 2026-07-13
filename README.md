# Galactic Archive API

A public REST API for querying fictional universe data — characters, planets, species, starships, factions, and events.

Built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev --name init

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

The API will be available at `http://localhost:3000/api/v1`.

## API Documentation

Once running, visit `http://localhost:3000/api-docs` for interactive Swagger documentation.

## Docker

```bash
docker-compose up --build
```

## Project Structure

```
src/
├── app.js                  # Express app setup
├── server.js               # Entry point
├── config/                 # Database, environment, swagger
├── middleware/              # Auth, error handling, validation, rate limiting
├── modules/                # Feature modules
│   ├── auth/               # Registration and login
│   ├── characters/         # CRUD + relationships
│   ├── planets/
│   ├── species/
│   ├── starships/
│   ├── factions/
│   └── movies/
├── utils/                  # Shared utilities
└── routes/                 # Route aggregator
```

## Architecture

Layered architecture: Routes → Controllers → Services → Repository → Database

See [ARCHITECTURE.md](ARCHITECTURE.md) for details.

## License

MIT
