import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { ItineraryItem } from '../../models/itineraryItem.model';
import { deleteItineraryItem, setSelectedItineraryItem } from '../../stores/itinerary-item/itinerary-item.actions';
import { ItineraryItemState } from '../../stores/itinerary-item/itinerary-item.reducer';
import { selectItineraryItem } from '../../stores/itinerary-item/itineraryItem.selectors';
import { ItineraryItemUpsertComponent } from '../itinerary-item-upsert/itinerary-item-upsert.component';

@Component({
  selector: 'app-itinerary-item',
  templateUrl: './itinerary-item.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItineraryItemComponent {
  @Input() itineraryItem: ItineraryItem | undefined;
  isItineraryItemDetailsVisible: boolean;
  selectedItineraryItem: Observable<ItineraryItem | null>;
  constructor(private itineraryItemStore: Store<ItineraryItemState>, private modalService: NzModalService) {
    this.isItineraryItemDetailsVisible = false;
    this.selectedItineraryItem = this.itineraryItemStore.select(selectItineraryItem);
  }

  // READ
  viewItineraryItem(itineraryItem: ItineraryItem) {
    this.isItineraryItemDetailsVisible = !this.isItineraryItemDetailsVisible;
    this.itineraryItemStore.dispatch(setSelectedItineraryItem({ itineraryItem }));
  }
  editItineraryItem(itineraryItem: ItineraryItem) {
    this.modalService.create({
      nzTitle: `Edit ${itineraryItem.title}`,
      nzContent: ItineraryItemUpsertComponent,
      nzClosable: true,
      nzData: itineraryItem._id,
    });
  }
  // DELETE
  deleteItineraryItem(deletedItineraryItemId: string | null | undefined) {
    if (!deletedItineraryItemId) return;
    if (deletedItineraryItemId) this.itineraryItemStore.dispatch(deleteItineraryItem({ deletedItineraryItemId }));
  }
}
