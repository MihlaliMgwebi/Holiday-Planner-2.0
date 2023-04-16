import { Component, Input } from '@angular/core';
import { CorrelatedData } from '../../models/correlatedData.model';
import { Store } from '@ngrx/store';
import { ItineraryItemState } from '../../store/reducers/itinerary-item.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteItineraryItem } from '../../store/actions/itinerary-item.actions';
import { ItineraryItem } from '../../models/itineraryItem.model';

@Component({
  selector: 'app-itinerary-item',
  templateUrl: './itinerary-item.component.html',
  styleUrls: ['./itinerary-item.component.css'],
})
export class ItineraryItemComponent {
  @Input() selectedCorrelatedTrip: CorrelatedData | undefined;

  constructor(
    private itineraryItemStore: Store<ItineraryItemState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // CREATE
  addItineraryItem() {
    this.router.navigate([`../trips/${this.selectedCorrelatedTrip?.trip._id}/itinerary-items/add`], {
      relativeTo: this.route,
    });
  }

  // UPDATE
  editItineraryItem(itineraryItem: ItineraryItem) {
    this.router.navigate(
      [`../trips/${this.selectedCorrelatedTrip?.trip._id}/itinerary-items/${itineraryItem._id}/edit`],
      { relativeTo: this.route }
    );
  }
  // DELETE
  deleteItineraryItem(deletedItineraryItemId: string | null) {
    if (deletedItineraryItemId) this.itineraryItemStore.dispatch(deleteItineraryItem({ deletedItineraryItemId }));
  }
}
