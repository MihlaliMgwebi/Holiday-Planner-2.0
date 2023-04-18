import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as UserActions from './user.actions';
import { AuthService } from '../../services/fire/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class UserEffects {
  // API Calls
  signUpNewUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.SignUpUser),
      switchMap(({ email, password }) =>
        this.authService.signUpNewUser(email, password).pipe(
          map((loggedInUser) => UserActions.setSignedUpNewUserComplete({ loggedInUser })),
          tap(() => this.notification.create('success', 'Successfully Signed Up', '')),
          catchError((error) => {
            this.notification.create('error', 'Sign Up Error', error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  setSignedInExistingUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.SignInUser),
      switchMap(({ email, password }) =>
        this.authService.signInExistingUser(email, password).pipe(
          map((loggedInUser) => UserActions.setSignedInComplete({ loggedInUser })),
          tap(() => this.notification.create('success', 'Successfully Signed In', '')),
          catchError((error) => {
            this.notification.create('error', 'Sign In Error', error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  setSignInExistingUserWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.SignInUserWithGoogle),
      switchMap(() =>
        this.authService.signInExistingUserWithGoogle().pipe(
          map((loggedInUser) => UserActions.setSignedInComplete({ loggedInUser })),
          tap(() => this.notification.create('success', 'Successfully Signed In With Google', '')),
          catchError((error) => {
            this.notification.create('error', 'Sign In With Google Error', error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.SignOutUser),
      switchMap(() =>
        this.authService.signOut().pipe(
          map(() => UserActions.setSignedOutComplete()),
          tap(() => this.notification.create('success', 'Successfully Signed Out', '')),
          catchError((error) => {
            this.notification.create('error', 'Sign Out Error', error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  // Local Storage
  addUserInfoToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.setSignedInComplete),
        tap((user) => localStorage.setItem('user', JSON.stringify(user))),
        tap((user) => this.router.navigate([`../users/${user.loggedInUser.uid}/trips`], { relativeTo: this.route }))
      ),
    { dispatch: false }
  );

  removeUserFromLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.setSignedOutComplete),
        tap(() => localStorage.removeItem('user')),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NzNotificationService
  ) {}
}
