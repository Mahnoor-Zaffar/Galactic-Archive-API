# API Reference

Base URL: `/api/v1`

## Authentication

### Register
```
POST /auth/register
Body: { "email": "...", "password": "..." }
```

### Login
```
POST /auth/login
Body: { "email": "...", "password": "..." }
```

## Public Endpoints

All GET endpoints support pagination, filtering, searching, and sorting.

### Characters
```
GET    /characters
GET    /characters/:id
POST   /characters         [ADMIN]
PUT    /characters/:id     [ADMIN]
DELETE /characters/:id     [ADMIN]
```

### Planets
```
GET    /planets
GET    /planets/:id
POST   /planets            [ADMIN]
PUT    /planets/:id        [ADMIN]
DELETE /planets/:id        [ADMIN]
```

### Species
```
GET    /species
GET    /species/:id
POST   /species            [ADMIN]
PUT    /species/:id        [ADMIN]
DELETE /species/:id        [ADMIN]
```

### Starships
```
GET    /starships
GET    /starships/:id
POST   /starships          [ADMIN]
PUT    /starships/:id      [ADMIN]
DELETE /starships/:id      [ADMIN]
```

### Factions
```
GET    /factions
GET    /factions/:id
POST   /factions           [ADMIN]
PUT    /factions/:id       [ADMIN]
DELETE /factions/:id       [ADMIN]
```

### Movies
```
GET    /movies
GET    /movies/:id
POST   /movies             [ADMIN]
PUT    /movies/:id         [ADMIN]
DELETE /movies/:id         [ADMIN]
```

## Query Parameters

| Parameter | Type   | Description                          |
|-----------|--------|--------------------------------------|
| page      | int    | Page number (default: 1)             |
| limit     | int    | Items per page (default: 20, max:100)|
| search    | string | Search across name and description   |
| sort      | string | Sort field (e.g., name, createdAt)   |
| order     | string | asc or desc (default: desc)          |
| [field]   | string | Filter by specific field             |

Example:
```
GET /characters?page=1&limit=10&search=vader&sort=name&order=asc&speciesId=<uuid>
```

## Errors

```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Character not found."
}
```
