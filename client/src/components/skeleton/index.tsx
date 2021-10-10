import { FC } from 'react';
import { Skeleton as MuiSkeleton } from '@mui/material';

const Skeleton: FC = () => {
  return (
    <>
      <MuiSkeleton variant='text' animation='wave' />
      <MuiSkeleton variant='text' animation='wave' />
      <MuiSkeleton variant='rectangular' height={118} animation='wave' />
      <MuiSkeleton variant='text' animation='wave' />
      <MuiSkeleton variant='text' animation='wave' />
      <MuiSkeleton variant='rectangular' height={118} animation='wave' />
      <MuiSkeleton variant='text' animation='wave' />
      <MuiSkeleton variant='text' animation='wave' />
      <MuiSkeleton variant='rectangular' height={118} animation='wave' />
    </>
  );
};

export default Skeleton;
