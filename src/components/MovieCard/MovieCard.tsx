import React, { FC } from 'react';
import { MovieCardProps } from './types';
import styles from "./MovieCard.module.css"

export const MovieCard: FC<MovieCardProps> = ({ name, image, date, rating }) => {
  return (
    <div className={styles.container}>
      <img src={image} alt={`${name}-cover`} className="object-cover h-72 relative" />
      <div className="p-3">
        <div className="bg-black text-white rounded-full h-10 w-10 flex justify-center items-center absolute -mt-7">
          <span className="font-bold text-sm">{rating}</span>
          <span className="text-xs -mt-2 text-[5px]">%</span>
        </div>
        <h4 className="font-bold mt-5">{name}</h4>
        <p className="font-light text-gray-500 text-sm">{date}</p>
      </div>
    </div>
  );
};
