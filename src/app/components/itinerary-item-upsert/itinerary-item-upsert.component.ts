import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {NgForm} from "@angular/forms";
import {upsertTrip} from "../../store/actions/trip.actions";
import {ItineraryItemState} from "../../store/reducers/itinerary-item.reducer";

@Component({
  selector: 'app-itinerary-item-upsert',
  templateUrl: './itinerary-item-upsert.component.html',
  styleUrls: ['./itinerary-item-upsert.component.css']
})
export class ItineraryItemUpsertComponent {
  // TODO: Rerouting in routing branch
  constructor( private itineraryItemStore: Store<ItineraryItemState>) {}
  onSubmit(upsertTripForm: NgForm) {
    this.itineraryItemStore.dispatch(upsertTrip({ trip: upsertTripForm.value }));
  }
}
