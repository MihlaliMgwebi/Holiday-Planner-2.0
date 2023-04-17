import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CorrelatedData } from '../../models/correlatedData.model';
import { Store } from '@ngrx/store';
import { ItineraryItemState } from '../../store/reducers/itinerary-item.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteItineraryItem } from '../../store/actions/itinerary-item.actions';
import { ItineraryItem } from '../../models/itineraryItem.model';
import { Trip } from '../../models/trip.model';
import { setSelectedTrip } from '../../store/actions/trip.actions';

@Component({
  selector: 'app-itinerary-item',
  templateUrl: './itinerary-item.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItineraryItemComponent {
  @Input() itineraryItem: ItineraryItem | undefined;

  constructor(
    private itineraryItemStore: Store<ItineraryItemState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // CREATE
  addItineraryItem() {
    this.router.navigate([`../${this.route.snapshot.paramMap.get('tripId')}/itinerary-items/add`], {
      relativeTo: this.route,
    });
  }

  //NAVIGATE TO READ
  viewItineraryItem(itineraryItem: ItineraryItem | undefined) {
    if (!itineraryItem) return;
    this.router.navigate([`../${this.route.snapshot.paramMap.get('tripId')}/itinerary-items/${itineraryItem._id}`], {
      relativeTo: this.route,
    });
  }
  // UPDATE
  editItineraryItem(itineraryItem: ItineraryItem | undefined) {
    if (!itineraryItem) return;
    this.router.navigate(
      [`../${this.route.snapshot.paramMap.get('tripId')}/itinerary-items/${itineraryItem._id}/edit`],
      { relativeTo: this.route }
    );
  }
  // DELETE
  deleteItineraryItem(deletedItineraryItemId: string | null | undefined) {
    if (!deletedItineraryItemId) return;
    if (deletedItineraryItemId) this.itineraryItemStore.dispatch(deleteItineraryItem({ deletedItineraryItemId }));
  }
}
