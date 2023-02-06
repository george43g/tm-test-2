import React, { FC } from 'react';
import { OverviewProps } from './types';

export const Overview: FC<OverviewProps> = ({ title, content, className }) => {
  return (
    <div className={`${className ? className : ''}`}>
      <h4 className="font-semibold">{title}</h4>
      <p>{content}</p>
    </div>
  );
};
