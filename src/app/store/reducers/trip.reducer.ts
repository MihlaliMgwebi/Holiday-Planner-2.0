import { createFeature, createReducer, on } from '@ngrx/store';
import * as TripActions from '../actions/trip.actions';
import {Trip} from "../../models/trips.model";

export const tripFeatureKey = 'trip';

export interface TripState {
  allTrips: Trip[];
  selectedTrip: Trip | null;
}

export const initialState: TripState = {
  allTrips: [],
  selectedTrip: null,

};
export const reducer = createReducer(
  initialState,
  // CREATE
  on(TripActions.createTripComplete,
    (state, {trip}) =>  ({ ...state, allTrips: [...state.allTrips, trip] }),
  ),
  // READ
  on(TripActions.getAllTripsComplete,
    (state, {allTrips}) => ({...state, allTrips})
  ),
  // UPSERT
  on(TripActions.upsertTripComplete,
    (state, {upsertedTrip}) =>  ({
      ...state,
      allTrips: state.allTrips.map(currentTrip=> currentTrip._id === upsertedTrip._id ? upsertedTrip : currentTrip),
      // selectedProduct: null
    }),
  ),
  //DELETE
  on(TripActions.deleteTrip,
    (state, {deletedTripId}) =>  ({ ...state, allTrips: state.allTrips.filter(currentTrip => currentTrip._id !== deletedTripId)})
  ),

  // FAILURES
  on(
    TripActions.createTripFailure,
    TripActions.getAllTripsFailure,
    TripActions.upsertTripFailure,
    TripActions.deleteTripFailure,
    (state, {error}) =>  ({...state, error})
  ),

  // UI
  on(TripActions.setSelectedTrip, (state, {selectedTrip}) => ({...state, selectedTrip})),
);

export const tripFeature = createFeature({
  name: tripFeatureKey,
  reducer,
});
