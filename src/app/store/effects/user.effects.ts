import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import {  of } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { AuthService } from "../../services/fire/auth/auth.service";

@Injectable()
export class UserEffects {

  // API Calls
  signUpNewUser$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(UserActions.SignUpUser),
      switchMap(({email, password}) =>
        this.authService.signUpNewUser(email, password)
          .pipe(
            map(loggedInUser => UserActions.setSignedUpNewUserComplete({loggedInUser})),
            catchError(error => of(UserActions.setSignedUpNewUserFailure({error})))
          )
      )
    )
  });
  setSignedInExistingUser$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(UserActions.SignInUser),
      switchMap(({email, password}) =>
        this.authService.signInExistingUser(email, password)
          .pipe(
            map(loggedInUser => UserActions.setSignedInComplete({loggedInUser})),
            catchError(error => of(UserActions.setSignedInFailure({error})))
          )
      )
    )
  });

  setSignInExistingUserWithGoogle$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(UserActions.SignInUserWithGoogle),
      switchMap(() =>
        this.authService.signInExistingUserWithGoogle()
          .pipe(
            map(loggedInUser => UserActions.setSignedInComplete({loggedInUser})),
            catchError(error => of(UserActions.setSignedInFailure({error})))
          )
      )
    )
  });

  signOut$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(UserActions.SignOutUser),
      switchMap(() =>
        this.authService.signOut()
          .pipe(
            map(() => UserActions.setSignedOutComplete()),
            catchError(error => of(UserActions.setSignedOutFailure({error})))
          ))
    )
  });

  // Local Storage
  addUserInfoToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType( UserActions.setSignedInComplete,),
        tap((user)=> localStorage.setItem('user', JSON.stringify((user)))),
      ),
    { dispatch: false }
  );

  removeUserFromLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType( UserActions.setSignedOutComplete,),
        tap(()=> localStorage.removeItem('user')),
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
