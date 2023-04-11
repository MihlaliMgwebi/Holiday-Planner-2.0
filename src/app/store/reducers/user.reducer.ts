import { createFeature, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(UserActions.yUsers, state => state),
  on(UserActions.yUsersSuccess, (state, action) => state),
  on(UserActions.yUsersFailure, (state, action) => state),
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

