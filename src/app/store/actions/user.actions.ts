import { createAction, props } from '@ngrx/store';

export const yUsers = createAction(
  '[User] Y Users'
);

export const yUsersSuccess = createAction(
  '[User] Y Users Success',
  props<{ data: any }>()
);

export const yUsersFailure = createAction(
  '[User] Y Users Failure',
  props<{ error: any }>()
);
