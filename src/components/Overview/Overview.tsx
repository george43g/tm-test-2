import React, { FC } from 'react';
import { OverviewProps } from './types';

export const Overview: FC<OverviewProps> = ({ title, content, className }) => {
  return (
    <div className={`${className ? className : ''}`}>
      <span className="font-semibold">{title}</span>
      <br />
      {/* Canont use p or h elements as this causes a console error */}
      <span>{content}</span>
    </div>
  );
};
