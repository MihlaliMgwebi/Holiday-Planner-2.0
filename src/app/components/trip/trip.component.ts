import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TripState } from '../../store/reducers/trip.reducer';
import { CorrelatedData } from '../../models/correlatedData.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedCorrelatedTrip } from '../../store/selectors/trip.selectors';

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
}
