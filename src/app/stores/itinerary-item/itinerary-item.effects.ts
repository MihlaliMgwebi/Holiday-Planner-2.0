import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { FireStoreService } from '../../services/fire/store/fire-store.service';
import * as ItineraryItemActions from './itinerary-item.actions';

@Injectable()
export class ItineraryItemEffects {
  // CREATE
  createItineraryItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItineraryItemActions.createItineraryItem),
      switchMap(({ itineraryItem }) =>
        this.fireStoreService.createItineraryItem(itineraryItem).pipe(
          map(() => {
            this.notification.create('success', 'Successfully Created Itinerary Item', '');
            return ItineraryItemActions.getAllItineraryItems();
          }),
          catchError((error) => {
            this.notification.create('error', 'Create Itinerary Item Error', error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  // READ
  getAllItineraryItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItineraryItemActions.getAllItineraryItems),
      switchMap(() => {
        return this.fireStoreService.getAllItineraryItems().pipe(
          map((res) => ItineraryItemActions.getAllItineraryItemsComplete({ allItineraryItems: res })),
          catchError((error) => {
            this.notification.create('error', 'Get All Itinerary Items Error', error.error.message);
            return EMPTY;
          })
        );
      })
    );
  });

  // UPDATE
  upsertItineraryItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItineraryItemActions.upsertItineraryItem),
      switchMap(({ itineraryItem }) =>
        this.fireStoreService.upsertItineraryItem(itineraryItem).pipe(
          map((res) => ItineraryItemActions.upsertItineraryItemComplete({ itineraryItem: res })),
          tap(() => this.notification.create('success', 'Successfully Edited Itinerary Item', '')),
          catchError((error) => {
            this.notification.create('error', 'Edit Itinerary Item Error', error.error.message);
            return EMPTY;
          })
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
          tap(() => this.notification.create('success', 'Successfully Deleted Itinerary Item', '')),
          catchError((error) => {
            this.notification.create('error', 'Delete Itinerary Item Error', error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private fireStoreService: FireStoreService,
    private notification: NzNotificationService
  ) {}
}
