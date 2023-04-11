import { createAction, props } from '@ngrx/store';
import {Trip} from "../../models/trip.model";

// API CRUD ACTIONS

// CREATE
export const createTrip = createAction(
  '[Trip Create Component] Create Trip',
  props<{ trip: Trip }>()
);
export const createTripComplete = createAction(
  '[Trip Effect] Create Trip Complete',
  props<{ trip: Trip }>()
);
export const createTripFailure = createAction(
  '[Trip Effect] Create Trip Failure',
  props<{ error: unknown }>()
);
// READ
export const getAllTrips = createAction(
  '[Trip Component] Get All Trips',
);

export const getAllTripsComplete = createAction(
  '[Trip Component] Get All Trips Complete',
  props<{ allTrips: Trip[] }>()
);
export const getAllTripsFailure = createAction(
  '[Trip Component] Get All Failure',
  props<{ error: unknown }>()
);

// UPSERT
export const upsertTrip = createAction(
  '[Trip Upsert Component] Upsert Trip',
  props<{ trip: Trip }>()
);
export const upsertTripComplete = createAction(
  '[Trip Effect] Upsert Trip Complete',
  props<{ upsertedTrip: Trip }>()
);

export const upsertTripFailure = createAction(
  '[Trip Effect] Upsert Trip Failure',
  props<{ error: unknown }>()
);

// DELETE
export const deleteTrip = createAction(
  '[Trip Component] Delete Trip',
  props<{ deletedTripId: string }>()
);

export const deleteTripComplete = createAction(
  '[Trip Effect] Delete Trip Complete',
);

export const deleteTripFailure = createAction(
  '[Trip Effect] Delete Trip Failure',
  props<{ error: unknown }>()
);

// UI ACTION
export const setSelectedTrip = createAction(
  '[Trip Component] Set Selected Trip',
  props<{ selectedTrip: Trip}>()
)





