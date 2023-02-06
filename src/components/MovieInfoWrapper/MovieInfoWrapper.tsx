import { getFormattedRuntime } from '@/utils/getFormattedRuntime';
import { getGenres } from '@/utils/getGenres';
import { reverseDate } from '@/utils/reverseDate';
import * as Dialog from '@radix-ui/react-dialog';
import { FC, useEffect, useState } from 'react';
import MovieActionsSection from '../MovieActionsSection';
import MoviePoster from '../MoviePoster';
import NetflixWatchNowBtn from '../NetflixWatchNowBtn';
import Overview from '../Overview';
import RatingBadge from '../RatingBadge';
import { MovieInfoWrapperProps } from './types';
import type { MovieResponse } from 'moviedb-promise';

export const MovieInfoWrapper: FC<MovieInfoWrapperProps> = ({ children, id }) => {
  const [movie, setMovie] = useState<MovieResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieInfo(id);
  }, [id]);

  const fetchMovieInfo = (movieId: number) => {
    setLoading(true);
    fetch(`./api/movie-info?id=${movieId}`)
      .then(response => response.json())
      .then(json => setMovie(json))
      .then(() => setLoading(false))
      .catch(err => {
        setLoading(false);
        console.error(err);
      });
  };
  // TODO: Popup dialouge is not mobile responsive
  // TODO: Need loading state/spinner for radix popup

  const loadingSpinner = (
    <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
      <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  const _dialogContent = (
    <div className="backdrop-blur-md backdrop-hue-rotate-180 flex flex-col md:flex-row items-center p-4 w-full px-10 gap-5 overflow-auto">
      <div className="flex flex-col rounded-md overflow-hidden">
        <MoviePoster
          src={`https://image.tmdb.org/t/p/w440_and_h660_face/${movie?.poster_path}`}
          alt={`${movie?.title}-cover`}
        />
        <NetflixWatchNowBtn />
      </div>
      <div className="flex flex-col p-4 text-white">
        <Dialog.Title>
          <div className="text-2xl font-bold">
            <span>{movie?.title}</span> <span className="font-light">({movie?.release_date?.split('-')[0]})</span>
          </div>
          <div className="flex flex-col md:flex-row gap-1">
            {movie?.release_date && <span>{reverseDate(movie?.release_date)}</span>}•
            {movie?.genres && <span>{getGenres(movie?.genres)}</span>}•
            {movie?.runtime && <span>{getFormattedRuntime(movie?.runtime)}</span>}
          </div>
        </Dialog.Title>
        <Dialog.Description>
          <div className="flex gap-4 items-center my-6">
            <RatingBadge rating={78} className="h-12 w-12 border-4 border-green-500" />
            <MovieActionsSection />
          </div>
          <div className="italic text-gray-300 mb-4">{movie?.tagline}</div>
          {movie?.overview && <Overview title="Overview" content={movie?.overview} className="mb-4" />}
          {movie?.production_companies && movie?.production_companies?.length && (
            <Overview title={movie?.production_companies[0].name || ''} content="Production company" />
          )}
        </Dialog.Description>
      </div>
    </div>
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <Dialog.Content
          className="bg-white flex rounded-lg shadow-2xl fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 md:w-3/4 w-10/12 bg-cover h-3/4 md:h-auto overflow-hidden"
          style={{
            background: `url(https://image.tmdb.org/t/p/w440_and_h660_face/${movie?.backdrop_path})`,
          }}
        >
          {loading ? loadingSpinner : _dialogContent}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
