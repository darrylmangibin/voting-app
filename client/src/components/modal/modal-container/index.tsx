import { FC } from 'react';
import { Modal, Typography } from '@mui/material';

import StyledPaper from '../styled-components/styled-paper';

interface ModalContainerProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

const ModalContainer: FC<ModalContainerProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <StyledPaper>
        <Typography variant='h6' component='h2'>
          {title}
        </Typography>
        {children}
      </StyledPaper>
    </Modal>
  );
};

export default ModalContainer;
