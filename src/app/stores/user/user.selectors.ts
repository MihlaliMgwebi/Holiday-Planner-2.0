import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(fromUser.userFeatureKey);

export const selectLoggedInUser = createSelector(selectUserState, (state) => {
  return state.loggedInUser;
});

export const selectIsLoggedIn = createSelector(
  selectLoggedInUser,
  (loggedInUser) => !!loggedInUser.uid //convert a truthy or falsy value to a boolean.
);
