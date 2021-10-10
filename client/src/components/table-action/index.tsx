import { Button, PaperProps } from '@mui/material';
import { FC } from 'react';

import StyledPaper from './styled-components/styled-paper';

interface TableActionProps extends PaperProps {
  onClick?: () => void;
}

const TableAction: FC<TableActionProps> = ({ onClick, children, ...props }) => {
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

export default TableAction;
