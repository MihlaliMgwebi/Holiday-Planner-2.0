import { createFeature, createReducer, on } from '@ngrx/store';
import * as TripActions from './trip.actions';
import { Trip } from '../../models/trip.model';

export const tripFeatureKey = 'trip';

export interface TripState {
  allTrips: Trip[];
  selectedTrip: Trip | null;
  isLoading: boolean;
}

export const initialState: TripState = {
  allTrips: [],
  selectedTrip: null,
  isLoading: false,
};
export const reducer = createReducer(
  initialState,
  // CREATE
  on(TripActions.createTripComplete, (state, { trip }) => ({ ...state, allTrips: [...state.allTrips, trip] })),
  // READ
  on(TripActions.getAllTrips, (state) => ({ ...state, isLoading: true })),
  on(TripActions.getAllTripsComplete, (state, { allTrips }) => ({ ...state, allTrips, isLoading: false })),
  // UPSERT
  on(TripActions.upsertTripComplete, (state, { upsertedTrip }) => ({
    ...state,
    allTrips: state.allTrips.map((currentTrip) => (currentTrip._id === upsertedTrip._id ? upsertedTrip : currentTrip)),
    // selectedProduct: null
  })),
  //DELETE
  on(TripActions.deleteTrip, (state, { deletedTripId }) => ({
    ...state,
    allTrips: state.allTrips.filter((currentTrip) => currentTrip._id !== deletedTripId),
  })),

  // UI
  on(TripActions.setSelectedTrip, (state, { selectedTrip }) => ({ ...state, selectedTrip }))
);

export const tripFeature = createFeature({
  name: tripFeatureKey,
  reducer,
});
