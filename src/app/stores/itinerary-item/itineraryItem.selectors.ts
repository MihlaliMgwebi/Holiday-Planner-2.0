import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItineraryItem from './itinerary-item.reducer';
export const selectItineraryItemState = createFeatureSelector<fromItineraryItem.ItineraryItemState>(
  fromItineraryItem.itineraryItemFeatureKey
);

// Sliced state
export const selectAllItineraryItems = createSelector(selectItineraryItemState, (state) => state.allItineraryItems);

export const selectItineraryItem = createSelector(selectItineraryItemState, (state) => state.itineraryItem);
export const selectIsLoadingItineraryItems = createSelector(selectItineraryItemState, (state) => state.isLoading);
