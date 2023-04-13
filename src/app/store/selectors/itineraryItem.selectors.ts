import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromItineraryItem from '../reducers/itinerary-item.reducer';
export const selectItineraryItemState = createFeatureSelector<fromItineraryItem.ItineraryItemState>(
  fromItineraryItem.itineraryItemFeatureKey
);

// Sliced state
export const selectAllItineraryItems = createSelector(
  selectItineraryItemState,
  (state) => state.allItineraryItems
);

