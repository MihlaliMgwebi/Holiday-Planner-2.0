import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { FireStoreService } from '../../services/fire/store/fire-store.service';
import * as TripActions from './trip.actions';

@Injectable()
export class TripEffects {
  // Trips and ItineraryItems are root collections in DB

  //CREATE
  createTrip$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.createTrip),
      switchMap(({ trip }) =>
        this.fireStoreService.createTrip(trip).pipe(
          map((res) => TripActions.createTripComplete({ trip: res })),
          tap(() => this.notification.create('success', 'Successfully Created Trip', '')),
          catchError((error) => {
            this.notification.create('error', 'Create Trip Error', error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  // READ
  getAllTrips$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.getAllTrips),
      switchMap(() =>
        this.fireStoreService.getTrips().pipe(
          map((res) => TripActions.getAllTripsComplete({ allTrips: res })),
          catchError((error) => {
            this.notification.create('error', 'Get All Trips Error', error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  // UPSERT
  upsertTrip$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.upsertTrip),
      switchMap(({ trip }) =>
        this.fireStoreService.createTrip(trip).pipe(
          map((res) => TripActions.upsertTripComplete({ upsertedTrip: res })),
          tap(() => this.notification.create('success', 'Successfully Edited', '')),
          catchError((error) => {
            this.notification.create('error', 'Edit Trip Error', error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  // DELETE
  deleteTrip$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripActions.deleteTrip),
      switchMap(({ deletedTripId }) =>
        this.fireStoreService.deleteTrip(deletedTripId).pipe(
          map((_) => TripActions.deleteTripComplete()),
          tap(() => this.notification.create('success', 'Successfully Deleted Tripe', '')),
          catchError((error) => {
            this.notification.create('error', 'Delete Trip Error', error.error.message);
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
