// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { MovieResult } from 'moviedb-promise';
import { getMovies } from '@/utils/getMovies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieResult[] | { [key: string]: unknown }>
) {
  if (!('page' in req.query) || typeof req.query.page !== 'string') {
    return res.status(500).send({ success: false });
  }
  try {
    const page = parseInt(req.query.page, 10);
    const results = await getMovies(page);
    return res.status(200).json(results);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ success: false, message: e });
  }
}
