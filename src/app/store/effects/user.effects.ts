import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as UserActions from '../actions/user.actions';


@Injectable()
export class UserEffects {
  constructor(private actions$: Actions) {}
}
