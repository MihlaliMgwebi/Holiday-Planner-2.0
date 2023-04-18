import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TripState } from '../../stores/trip/trip.reducer';
import { CorrelatedData } from '../../models/correlatedData.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedCorrelatedTrip } from '../../stores/trip/trip.selectors';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripComponent {
  selectedCorrelatedData$: Observable<CorrelatedData | undefined>;

  constructor(private tripStore: Store<TripState>) {
    this.selectedCorrelatedData$ = tripStore.select(selectSelectedCorrelatedTrip);
  }

  trackById(index: number, correlatedTrip: any): number {
    return correlatedTrip.id;
  }

  addItineraryItem() {}
}
