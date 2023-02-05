// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { Movie } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { MovieDb, MovieResult } from 'moviedb-promise';

const movieApiKey: string = process.env.MOVIE_API_KEY || '';
console.log(`API key read: ${movieApiKey}`);
const movieDb = new MovieDb(movieApiKey);

// type Data = {
//   movies: Array<Movie>;
//   // total number of movies in the db
//   count: number;
// };

// const _movies = new Array(13).fill(1).map(_ => ({
//   id: Math.random(),
//   name: 'Some movie',
//   image:
//     'https://images.moviesanywhere.com/6305a9e8ed76d5fa485ac16637655cf7/bcc68be4-eede-409b-a63d-e179b28d19b4.webp?h=375&resize=fit&w=250',
//   date: '12-12-2022',
//   rating: '72',
// }));

// _movies.splice(5, 0, {
//   id: Math.random(),
//   name: 'Some very long movie title here',
//   image:
//     'https://images.moviesanywhere.com/6305a9e8ed76d5fa485ac16637655cf7/bcc68be4-eede-409b-a63d-e179b28d19b4.webp?h=375&resize=fit&w=250',
//   date: '12-12-2022',
//   rating: '72',
// });

export default async function handler(req: NextApiRequest, res: NextApiResponse<MovieResult[]>) {
  const page = +req.query.page!;
  console.dir(req.query);
  console.log(`requested page: ${page} and typeOf ${typeof page}`);
  const popMovies = await movieDb.moviePopular({ page });
  console.log(`length of movie array: ${popMovies.results?.length}`); // * 20 at a time, page 1
  if (!popMovies.results) {
    res.status(404);
    return;
  }
  res.status(200).json(popMovies.results);
  // setTimeout(() => {
  // }, 2000);
}

/**
 * sleep
 * @param ms `number` time in milliseconds
 * @returns `Promise` when timer finished
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
