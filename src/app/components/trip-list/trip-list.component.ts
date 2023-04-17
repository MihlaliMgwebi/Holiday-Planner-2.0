import { Component, OnInit } from '@angular/core';
import { TripState } from '../../store/reducers/trip.reducer';
import { CorrelatedData } from '../../models/correlatedData.model';
import { Store } from '@ngrx/store';
import { selectCorrelatedTrips, selectSelectedCorrelatedTrip } from '../../store/selectors/trip.selectors';
import { Observable } from 'rxjs';
import { ItineraryItemState } from '../../store/reducers/itinerary-item.reducer';
import { getAllItineraryItems } from '../../store/actions/itinerary-item.actions';
import { deleteTrip, getAllTrips, setSelectedTrip } from '../../store/actions/trip.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['trip-list.component.css'],
})
export class TripListComponent implements OnInit {
  correlatedTrips$: Observable<CorrelatedData[]>;
  selectedCorrelatedTrip$: Observable<CorrelatedData | undefined>;

  constructor(
    private tripStore: Store<TripState>,
    private itineraryItemStore: Store<ItineraryItemState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.correlatedTrips$ = tripStore.select(selectCorrelatedTrips);
    this.selectedCorrelatedTrip$ = tripStore.select(selectSelectedCorrelatedTrip);
  }

  ngOnInit(): void {
    // Need to get all trips AND items to correlate
    this.tripStore.dispatch(getAllTrips());
    this.itineraryItemStore.dispatch(getAllItineraryItems());
  }
  // CREATE
  addTrip() {
    this.router.navigate([`../trips/add`], { relativeTo: this.route });
  }
  //READ
  selectTrip(selectedTrip: Trip) {
    this.tripStore.dispatch(setSelectedTrip({ selectedTrip }));
  }
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
    this.router.navigate([`../trips/${selectedCorrelatedData.trip._id}/itinerary-items`], { relativeTo: this.route });
  }
}
