import React, { FC, PropsWithChildren } from 'react';

export const IconWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <button className="h-10 w-10 bg-blue-600 rounded-full p-2 flex justify-center items-center">{children}</button>
  );
};
