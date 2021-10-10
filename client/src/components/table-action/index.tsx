import { Button } from '@mui/material';
import { FC } from 'react';

import StyledPaper from './styled-components/StyledPaper';

interface TableActionProps {
  onClick: () => void;
}

const TableAction: FC<TableActionProps> = ({ onClick }) => {
  return (
    <StyledPaper elevation={3}>
      <Button variant='contained' onClick={onClick}>
        Create
      </Button>
    </StyledPaper>
  );
};

export default TableAction;
