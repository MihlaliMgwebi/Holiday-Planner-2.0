import {Component, OnInit} from '@angular/core';
import {TripState} from "../../store/reducers/trip.reducer";
import {Store} from "@ngrx/store";
import {NgForm} from "@angular/forms";
import {upsertTrip} from "../../store/actions/trip.actions";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-trip-upsert',
  templateUrl: './trip-upsert.component.html',
  styleUrls: ['./trip-upsert.component.css']
})
export class TripUpsertComponent implements OnInit{
  tripId: string = ''
  constructor( private tripStore: Store<TripState>,  private route: ActivatedRoute, private router:Router) {}
  onSubmit(upsertTripForm: NgForm) {
    this.tripStore.dispatch(upsertTrip({ trip: upsertTripForm.value }));
  }
  goToTrips() {
    this.router.navigate(['../../trips'], { relativeTo: this.route });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tripId = params['id'];
    });
    // console.log('tripId', this.tripId)
  }
}
