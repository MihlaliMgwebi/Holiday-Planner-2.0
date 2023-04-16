import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip.model';
import { TripState } from '../../store/reducers/trip.reducer';
import { CorrelatedData } from '../../models/correlatedData.model';
import { Store } from '@ngrx/store';
import { deleteTrip, getAllTrips, setSelectedTrip } from '../../store/actions/trip.actions';
import { getAllItineraryItems } from '../../store/actions/itinerary-item.actions';
import { Observable } from 'rxjs';
import { selectCorrelatedTrips, selectSelectedCorrelatedTrip } from '../../store/selectors/trip.selectors';
import { ItineraryItemState } from '../../store/reducers/itinerary-item.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent implements OnInit {
  correlatedTrips$: Observable<CorrelatedData[]>;
  selectedCorrelatedTrip$: Observable<CorrelatedData | undefined>;

  constructor(
    private tripStore: Store<TripState>,
    private itineraryItemStore: Store<ItineraryItemState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.correlatedTrips$ = tripStore.select(selectCorrelatedTrips);
    this.selectedCorrelatedTrip$ = tripStore.select(selectSelectedCorrelatedTrip).pipe(tap((c) => console.log(c)));
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

  ngOnInit(): void {
    // Need to get all trips AND items to correlate
    this.tripStore.dispatch(getAllTrips());
    this.itineraryItemStore.dispatch(getAllItineraryItems());
  }
}
