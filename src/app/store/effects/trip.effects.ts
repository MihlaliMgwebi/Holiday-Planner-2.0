import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, combineLatestWith, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import { of } from 'rxjs';
import * as TripActions from "../actions/trip.actions";
import {FireStoreService} from "../../services/fire/store/fire-store.service";
import * as UserActions from "../actions/user.actions";
import {setSelectedTrip} from "../actions/trip.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {selectLoggedInUser} from "../selectors/user.selectors";
import {Store} from "@ngrx/store";
import {UserState} from "../reducers/user.reducer";
@Injectable()
export class TripEffects {
  // Trips and ItineraryItems are root collections in DB

  //CREATE
  createTrip$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(TripActions.createTrip),
      switchMap(({trip}) =>
        this.fireStoreService.createTrip(trip)
          .pipe(
            map(res => TripActions.createTripComplete({trip: res})),
            catchError(error => of(TripActions.createTripFailure({error})))
          )
      )
    )
  });

  // READ
  getAllTrips$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(TripActions.getAllTrips),
      switchMap(() =>
        this.fireStoreService.getTrips()
          .pipe(
            map(res => TripActions.getAllTripsComplete({allTrips: res})),
            catchError(error => of(TripActions.getAllTripsFailure({error})))
          )
      )
    )
  });

  // UPSERT
  upsertTrip$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(TripActions.upsertTrip),
      switchMap(({trip}) =>
        this.fireStoreService.createTrip(trip)
          .pipe(
            map(res => TripActions.upsertTripComplete({upsertedTrip: res})),
            catchError(error => of(TripActions.upsertTripFailure({error})))
          )
      )
    )
  });

  // DELETE
  deleteTrip$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(TripActions.deleteTrip),
      switchMap(({deletedTripId}) =>
        this.fireStoreService.deleteTrip(deletedTripId)
          .pipe(
            map(_ => TripActions.deleteTripComplete()),
            catchError(error => of(TripActions.deleteTripFailure({error})))
          )
      )
    )
  });

  constructor(
    private actions$: Actions,
    private fireStoreService: FireStoreService,
  ) {}
}
