import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as UserActions from '../actions/user.actions';


@Injectable()
export class UserEffects {

  yUsers$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.yUsers),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => UserActions.yUsersSuccess({ data })),
          catchError(error => of(UserActions.yUsersFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
