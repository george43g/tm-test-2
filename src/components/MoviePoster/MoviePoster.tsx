import React, { FC } from 'react';
import { MoviePosterProps } from './types';

export const MoviePoster: FC<MoviePosterProps> = ({ src, alt }) => {
  return (
    <div>
      <img src={src} className="object-cover h-full relative" alt={alt} />
    </div>
  );
};
