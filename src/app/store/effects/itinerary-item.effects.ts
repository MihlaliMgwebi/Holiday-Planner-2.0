import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ItineraryItemActions from '../actions/itinerary-item.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FireStoreService } from '../../services/fire/store/store.service';

@Injectable()
export class ItineraryItemEffects {
  // CREATE
  createItineraryItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItineraryItemActions.createItineraryItem),
      switchMap(({ itineraryItem }) =>
        this.fireStoreService.createItineraryItem(itineraryItem).pipe(
          map((res) =>
            ItineraryItemActions.createItineraryItemComplete({
              itineraryItem: res,
            })
          ),
          catchError((error) =>
            of(ItineraryItemActions.createItineraryItemFailure({ error }))
          )
        )
      )
    );
  });

  // READ
  getAllItineraryItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItineraryItemActions.getAllItineraryItems),
      switchMap(() => {
        console.log('Tim ');
        return this.fireStoreService.getAllItineraryItems().pipe(
          map((res) =>
            ItineraryItemActions.getAllItineraryItemsComplete({
              allItineraryItems: res,
            })
          ),
          catchError((error) =>
            of(ItineraryItemActions.getAllItineraryItemsFailure({ error }))
          )
        );
      })
    );
  });

  // UPDATE
  upsertItineraryItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItineraryItemActions.upsertItineraryItem),
      switchMap(({ upsertedItineraryItem }) =>
        this.fireStoreService.upsertItineraryItem(upsertedItineraryItem).pipe(
          map((res) =>
            ItineraryItemActions.upsertItineraryItemComplete({
              upsertedItineraryItem: res,
            })
          ),
          catchError((error) =>
            of(ItineraryItemActions.upsertItineraryItemFailure({ error }))
          )
        )
      )
    );
  });

  // DELETE
  deleteItineraryItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItineraryItemActions.deleteItineraryItem),
      switchMap(({ deletedItineraryItemId }) =>
        this.fireStoreService.deleteItineraryItem(deletedItineraryItemId).pipe(
          map((_) => ItineraryItemActions.deleteItineraryItemComplete()),
          catchError((error) =>
            of(ItineraryItemActions.deleteItineraryItemFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private fireStoreService: FireStoreService
  ) {}
}
