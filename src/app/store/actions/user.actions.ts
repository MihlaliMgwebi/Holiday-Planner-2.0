import { createAction, props } from '@ngrx/store';
import {User} from "../../models/user.model";

// API Action triggered by UI Action
// [ From where action is dispatched ] What event triggered it

// SIGN UP
export const SignUpUser = createAction(
  '[User Component] Sign Up User When Sign Up Button Clicked',
  props<{ email: string, password: string }>()
)
export const setSignedUpNewUserComplete = createAction(
  '[User Effect] Set Signed Up New User Complete',
  props<{ loggedInUser: User }>()
);

export const setSignedUpNewUserFailure = createAction(
  '[User Effect] Set Signed Up New User Failure',
  props<{ error: unknown }>()
);

// SIGN IN
export const SignInUser = createAction(
  '[User Component] Sign In User When Sign In Button Clicked',
  props<{ email: string, password: string }>()
)

export const SignInUserWithGoogle = createAction(
  '[User Component] Sign In User When Sign In With Google Button Clicked',
)

export const setSignedInExistingUserComplete = createAction(
  '[User] Set Signed In Existing User Complete',
  props<{ email: string, password: string }>()
);

export const setSignedInComplete = createAction(
  '[User Effect] Set Signed In Existing User Complete',
  props<{ loggedInUser: User }>()
);

export const setSignedInFailure = createAction(
  '[User Effect] Set Signed In Existing User Failure',
  props<{ error: unknown }>()
);

// SIGN OUT
export const SignOutUser = createAction(
  '[User Component] Sign Out User When Sign Out Button Clicked',
)

export const setSignedOutComplete = createAction(
  '[User Effect] Set Signed Out Complete',
);

export const setSignedOutFailure = createAction(
  '[User Effect] Set Signed Out Existing User Failure',
  props<{ error: unknown }>()
);

export const setLoggedInUserOnBrowserReload = createAction(
  '[App Component] Set Logged In User When Browser Reloads',
  props<{ loggedInUser: User }>()
);

