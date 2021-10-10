import { Action } from 'redux';

import * as ActionTypes from 'action-types';
import { AlertProps } from '@mui/material';

export interface SnackBarActionOpen
  extends Action<typeof ActionTypes.SNACKBAR_OPEN> {
  message: string;
  severity: AlertProps['severity'];
}

export interface SnackbarActionClose
  extends Action<typeof ActionTypes.SNACKBAR_CLOSE> {}

export type SnackbarAction = SnackBarActionOpen | SnackbarActionClose;
