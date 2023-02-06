import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import MovieCard from '@/components/MovieCard';
import { SortAccordion, FilterAccordion, type Value as AccordionValue, SortOption } from '@/components/Nav';
import { FormEventHandler, useCallback, useState } from 'react';
import type { MovieResult } from 'moviedb-promise';
import { getMovies } from '@/utils/getMovies';

const inter = Inter({ subsets: ['latin'] });

const initialFilter: AccordionValue = {
  movieRating: 0,
  movieReleaseDate: '',
  movieTitle: '',
};

export default function Home({ serverMovies }: { serverMovies: MovieResult[] }) {
  const [movies, setMovies] = useState<MovieResult[]>(serverMovies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [endReached, setEndReached] = useState(false);
  const [page, setPage] = useState(2);
  const [filterValue, setFilterValue] = useState<AccordionValue>(initialFilter);
  const [filteredMovies, setFilteredMovies] = useState<MovieResult[]>(serverMovies);
  const [sortOption, setSortOPtion] = useState("popularity:desc")

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

  const updateStates = (response: MovieResult[] | { success: false, message: string }) => {
    if (!Array.isArray(response)) {
      setEndReached(true)
      if (!response.message.includes("422"))
        setError(response.message)
      setLoading(false)
    } else {
      let _movies = [...movies, ...response];
      _movies = sortMovies(_movies, sortOption)
      setError('');
      setMovies(_movies);
      // loading more doesn't take into account the current filter.
      // it takes into account only sorting.
      setFilteredMovies(_movies)
      setLoading(false);
    }
  };

  const handleFilterChange = useCallback((filterState: AccordionValue) => setFilterValue(filterState), []);
  const handleSortChange = useCallback(
    (sortValue: string) => {
      setSortOPtion(sortValue)
      const sortedAllMovies = sortMovies(movies, sortValue)
      setMovies(sortedAllMovies)
      const sortedMovies = sortMovies(filteredMovies, sortValue)
      setFilteredMovies(sortedMovies)
    },
    [movies, filteredMovies]
  );

  const handleSearch = useCallback<FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault()
    const { movieTitle = '', movieRating, movieReleaseDate } = filterValue;

    let titleFilteredMovies = movies
    if (movieTitle)
      titleFilteredMovies = movies.filter(
        ({ title, original_title }) => `${title} ${original_title}`?.toLocaleLowerCase().includes(movieTitle.toLowerCase())
      );
    
    let ratingFilteredMovies = titleFilteredMovies
    if (movieRating)
      ratingFilteredMovies = titleFilteredMovies.filter(
        ({ vote_average }) => {
          if (+movieRating < 0)
            return vote_average! <= Math.abs(+movieRating!)
          return vote_average! >= +movieRating!
        }
      )
    
    let releaseDateFilteredMovies = ratingFilteredMovies
    if (movieReleaseDate)
      releaseDateFilteredMovies = ratingFilteredMovies.filter(
        ({ release_date }) => release_date && new Date(release_date).getTime() >= new Date(movieReleaseDate).getTime()
      )
    console.log({ movies, releaseDateFilteredMovies });

    const sortedMovies = sortMovies(releaseDateFilteredMovies, sortOption)
    setFilteredMovies(sortedMovies)
  }, [movies, filterValue, sortOption]);
  
  const sortMovies = <T extends MovieResult>(_movies: T[], _sortOption: SortOption["value"]) => {
    const [ sortProp, sortOrder="" ] = _sortOption.split(":")
    const comesFirstPerSortOrder = sortOrder !== "desc" ? -1 : 1
    const comesLastPerSortOrder = sortOrder !== "desc" ? 1 : -1
    switch(sortProp) {
      case "release_date": {
        return _movies.sort(
          (movieA, movieB) => new Date(movieA.release_date!) < new Date(movieB.release_date!) ? comesFirstPerSortOrder : comesLastPerSortOrder
        )
      }
      case "title": {
        return _movies.sort(
          (movieA: T, movieB: T) => movieA.title! < movieB.title! ? comesFirstPerSortOrder : comesLastPerSortOrder
        )
      }
      case "vote_average": {
        return _movies.sort(
          (movieA: T, movieB: T) => movieA.vote_average! < movieB.vote_average! ? comesFirstPerSortOrder : comesLastPerSortOrder
        )
      }
      case "popularity": {
        return _movies.sort(
          (movieA: T, movieB: T) => movieA.popularity! < movieB.popularity! ? comesFirstPerSortOrder : comesLastPerSortOrder
        )
      }
      default: {
        return _movies
      }
    }
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
          <form onSubmit={handleSearch} className="contents">
            <SortAccordion
              initialValue={sortOption}
              onChange={handleSortChange}
            />
            <FilterAccordion
              initialValues={filterValue}
              onChange={handleFilterChange}
            />
            <button className={styles.btn_search} type="submit">
              Search
            </button>
          </form>
        </nav>
        <div className="overflow-y-auto h-full">
          <div className={styles.movies__grid} data-end={endReached}>
            {filteredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                name={movie.title!}
                image={`https://image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
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

export const getServerSideProps: GetServerSideProps<{ serverMovies: MovieResult[] }> = async context => {
  const serverMovies: MovieResult[] = await getMovies(1);

  return {
    props: {
      serverMovies,
    },
  };
};
