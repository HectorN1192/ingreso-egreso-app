import { ActionReducerMap } from '@ngrx/store';
import * as auth from './auth/auth.reducers';
import * as ui from './shared/ui.reducers';

export interface AppState {
  ui: ui.State;
  user: auth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducerReducer,
  user: auth.authReducer,
};
