import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {NgForm} from "@angular/forms";
import {upsertTrip} from "../../store/actions/trip.actions";
import {ItineraryItemState} from "../../store/reducers/itinerary-item.reducer";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-itinerary-item-upsert',
  templateUrl: './itinerary-item-upsert.component.html',
  styleUrls: ['./itinerary-item-upsert.component.css']
})
export class ItineraryItemUpsertComponent {
  // TODO: Rerouting in routing branch
  constructor( private itineraryItemStore: Store<ItineraryItemState>, private route: ActivatedRoute, private router: Router) {}
  onSubmit(upsertTripForm: NgForm) {
    this.itineraryItemStore.dispatch(upsertTrip({ trip: upsertTripForm.value }));
  }

  goToItineraryItems() {
    this.router.navigate(['../../itinerary-items'], { relativeTo: this.route });
  }
}
