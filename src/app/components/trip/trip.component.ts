import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TripState } from '../../stores/trip/trip.reducer';
import { CorrelatedData } from '../../models/correlatedData.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedCorrelatedTrip } from '../../stores/trip/trip.selectors';
import { ActivatedRoute, Router } from '@angular/router';

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

  trackById(index: number, correlatedTrip: any): number {
    return correlatedTrip.id;
  }

  // CREATE
  addItineraryItem() {
    this.router.navigate([`../itinerary-items/add`], {
      relativeTo: this.route,
    });
  }

  back(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
