import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTrip from '../reducers/trip.reducer';
import {CorrelatedData} from "../../models/correlatedData.model";
import {ItineraryItem} from "../../models/itineraryItem.model";
import {selectLoggedInUser} from "./user.selectors";
import {selectAllItineraryItems} from "./itineraryItem.selectors";
export const selectTripState = createFeatureSelector<fromTrip.TripState>(
  fromTrip.tripFeatureKey
);

// Sliced state
export const selectAllTrips = createSelector(
  selectTripState,
  (state) => state.allTrips
);

export const selectSelectedTrip = createSelector(
  selectTripState,
  (state) => state.selectedTrip
);

// Derived State Selectors

export const selectCorrelatedTrips = createSelector(
  selectLoggedInUser,
  selectAllTrips,
  selectAllItineraryItems,
  (loggedInUser, allTrips, allItineraryItems) => {
    const correlatedData: CorrelatedData[] = [];

    for (let trip of allTrips) {
      if (trip.userId === loggedInUser?.uid){
        const itineraryItemsForTrip: ItineraryItem[] = [];
        for (let itineraryItem of allItineraryItems) {
          if (itineraryItem.itineraryId === trip.itinerary?._id) {
            itineraryItemsForTrip.push(itineraryItem);
          }
        }
        correlatedData.push({ trip, itineraryItems: itineraryItemsForTrip });
      }
    }
    return correlatedData;
  }
);

export const selectSelectedCorrelatedTrip = createSelector(
  selectSelectedTrip,
  selectCorrelatedTrips,
  (trip, correlatedTrips) =>
    correlatedTrips.find(correlatedTrip => correlatedTrip.trip._id   === trip?._id)
);
