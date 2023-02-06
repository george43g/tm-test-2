import React from 'react';

export const NetflixWatchNowBtn = () => {
  return (
    <button className="flex flex-1 bg-blue-700 justify-center items-center gap-2">
      <div className="flex h-8 w-8">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg" alt="netflix logo" />
      </div>
      <div className="flex flex-col p-2 items-start">
        <span className="text-xs font-light text-gray-300">Now Streaming</span>
        <span className="text-sm font-medium text-white">Watch Now</span>
      </div>
    </button>
  );
};
