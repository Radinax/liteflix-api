import { sqliteTable, int, text, blob } from "drizzle-orm/sqlite-core";

export const $movies = sqliteTable("movies", {
  id: int().primaryKey(),
  title: text().notNull(),
  image: text().notNull(),
});

export const $files = sqliteTable("files", {
  id: int().primaryKey(),
  type: text().notNull(),
  content: blob().notNull().$type<ArrayBuffer>(),
  movieId: int().references(() => $movies.id, {
    onDelete: "set null",
  }),
});
