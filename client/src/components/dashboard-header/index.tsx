import { Button, PaperProps } from '@mui/material';
import { FC } from 'react';

import StyledPaper from './styled-components/styled-paper';

interface DashboardHeaderProps extends PaperProps {
  onClick?: () => void;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({ onClick, children, ...props }) => {
  return (
    <StyledPaper elevation={3} {...props}>
      {children}
      {onClick && (
        <Button variant='contained' onClick={onClick}>
          Create
        </Button>
      )}
    </StyledPaper>
  );
};

export default DashboardHeader;
