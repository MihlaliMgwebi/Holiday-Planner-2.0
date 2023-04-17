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
  styleUrls: [],
})
export class TripComponent implements OnInit {
  correlatedTrips$: Observable<CorrelatedData[]>;
  selectedCorrelatedTrip$: Observable<CorrelatedData | undefined>;

  constructor(private tripStore: Store<TripState>, private itineraryItemStore: Store<ItineraryItemState>) {
    this.correlatedTrips$ = tripStore.select(selectCorrelatedTrips);
    this.selectedCorrelatedTrip$ = tripStore.select(selectSelectedCorrelatedTrip);
  }

  ngOnInit(): void {
    // Need to get all trips AND items to correlate
    this.tripStore.dispatch(getAllTrips());
    this.itineraryItemStore.dispatch(getAllItineraryItems());
  }
}
