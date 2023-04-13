import { createFeature, createReducer, on } from '@ngrx/store';
import * as ItineraryItemActions from '../actions/itinerary-item.actions';
import {ItineraryItem} from "../../models/itineraryItem.model";

export const itineraryItemFeatureKey = 'itineraryItem';

export interface ItineraryItemState {
  allItineraryItems: ItineraryItem[]
}

export const initialState: ItineraryItemState = {
  allItineraryItems: []
};

export const reducer = createReducer(
  initialState,
  // CREATE
  on(ItineraryItemActions.createItineraryItemComplete,
    (state, {itineraryItem}) =>  ({ ...state, allItineraryItems: [...state.allItineraryItems, itineraryItem] }),
  ),
  // READ
  on(ItineraryItemActions.getAllItineraryItemsComplete,
    (state, {allItineraryItems}) => ({...state, allItineraryItems})
  ),
  //UPSERT
  on(ItineraryItemActions.upsertItineraryItemComplete,
    (state, {upsertedItineraryItem}) =>  ({
      ...state,
      allItineraryItems: state.allItineraryItems.map(currentItineraryItem=> currentItineraryItem._id === upsertedItineraryItem._id ? upsertedItineraryItem : currentItineraryItem),
      // selectedProduct: null
    }),
  ),
  // DELETE
  on(ItineraryItemActions.deleteItineraryItem,
    (state, {deletedItineraryItemId}) =>  ({ ...state, allItineraryItems: state.allItineraryItems.filter(currentItineraryItem => currentItineraryItem._id !== deletedItineraryItemId)})
  ),
  // FAILURES
  on(
    ItineraryItemActions.createItineraryItemFailure,
    ItineraryItemActions.getAllItineraryItemsFailure,
    ItineraryItemActions.upsertItineraryItemFailure,
    ItineraryItemActions.deleteItineraryItemFailure,
    (state, {error}) =>  ({...state, error})
  ),
);

export const itineraryItemsFeature = createFeature({
  name: itineraryItemFeatureKey,
  reducer,
});
