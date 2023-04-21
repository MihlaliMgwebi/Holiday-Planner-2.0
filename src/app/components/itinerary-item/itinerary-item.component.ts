import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ItineraryItemState } from '../../stores/itinerary-item/itinerary-item.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteItineraryItem, setSelectedItineraryItem } from '../../stores/itinerary-item/itinerary-item.actions';
import { ItineraryItem } from '../../models/itineraryItem.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ItineraryItemUpsertComponent } from '../itinerary-item-upsert/itinerary-item-upsert.component';
import { Observable } from 'rxjs';
import { selectItineraryItem } from '../../stores/itinerary-item/itineraryItem.selectors';

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
      nzTitle: 'Modal Title',
      nzContent: ItineraryItemUpsertComponent,
      nzClosable: false,
      nzOnOk: () => new Promise((resolve) => setTimeout(resolve, 1000)),
    });
  }
  // DELETE
  deleteItineraryItem(deletedItineraryItemId: string | null | undefined) {
    if (!deletedItineraryItemId) return;
    if (deletedItineraryItemId) this.itineraryItemStore.dispatch(deleteItineraryItem({ deletedItineraryItemId }));
  }
}
