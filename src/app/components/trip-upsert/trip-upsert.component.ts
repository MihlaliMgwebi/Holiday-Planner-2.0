import {Component, OnInit} from '@angular/core';
import {TripState} from "../../store/reducers/trip.reducer";
import {Store} from "@ngrx/store";
import {NgForm} from "@angular/forms";
import {upsertTrip} from "../../store/actions/trip.actions";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-trip-upsert',
  templateUrl: './trip-upsert.component.html',
  styleUrls: ['./trip-upsert.component.css']
})
export class TripUpsertComponent implements OnInit{
  tripId: string = ''
  constructor( private tripStore: Store<TripState>,  private route: ActivatedRoute,) {}
  onSubmit(upsertTripForm: NgForm) {
    this.tripStore.dispatch(upsertTrip({ trip: upsertTripForm.value }));
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tripId = params['id'];
    });
    console.log('tripId', this.tripId)
  }
}
