import {
  ResponseSchemaNowPlaying,
  ResponseSchemaPopular,
  type Movie,
  type Movies,
} from "./schema";

const apiKey = process.env.MOVIEDB_KEY!;
const baseUrl = "https://api.themoviedb.org/3";

/**
 * Helper function to fetch data from the API
 */
const fetchData = async (endpoint: string, params: Record<string, string>) => {
  const url = new URL(`${baseUrl}/${endpoint}`);
  url.search = new URLSearchParams({ ...params, api_key: apiKey }).toString();

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
};

export const getOutstandingMovie = async (): Promise<Movie> => {
  const result = await fetchData("movie/now_playing", {});

  const parsed = ResponseSchemaNowPlaying.parse(result);

  return parsed.results
    .sort((a, b) => b.vote_average - a.vote_average)
    .map((result) => ({
      id: result.id.toString(),
      title: result.original_title,
      score: result.vote_average,
      date: new Date(result.release_date).getFullYear(),
      postUrl: `https://image.tmdb.org/t/p/w500/${result.poster_path}`,
      backdropUrl: `https://image.tmdb.org/t/p/original/${result.backdrop_path}`,
    }))[0];
};

export const getPopularMovies = async (): Promise<Movies> => {
  const result = await fetchData("movie/popular", {});

  const parsed = ResponseSchemaPopular.parse(result);

  return parsed.results.map((result) => ({
    id: result.id.toString(),
    title: result.original_title,
    score: result.vote_average,
    date: new Date(result.release_date).getFullYear(),
    postUrl: `https://image.tmdb.org/t/p/w500/${result.poster_path}`,
    backdropUrl: `https://image.tmdb.org/t/p/original/${result.backdrop_path}`,
  }));
};
