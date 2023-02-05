import Head from 'next/head';
// import Image from 'next/image'
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import MovieCard from '@/components/MovieCard';
import {
  SortAccordion,
  FilterAccordion,
  WatchAccordion,
} from '@/components/Nav';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

type Movie = {
  id: string | number,
  name: string,
  image: string, 
  date: string,
  rating: string
} 

export default function Home() {
  const [ movies, setMovies ] = useState<Movie[]>([])
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState("")
  const [ endReached, setEndReached ] = useState(false)

  useEffect(() => fetchMovies(), [])
  
  const fetchMovies = () => {
   setLoading(true)
   fetch("./api/movies?limit=20") 
    .then(response => response.json())
    .then((json) => updateStates(json))
    .catch((err) => {
      setLoading(false)
      setError(err.message)
    })
  }
  
  const updateStates = (response: { movies: Movie[], count: number}) => {
    const _movies = [...movies, ...response.movies]
    setError("")
    setMovies(_movies)
    const reached = _movies.length >= response.count
    console.log({reached})
    setEndReached(reached)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Tiger Mist - Popular Movies Code Test</title>
        <meta name="description" content="Tiger Mist - Popular Movies Code Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={inter.className}>popular movies</h1>
        </header>
        <nav className={styles.nav}>
          <SortAccordion />
          <FilterAccordion />
          <WatchAccordion />
        </nav>
        <div className="overflow-y-auto h-full">
          <div className={styles.movies__grid} data-end={endReached}>
            {movies.map(({ id, name, image, date, rating}) => (
              <MovieCard
                key={id}
                name={name}
                image={image}
                date={date}
                rating={rating}
              />
            ))}
          </div>
            <div className={styles.info_bar}>
              {error && (
                <div className={styles.error_box}>{error}</div>
              )}
              {loading ? (
                <button className={styles.loading_more} disabled>
                  {/* @todo: use the unicode ellipse key here */}
                  Loading...
                </button>
              ) : (
                <>
                  {!endReached && (
                    <button className={styles.load_more} onClick={fetchMovies}>
                      Load more
                    </button>
                  )}
                </>
              )}
            </div>
        </div>
      </main>
    </>
  );
}
