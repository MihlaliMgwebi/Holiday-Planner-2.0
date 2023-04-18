import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTrip from './trip.reducer';
import { CorrelatedData } from '../../models/correlatedData.model';
import { ItineraryItem } from '../../models/itineraryItem.model';
import { selectLoggedInUser } from '../user/user.selectors';
import { selectAllItineraryItems } from '../itinerary-item/itineraryItem.selectors';
export const selectTripState = createFeatureSelector<fromTrip.TripState>(fromTrip.tripFeatureKey);

// Sliced state
export const selectAllTrips = createSelector(selectTripState, (state) => state.allTrips);

export const selectSelectedTrip = createSelector(selectTripState, (state) => state.selectedTrip);
export const selectIsLoadingTrips = createSelector(selectTripState, (state) => state.isLoading);

// Derived State Selectors

export const selectCorrelatedTrips = createSelector(
  selectLoggedInUser,
  selectAllTrips,
  selectAllItineraryItems,
  (loggedInUser, allTrips, allItineraryItems) => {
    const correlatedData: CorrelatedData[] = [];
    // console.log('all Itinerary Items', selectAllItineraryItems);
    for (let trip of allTrips) {
      if (trip.userId === loggedInUser?.uid) {
        const itineraryItemsForTrip: ItineraryItem[] = [];
        for (let itineraryItem of allItineraryItems) {
          if (itineraryItem.itineraryId === trip._id) {
            itineraryItemsForTrip.push(itineraryItem);
          }
        }
        correlatedData.push({
          trip,
          itineraryItems: itineraryItemsForTrip,
          startDate: itineraryItemsForTrip?.[0]?.startDateTimeISOString?.toDate() ?? undefined,
          endDate:
            itineraryItemsForTrip?.[itineraryItemsForTrip.length - 1]?.endDateTimeISOString?.toDate() ?? undefined,
          costEstimate:
            itineraryItemsForTrip.reduce((acc, itineraryItem) => acc + (itineraryItem.costEstimate ?? 0), 0) ?? 0,
        });
      }
    }
    console.log(correlatedData);
    return correlatedData;
  }
);

export const selectSelectedCorrelatedTrip = createSelector(
  selectSelectedTrip,
  selectCorrelatedTrips,
  (trip, correlatedTrips) => correlatedTrips.find((correlatedTrip) => correlatedTrip.trip._id === trip?._id)
);
