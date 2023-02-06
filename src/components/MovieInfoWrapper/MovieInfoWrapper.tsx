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
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieInfo(id);
  }, [id]);

  const fetchMovieInfo = (movieId: number) => {
    // setLoading(true);
    fetch(`./api/movie-info?id=${movieId}`)
      .then(response => response.json())
      .then(json => setMovie(json))
      .catch(err => {
        // setLoading(false);
        console.error(err);
      });
  };
  // TODO: Popup dialouge is not mobile responsive
  // TODO: Need loading state/spinner for radix popup

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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
