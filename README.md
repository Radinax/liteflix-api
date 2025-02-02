# LITEFLIX API

This is a lightweight RESTful API built using the [Hono](https://hono.dev/) framework. It allows users to manage movies and upload files, with endpoints for fetching popular movies, creating new movie entries, uploading files, and retrieving uploaded files.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [CORS Configuration](#cors-configuration)

## Features

- **Fetch Popular Movies**: Retrieve a list of outstanding and popular movies.
- **Create Movie**: Add a new movie entry to the database.
- **File Upload**: Upload files (e.g., images) and link them to movies.
- **Retrieve Uploaded Files**: Fetch uploaded files by their unique ID.

## Prerequisites

- Node.js >= 16.x
- bun or npm
- SQLite

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Radinax/liteflix-api.git
   cd liteflix-api
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up your environment variables in a `.env` file:

   ```env
   MOVIEDB_KEY=YOUR_MOVIE_KEY
   DB_TOKEN=YOUR_DB_TURSO_TOKEN
   DB_URL=YOU_DB_TURSO_URL
   CORS_ORIGIN=YOUR_ORIGIN
   ```

4. Run the application:
   ```bash
   bun run dev
   ```

The API will be available at `http://localhost:3000`.

## API Endpoints

### 1. Fetch Movies (`GET /movies`)

Retrieves an outstanding movie and a list of popular movies.

**Response:**

```json
{
  "result": {
    "outstandingMovie": { ... },
    "popularMovies": [ ... ]
  }
}
```

---

### 2. Create Movie (`POST /movies`)

Creates a new movie entry in the database.

**Request Body:**

```json
{
  "title": "Inception",
  "fileId": 1
}
```

**Response:**

```json
{
  "movieId": 1,
  "message": "Movie created successfully"
}
```

---

### 3. Upload File (`POST /upload`)

Uploads a file (e.g., an image) and stores it in the database.

**Headers:**

- `Content-Type`: The MIME type of the file (e.g., `image/jpeg`).

**Response:**

```json
{
  "fileId": 1,
  "imagePath": "/files/1"
}
```

---

### 4. Retrieve File (`GET /files/:id`)

Fetches a file by its ID.

**Response:**

- Binary file content with appropriate `Content-Type` header.

---

## Database Schema

The application uses [Drizzle ORM](https://orm.drizzle.team/) for database interactions. The schema includes two main tables:

1. **`$movies`**: Stores movie details.

   - `id`: Unique identifier for the movie.
   - `title`: Title of the movie.
   - `image`: Foreign key referencing the `id` of the uploaded file.

2. **`$files`**: Stores uploaded files.
   - `id`: Unique identifier for the file.
   - `content`: Binary content of the file.
   - `type`: MIME type of the file.
   - `movieId`: Reference to Movie Table.

Migrations are applied automatically on startup using the `applyMigrations()` function.

---

## Error Handling

- If an error occurs during database operations, the API returns a `500 Internal Server Error` with a generic error message.
- For invalid requests (e.g., missing fields), the API validates input using Zod schemas and returns a `400 Bad Request` response.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---

Made by **Eng. Adrian Beria**
