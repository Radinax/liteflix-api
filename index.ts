import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { getOutstandingMovie, getPopularMovies } from "./client";
import { zValidator } from "@hono/zod-validator";
import { CreateMovieSchema, HeaderSchema } from "./schema";
import { applyMigrations, db } from "./db";
import { $files, $movies } from "./db/schema";
import { eq } from "drizzle-orm";

try {
  applyMigrations();
} catch {
  process.exit(1);
}

const app = new Hono();

app.use(logger());
app.use(
  "*",
  cors({
    origin: "http://localhost:5173", // Change to ENV
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 86400,
    credentials: true,
  })
);

app.get("/movies", async (c) => {
  const outstandingMovie = await getOutstandingMovie();
  const popularMovies = await getPopularMovies();

  return c.json({ result: { outstandingMovie, popularMovies } });
});

app.post("/movies", zValidator("json", CreateMovieSchema), async (c) => {
  const { title, fileId } = c.req.valid("json");

  try {
    // Insert the movie into the $movies table
    const [movie] = await db
      .insert($movies)
      .values({
        title,
        image: fileId, // Link the movie to the uploaded file
      })
      .returning({
        id: $movies.id,
      });

    return c.json({ movieId: movie.id, message: "Movie created successfully" });
  } catch (err) {
    console.error({ err });
    return c.text("Error creating movie", 500);
  }
});

app.post("/upload", zValidator("header", HeaderSchema), async (c) => {
  const data = c.req.valid("header");
  const content = await c.req.arrayBuffer();

  try {
    const [files] = await db
      .insert($files)
      .values({
        content,
        type: data["content-type"],
      })
      .returning({
        id: $files.id,
      });

    return c.json({ fileId: files.id, imagePath: `/files/${files.id}` });
  } catch (err) {
    console.log({ err });
    return c.text("Error uploading file", 500);
  }
});

app.get("/files/:id", async (c) => {
  const fileId = Number(c.req.param("id"));
  const [file] = await db.select().from($files).where(eq($files.id, fileId));

  if (!file) {
    return c.text("File not found", 404);
  }

  console.log({ file });

  // Return the file as binary data
  return c.body(file.content, 200, { "Content-Type": file.type });
});

export default {
  port: 3000,
  fetch: app.fetch,
};
