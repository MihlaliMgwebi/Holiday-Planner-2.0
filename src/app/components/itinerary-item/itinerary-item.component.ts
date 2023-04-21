import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ItineraryItemState } from '../../stores/itinerary-item/itinerary-item.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteItineraryItem } from '../../stores/itinerary-item/itinerary-item.actions';
import { ItineraryItem } from '../../models/itineraryItem.model';

@Component({
  selector: 'app-itinerary-item',
  templateUrl: './itinerary-item.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItineraryItemComponent {
  @Input() itineraryItem: ItineraryItem | undefined;
  isItineraryItemDetailsVisible: boolean;
  constructor(private itineraryItemStore: Store<ItineraryItemState>) {
    this.isItineraryItemDetailsVisible = false;
  }

  // READ
  viewItineraryItem() {
    this.isItineraryItemDetailsVisible = !this.isItineraryItemDetailsVisible;
  }

  // DELETE
  deleteItineraryItem(deletedItineraryItemId: string | null | undefined) {
    if (!deletedItineraryItemId) return;
    if (deletedItineraryItemId) this.itineraryItemStore.dispatch(deleteItineraryItem({ deletedItineraryItemId }));
  }
}
