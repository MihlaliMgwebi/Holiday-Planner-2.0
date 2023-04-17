import { Component } from '@angular/core';
import { TripState } from '../../store/reducers/trip.reducer';
import { Store } from '@ngrx/store';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Trip } from '../../models/trip.model';
import { User } from '../../models/user.model';
import { CurrencyState } from '../../store/reducers/currency.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { createTrip } from '../../store/actions/trip.actions';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css'],
})
export class TripCreateComponent {
  tripForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private currencyStore: Store<CurrencyState>,
    private tripStore: Store<TripState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tripForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      description: ['', [Validators.maxLength(250)]],
      itinerary: this.fb.group({
        title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
        description: ['', [Validators.maxLength(250)]],
      }),
    });
  }
  submitForm(): void {
    const newTrip = this.tripForm.value;
    const loggedInUser: User = JSON.parse(localStorage.getItem('user') || '{}');

    if (loggedInUser) {
      const trip: Trip = {
        _id: null,
        description: newTrip.description,
        title: newTrip.title,
        itinerary: {
          _id: null,
          description: newTrip.itinerary.description,
          title: newTrip.itinerary.title,
        },
        userId: loggedInUser.uid,
      };
      this.tripStore.dispatch(createTrip({ trip }));
      this.router.navigate([`../../`], { relativeTo: this.route });
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.tripForm.reset();
    for (const key in this.tripForm.controls) {
      if (this.tripForm.controls.hasOwnProperty(key)) {
        this.tripForm.controls[key].markAsPristine();
        this.tripForm.controls[key].updateValueAndValidity();
      }
    }
  }
}
