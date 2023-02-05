// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { MovieDb, MovieResult } from 'moviedb-promise';

const movieApiKey: string = process.env.MOVIE_API_KEY || '';
const movieDb = new MovieDb(movieApiKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieResult[] | { [key: string]: unknown }>
) {
  if (!('page' in req.query) || typeof req.query.page !== 'string') {
    return res.status(500).send({ success: false });
  }
  try {
    const page = parseInt(req.query.page, 10);
    console.log(`requested page: ${page}`);
    const popMovies = await movieDb.moviePopular({ page });
    if (!popMovies.results) {
      throw 'No Results available';
    }
    res.status(200).json(popMovies.results);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ success: false, message: e });
  }
}
