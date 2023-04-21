import { createFeature, createReducer, on } from '@ngrx/store';
import * as ItineraryItemActions from './itinerary-item.actions';
import { ItineraryItem } from '../../models/itineraryItem.model';

export const itineraryItemFeatureKey = 'itineraryItem';

export interface ItineraryItemState {
  allItineraryItems: ItineraryItem[];
  itineraryItem: ItineraryItem | null;
  isLoading: boolean;
}

export const initialState: ItineraryItemState = {
  allItineraryItems: [],
  itineraryItem: null,
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  // CREATE
  on(ItineraryItemActions.createItineraryItemComplete, (state, { itineraryItem }) => ({
    ...state,
    allItineraryItems: [...state.allItineraryItems, itineraryItem],
  })),
  // READ
  on(ItineraryItemActions.getAllItineraryItemsComplete, (state, { allItineraryItems }) => ({
    ...state,
    allItineraryItems,
    isLoading: false,
  })),
  on(ItineraryItemActions.setSelectedItineraryItem, (state, { itineraryItem }) => ({
    ...state,
    itineraryItem,
  })),
  //UPSERT
  on(ItineraryItemActions.upsertItineraryItemComplete, (state, { itineraryItem }) => ({
    ...state,
    allItineraryItems: state.allItineraryItems.map((currentItineraryItem) =>
      currentItineraryItem._id === itineraryItem._id ? itineraryItem : currentItineraryItem
    ),
    // selectedProduct: null
  })),
  // DELETE
  on(ItineraryItemActions.deleteItineraryItem, (state, { deletedItineraryItemId }) => ({
    ...state,
    allItineraryItems: state.allItineraryItems.filter(
      (currentItineraryItem) => currentItineraryItem._id !== deletedItineraryItemId
    ),
  }))
);

export const itineraryItemsFeature = createFeature({
  name: itineraryItemFeatureKey,
  reducer,
});
