import { Component, OnInit } from '@angular/core';
import { TripState } from '../../stores/trip/trip.reducer';
import { CorrelatedData } from '../../models/correlatedData.model';
import { Store } from '@ngrx/store';
import {
  selectCorrelatedTrips,
  selectIsLoadingTrips,
  selectSelectedCorrelatedTrip,
} from '../../stores/trip/trip.selectors';
import { Observable } from 'rxjs';
import { ItineraryItemState } from '../../stores/itinerary-item/itinerary-item.reducer';
import { getAllItineraryItems } from '../../stores/itinerary-item/itinerary-item.actions';
import { deleteTrip, getAllTrips, setSelectedTrip } from '../../stores/trip/trip.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../models/trip.model';
import { selectIsLoadingItineraryItems } from '../../stores/itinerary-item/itineraryItem.selectors';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['trip-list.component.css'],
})
export class TripListComponent implements OnInit {
  correlatedTrips$: Observable<CorrelatedData[]>;
  selectedCorrelatedTrip$: Observable<CorrelatedData | undefined>;
  selectIsLoadingTrips$: Observable<boolean>;
  selectIsLoadingItineraryItems$: Observable<boolean>;
  constructor(
    private tripStore: Store<TripState>,
    private itineraryItemStore: Store<ItineraryItemState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.correlatedTrips$ = tripStore.select(selectCorrelatedTrips);
    this.selectedCorrelatedTrip$ = tripStore.select(selectSelectedCorrelatedTrip);
    this.selectIsLoadingTrips$ = this.tripStore.select(selectIsLoadingTrips);
    this.selectIsLoadingItineraryItems$ = this.itineraryItemStore.select(selectIsLoadingItineraryItems);
  }

  ngOnInit(): void {
    // Need to get all trips AND items to correlate
    this.tripStore.dispatch(getAllTrips());
    this.itineraryItemStore.dispatch(getAllItineraryItems());
  }
  trackById(index: number, correlatedTrip: any): number {
    return correlatedTrip.id;
  }
  // CREATE
  addTrip() {
    this.router.navigate([`../trips/add`], { relativeTo: this.route });
  }
  //READ
  selectTrip(selectedTrip: Trip) {}
  // UPDATE
  editTrip(trip: Trip) {
    this.router.navigate([`../trips/${trip._id}/edit`], { relativeTo: this.route });
  }
  // DELETE
  deleteTrip(deletedTripId: string | null) {
    if (deletedTripId) this.tripStore.dispatch(deleteTrip({ deletedTripId }));
  }

  //NAVIGATE
  viewItinerary(selectedCorrelatedData: CorrelatedData) {
    this.tripStore.dispatch(setSelectedTrip({ selectedTrip: selectedCorrelatedData.trip }));
    this.router.navigate([`../trips/${selectedCorrelatedData.trip._id}/itinerary-items`], { relativeTo: this.route });
  }
}
