import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {ItineraryItemState} from "../../store/reducers/itinerary-item.reducer";
import {createItineraryItem} from "../../store/actions/itinerary-item.actions";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-itinerary-item-create',
  templateUrl: './itinerary-item-create.component.html',
  styleUrls: ['./itinerary-item-create.component.css']
})
export class ItineraryItemCreateComponent {
  constructor(private itineraryItemStore: Store<ItineraryItemState>) {}

  onSubmit(createItineraryItemForm: NgForm) {
    this.itineraryItemStore.dispatch(createItineraryItem({ itineraryItem: createItineraryItemForm.value }));
  }
}
