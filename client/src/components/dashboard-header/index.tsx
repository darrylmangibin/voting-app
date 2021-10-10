import { Button, PaperProps } from '@mui/material';
import { FC } from 'react';

import StyledPaper from './styled-components/styled-paper';

import { typedUseSelector } from 'hooks/redux-hooks';
import { userAuthSelector } from 'selectors';

interface DashboardHeaderProps extends PaperProps {
  onClick?: () => void;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({
  onClick,
  children,
  ...props
}) => {
  const { user } = typedUseSelector(userAuthSelector);

  return (
    <StyledPaper elevation={3} {...props}>
      {children}
      {onClick && user?.role === 'admin' && (
        <Button variant='contained' onClick={onClick}>
          Create
        </Button>
      )}
    </StyledPaper>
  );
};

export default DashboardHeader;
