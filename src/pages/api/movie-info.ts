// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { MovieResponse } from 'moviedb-promise';
import { getMovieInfo } from '@/utils/getMovies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieResponse | { [key: string]: unknown }>
) {
  if (!('id' in req.query) || typeof req.query.id !== 'string') {
    return res.status(500).send({ success: false });
  }
  try {
    const id = parseInt(req.query.id, 10);
    const results = await getMovieInfo(id);
    return res.status(200).json(results);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ success: false, message: e });
  }
}
