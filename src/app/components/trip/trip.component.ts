import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip.model';
import { TripState } from '../../store/reducers/trip.reducer';
import { CorrelatedData } from '../../models/correlatedData.model';
import { Store } from '@ngrx/store';
import { deleteTrip, getAllTrips, setSelectedTrip } from '../../store/actions/trip.actions';
import { getAllItineraryItems } from '../../store/actions/itinerary-item.actions';
import { Observable } from 'rxjs';
import {
  selectCorrelatedTrips,
  selectedCorrelatedData,
  selectSelectedCorrelatedTrip,
} from '../../store/selectors/trip.selectors';
import { ItineraryItemState } from '../../store/reducers/itinerary-item.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: [],
})
export class TripComponent {
  selectedCorrelatedData$: Observable<CorrelatedData | null>;

  constructor(private tripStore: Store<TripState>) {
    this.selectedCorrelatedData$ = tripStore.select(selectedCorrelatedData);
  }
}
