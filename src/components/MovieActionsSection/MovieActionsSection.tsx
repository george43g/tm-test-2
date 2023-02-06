import {
  ListBulletIcon,
  HeartFilledIcon,
  BookmarkFilledIcon,
  StarFilledIcon,
  TriangleRightIcon,
} from '@radix-ui/react-icons';
import React from 'react';
import IconWrapper from '../IconWrapper';

export const MovieActionsSection = () => {
  return (
    <>
      <IconWrapper>
        <ListBulletIcon />
      </IconWrapper>
      <IconWrapper>
        <HeartFilledIcon />
      </IconWrapper>
      <IconWrapper>
        <BookmarkFilledIcon />
      </IconWrapper>
      <IconWrapper>
        <StarFilledIcon />
      </IconWrapper>
      <div className="flex">
        <TriangleRightIcon className="h-6 w-6" /> Play Trailer
      </div>
    </>
  );
};
