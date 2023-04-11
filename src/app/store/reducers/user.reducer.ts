import { createFeature, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import {User} from "../../models/user.model";

export const userFeatureKey = 'user';

export interface UserState {
  email: string,
  password: string,
  loggedInUser: User,
  error: unknown
}

export const initialState: UserState = {
  email: '',
  password: '',
  loggedInUser: {
    displayName: null,
    email: null,
    emailVerified: false,
    photoURL: null,
    uid: null,
  },
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.setSignedUpNewUserComplete,(state) => (state)),
  on(UserActions.setSignedInExistingUserComplete,(state, { email, password}) => ({...state, email, password})),
  on(UserActions.setSignedInComplete, UserActions.setLoggedInUserOnBrowserReload, UserActions.setLoggedInUserOnBrowserReload,(state, {loggedInUser}) => ({...state,loggedInUser, error: null})),
  on(UserActions.setSignedInFailure,(state, {error}) => (
    {...state,
      loggedInUser: {
        displayName: null,
        email: null,
        emailVerified: false,
        photoURL: null,
        uid: null,
      },
      error
    })),
  on(UserActions.setSignedOutComplete,(state) => ({...state, email:'', password: '', loggedInUser: {
      displayName: null,
      email: null,
      emailVerified: false,
      photoURL: null,
      uid: null,
    },
    error: null
  })),
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

