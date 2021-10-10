import { SnackbarActionClose, SnackBarActionOpen } from 'actions';

import * as ActionTypes from 'action-types';

export const openSnackbar = (
  options: Omit<SnackBarActionOpen, 'type'>
): SnackBarActionOpen => ({
  type: ActionTypes.SNACKBAR_OPEN,
  message: options.message,
  severity: options.severity,
});

export const closeSnackbar = (): SnackbarActionClose => ({
  type: ActionTypes.SNACKBAR_CLOSE,
});
