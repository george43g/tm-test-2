import React, { FC } from 'react';
import { RatingBadgeProps } from './types';

export const RatingBadge: FC<RatingBadgeProps> = ({ className, rating }) => {
  return (
    <div className={`text-white rounded-full h-10 w-10 flex justify-center items-center ${className ? className : ''}`}>
      <span className="font-bold text-sm">{rating}</span>
      <span className="text-xs -mt-2 text-[5px]">%</span>
    </div>
  );
};
