import Head from 'next/head';
// import Image from 'next/image'
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import MovieCard from '@/components/MovieCard';
import { SortAccordion, FilterAccordion, WatchAccordion } from '@/components/Nav';
import { useEffect, useState } from 'react';
// import { Movie } from '@/types';
import type { MovieResult } from 'moviedb-promise';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [endReached, setEndReached] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => fetchMovies(), []);

  const fetchMovies = () => {
    setLoading(true);
    fetch(`./api/movies?page=${page}`)
      .then(response => response.json())
      .then(json => updateStates(json))
      .catch(err => {
        setLoading(false);
        setError(err.message);
      })
      .then(() => setPage(page + 1));
  };

  const updateStates = (response: MovieResult[]) => {
    const _movies = [...movies, ...response];
    setError('');
    setMovies(_movies);
    const reached = _movies.length >= 100;
    console.log({ reached });
    setEndReached(reached);
    setLoading(false);
  };

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
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                name={movie.title!}
                image={`http://image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
                date={movie.release_date!}
                rating={(movie.vote_average! * 10).toFixed(0)}
              />
            ))}
          </div>
          <div className={styles.info_bar}>
            {error && <div className={styles.error_box}>{error}</div>}
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
