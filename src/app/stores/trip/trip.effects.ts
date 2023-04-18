import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as TripActions from './trip.actions';
import { FireStoreService } from '../../services/fire/store/fire-store.service';

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
          catchError((error) => {
            this.notification.create('error', 'Delete Trip Error', error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  // Navigation, Routing

  constructor(
    private actions$: Actions,
    private fireStoreService: FireStoreService,
    private notification: NzNotificationService
  ) {}
}
