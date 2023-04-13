import { Component } from '@angular/core';
import {TripState} from "../../store/reducers/trip.reducer";
import {Store} from "@ngrx/store";
import {NgForm} from "@angular/forms";
import {upsertTrip} from "../../store/actions/trip.actions";

@Component({
  selector: 'app-trip-upsert',
  templateUrl: './trip-upsert.component.html',
  styleUrls: ['./trip-upsert.component.css']
})
export class TripUpsertComponent {
  // TODO: Rerouting in routing branch
  constructor( private tripStore: Store<TripState>) {}
  onSubmit(upsertTripForm: NgForm) {
    this.tripStore.dispatch(upsertTrip({ trip: upsertTripForm.value }));
  }
}
