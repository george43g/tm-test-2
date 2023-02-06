import { FC } from 'react';
import MovieInfoWrapper from '../MovieInfoWrapper';
import RatingBadge from '../RatingBadge';
import styles from './MovieCard.module.css';
import { MovieCardProps } from './types';

export const MovieCard: FC<MovieCardProps> = ({ id, name, image, date, rating }) => {
  return (
    <MovieInfoWrapper id={id}>
      <div className={styles.container}>
        <img src={image} alt={`${name}-cover`} className="object-cover h-72 relative" />
        <div className="p-3">
          <RatingBadge rating={Number(rating)} className="bg-black absolute -mt-7" />
          <h4 className="font-bold mt-5">{name}</h4>
          <p className="font-light text-gray-500 text-sm">{date}</p>
        </div>
      </div>
    </MovieInfoWrapper>
  );
};
