import { MovieDb, MovieResult } from 'moviedb-promise';

const movieApiKey: string = process.env.MOVIE_API_KEY || '';
const movieDb = new MovieDb(movieApiKey);

export async function getMovies(page: number): Promise<MovieResult[]> {
  console.log(`requested page: ${page}`);
  const popMovies = await movieDb.moviePopular({ page });
  if (!popMovies.results) throw Error('No Results available');
  return popMovies.results;
}

export function getMovieInfo(id: number) {
  console.log(`requested more info about movie id: ${id}`);
  return movieDb.movieInfo(id);
}
