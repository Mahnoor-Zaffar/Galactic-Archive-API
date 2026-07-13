# Database Design

## Entity Relationship Diagram

```
                    species
                       |
                       |
    users ──── characters ──── planets
                       |
                   factions
                       |
                 character_movies
                       |
                     movies
```

## Tables

### users
| Column        | Type     | Description              |
|---------------|----------|--------------------------|
| id            | UUID     | Primary key              |
| email         | String   | Unique                   |
| password_hash | String   | bcrypt hashed            |
| role          | Enum     | USER or ADMIN            |
| created_at    | DateTime |                          |
| updated_at    | DateTime |                          |

### characters
| Column      | Type     | References                |
|-------------|----------|---------------------------|
| id          | UUID     | Primary key               |
| name        | String   |                           |
| height      | Float?   |                           |
| age         | Int?     |                           |
| gender      | String?  |                           |
| species_id  | UUID?    | species.id                |
| planet_id   | UUID?    | planets.id                |
| faction_id  | UUID?    | factions.id               |
| description | String?  |                           |
| created_at  | DateTime |                           |
| updated_at  | DateTime |                           |

### planets, species, factions, starships, movies
Each follows the same pattern: `id (UUID), name (unique), description, created_at, updated_at` plus type-specific fields.

### character_movies (junction)
| Column       | Type | References     |
|--------------|------|----------------|
| character_id | UUID | characters.id  |
| movie_id     | UUID | movies.id      |

Composite primary key on (character_id, movie_id).

## Migrations

Migrations are managed by Prisma. To create a new migration:

```bash
npx prisma migrate dev --name description_of_change
```

To apply in production:

```bash
npx prisma migrate deploy
```
