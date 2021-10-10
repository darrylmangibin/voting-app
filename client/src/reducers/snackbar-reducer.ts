import { Reducer } from 'redux';

import * as ActionTypes from 'action-types';
import { AlertProps } from '@mui/material';
import { SnackbarAction } from 'actions';

interface SnackbarState {
  message?: string;
  open: boolean;
  severity?: AlertProps['severity'];
}

export const snackbarReducer: Reducer<SnackbarState, SnackbarAction> = (
  state = { open: false },
  action
) => {
  switch (action.type) {
    case ActionTypes.SNACKBAR_OPEN:
      return {
        ...state,
        open: true,
        message: action.message,
        severity: action.severity,
      };
    case ActionTypes.SNACKBAR_CLOSE:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};
