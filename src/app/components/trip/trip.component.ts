import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TripState } from '../../store/reducers/trip.reducer';
import { CorrelatedData } from '../../models/correlatedData.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectedCorrelatedData } from '../../store/selectors/trip.selectors';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripComponent {
  selectedCorrelatedData$: Observable<CorrelatedData | null>;

  constructor(private tripStore: Store<TripState>, private route: ActivatedRoute, private router: Router) {
    this.selectedCorrelatedData$ = tripStore.select(selectedCorrelatedData);
    this.selectedCorrelatedData$.subscribe((correlatedData) =>
      !correlatedData ? this.router.navigate([`../../`], { relativeTo: this.route }) : ''
    );
  }
}
