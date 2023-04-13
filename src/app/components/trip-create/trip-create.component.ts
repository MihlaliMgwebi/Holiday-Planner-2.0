import { Component } from '@angular/core';
import {TripState} from "../../store/reducers/trip.reducer";
import {Store} from "@ngrx/store";
import { FormControl, FormGroup,} from "@angular/forms";
import {createTrip} from "../../store/actions/trip.actions";
import {Trip} from "../../models/trip.model";
import {Observable} from "rxjs";
import {UserState} from "../../store/reducers/user.reducer";
import {User} from "../../models/user.model";
import {selectLoggedInUser} from "../../store/selectors/user.selectors";

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css']
})
export class TripCreateComponent {
  loggedInUser$: Observable<User>
  tripForm = new FormGroup({
    userId: new FormControl(null, ),
    title: new FormControl(null, ),
    description: new FormControl(null,),
    itinerary: new FormGroup({
      title: new FormControl(null,),
      description: new FormControl(null, )
    })
  });

  constructor(
    private tripStore: Store<TripState>,
    private userStore: Store<UserState>
  ) {
    this.loggedInUser$ = userStore.select(selectLoggedInUser)
  }


  onSubmit() {
    const formValue = this.tripForm.value;
    const trip: Trip = {
      _id: 'T3', // gets generated by DB
      userId: formValue.userId || '',
      title: formValue.title || '',
      description: formValue.description || '',
      itinerary: {
        _id: null,
        title: formValue.itinerary?.title || '',
        description: formValue.itinerary?.description || ''
      }
    };
    this.tripStore.dispatch(createTrip({ trip }));
  }
}