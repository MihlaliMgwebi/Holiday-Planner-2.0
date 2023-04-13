import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CorrelatedData} from "../../models/correlatedData.model";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {TripState} from "../../store/reducers/trip.reducer";
import {ItineraryItemState} from "../../store/reducers/itinerary-item.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import {selectCorrelatedTrips, selectSelectedCorrelatedTrip} from "../../store/selectors/trip.selectors";
import {Trip} from "../../models/trip.model";
import {setSelectedTrip} from "../../store/actions/trip.actions";
import {deleteItineraryItem} from "../../store/actions/itinerary-item.actions";
import {ItineraryItem} from "../../models/itineraryItem.model";

@Component({
  selector: 'app-itinerary-item',
  templateUrl: './itinerary-item.component.html',
  styleUrls: ['./itinerary-item.component.css'],

})
export class ItineraryItemComponent {
  selectedCorrelatedTrip$: Observable<CorrelatedData | undefined>;

  constructor(
    private tripStore: Store<TripState>,
    private itineraryItemStore: Store<ItineraryItemState>,
    private route: ActivatedRoute,
    private router:Router,
  ) {
    this.selectedCorrelatedTrip$ = tripStore.select(selectSelectedCorrelatedTrip);
  }

  // CREATE
  addItineraryItem(){
    this.router.navigate(['../itinerary-items/add'], { relativeTo: this.route })
  }

  // UPDATE
  editItineraryItem(itineraryItem: ItineraryItem){
    this.router.navigate([`../itinerary-items/${itineraryItem._id}/edit`], { relativeTo: this.route })
  }
  // DELETE
  deleteItineraryItem(deletedItineraryItemId: string | null){
    if (deletedItineraryItemId) this.itineraryItemStore.dispatch(deleteItineraryItem({deletedItineraryItemId}))
  }

}
