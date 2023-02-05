import { MovieDb, MovieResult } from 'moviedb-promise';

export async function getMovies(page: number): Promise<MovieResult[]> {
  console.log(`requested page: ${page}`);
  const movieApiKey: string = process.env.MOVIE_API_KEY || '';
  const movieDb = new MovieDb(movieApiKey);
  const popMovies = await movieDb.moviePopular({ page });
  if (!popMovies.results) throw Error('No Results available');
  return popMovies.results;
}
