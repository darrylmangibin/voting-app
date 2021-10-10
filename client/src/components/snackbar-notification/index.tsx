import { Alert, AlertProps, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { FC } from 'react';

import { closeSnackbar } from 'action-creators';

interface SnackbarNotificationProps {
  open: boolean;
  message: string;
  severity: AlertProps['severity'];
}

const SnackbarNotification: FC<SnackbarNotificationProps> = ({
  open,
  message,
  severity,
}) => {
  const dispatch = useDispatch();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatch(closeSnackbar())}
    >
      <Alert
        severity={severity}
        sx={{ width: '100%' }}
        onClose={() => dispatch(closeSnackbar())}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
