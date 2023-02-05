// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Movie = {
  id: string | number,
  name: string,
  image: string, 
  date: string,
  rating: string
} 

type Data = {
  movies: Array<Movie>
  // total number of movies in the db
  count: number
}

const _movies = new Array(13).fill(1).map(_ => ({
  id: Math.random(),
  name: "Some movie",
  image: "https://images.moviesanywhere.com/6305a9e8ed76d5fa485ac16637655cf7/bcc68be4-eede-409b-a63d-e179b28d19b4.webp?h=375&resize=fit&w=250", 
  date: "12-12-2022",
  rating: "72"
}))

_movies.splice(5, 0, {
  id: Math.random(),
  name: "Some very long movie title here",
  image: "https://images.moviesanywhere.com/6305a9e8ed76d5fa485ac16637655cf7/bcc68be4-eede-409b-a63d-e179b28d19b4.webp?h=375&resize=fit&w=250", 
  date: "12-12-2022",
  rating: "72"
})

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const limit = +req.query.limit!
  const fromIndex = !req.query.fromIndex!
  setTimeout(() => {
    res.status(200).json({ movies: _movies, count: 30 })
  }, 4000);
}
