import { FC } from 'react';

import { Typography, TypographyProps } from '@mui/material';

interface CopyrightProps extends TypographyProps {}

const Copyright: FC<CopyrightProps> = (props) => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © Voting App '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
