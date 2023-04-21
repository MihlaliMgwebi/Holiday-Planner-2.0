import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CorrelatedData } from '../../models/correlatedData.model';
import { TripState } from '../../stores/trip/trip.reducer';
import { selectSelectedCorrelatedTrip } from '../../stores/trip/trip.selectors';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripComponent {
  selectedCorrelatedData$: Observable<CorrelatedData | undefined>;

  constructor(private tripStore: Store<TripState>, private route: ActivatedRoute, private router: Router) {
    this.selectedCorrelatedData$ = tripStore.select(selectSelectedCorrelatedTrip);
  }

  // CREATE
  addItineraryItem() {
    this.router.navigate(['../itinerary-items/add'], {
      relativeTo: this.route,
    });
  }
}
