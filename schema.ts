import { string, z } from "zod";

// Schema for a single result item
export const ResultItemSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

// Schema for the entire response
export const ResponseSchemaNowPlaying = z.object({
  dates: z.object({
    maximum: z.string(), // ISO date string
    minimum: z.string(), // ISO date string
  }),
  page: z.number(),
  results: z.array(ResultItemSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

// Schema for the entire response
export const ResponseSchemaPopular = z.object({
  page: z.number(),
  results: z.array(ResultItemSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const CreateMovieSchema = z.object({
  title: z.string(),
  image: z.string(),
  fileId: z.string(),
});

export const HeaderSchema = z.object({
  "content-type": z.string().refine((s) => s.startsWith("image/")),
});

export const MovieSchema = z.object({
  id: z.string(),
  title: z.string(),
  score: z.number(),
  date: z.number(),
  postUrl: z.string(),
  backdropUrl: z.string(),
});

export const MoviesSchema = MovieSchema.array();

export type Movies = z.infer<typeof MoviesSchema>;
export type Movie = z.infer<typeof MovieSchema>;
