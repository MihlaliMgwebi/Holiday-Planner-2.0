import { createAction, props } from '@ngrx/store';
import {ItineraryItem} from "../../models/itineraryItem.model";

// API CRUD ACTIONS

// CREATE
export const createItineraryItem = createAction(
  '[Itinerary Item Create Component] Add Itinerary Item',
  props<{ itineraryItem: ItineraryItem }>()
);
export const createItineraryItemComplete = createAction(
  '[Itinerary Item Create Component] Add Itinerary Item Complete',
  props<{ itineraryItem: ItineraryItem }>()
);
export const createItineraryItemFailure = createAction(
  '[Itinerary Item Create Component] Add Itinerary Item Failure',
  props<{ error: unknown }>()
);

// READ
export const getAllItineraryItems = createAction(
  '[Trip Component] Get All Itinerary Items',
);
export const getAllItineraryItemsComplete = createAction(
  '[Itinerary Item Effect] Get All Itinerary Items Complete',
  props<{ allItineraryItems: ItineraryItem[] }>() // with pagination deets etc
);
export const getAllItineraryItemsFailure = createAction(
  '[Itinerary Item Effect] Get All Itinerary Items Failure',
  props<{ error: unknown }>()
);

// UPSERT: If already exists update record, else create new record
export const upsertItineraryItem = createAction(
  '[Itinerary Item Upsert Component] Upsert Itinerary Item',
  props<{ upsertedItineraryItem: ItineraryItem }>()
);
export const upsertItineraryItemComplete = createAction(
  '[Itinerary Item Effect] Upsert Itinerary Item Complete',
  props<{ upsertedItineraryItem: ItineraryItem }>()
);

export const upsertItineraryItemFailure = createAction(
  '[Itinerary Item Effect] Upsert Itinerary Item Failure',
  props<{ error: unknown }>()
);

// DELETE
export const deleteItineraryItem = createAction(
  '[Trip Component] Delete ItineraryItem',
  props<{ deletedItineraryItemId: string }>()
);

export const deleteItineraryItemComplete = createAction(
  '[Itinerary Item Effect] Delete Itinerary Item Complete',
);

export const deleteItineraryItemFailure = createAction(
  '[Itinerary Item Effect] Delete Itinerary Item Failure',
  props<{ error: unknown }>()
);
export const clearItineraryItems = createAction(
  '[ItineraryItem/API] Clear ItineraryItems'
);
