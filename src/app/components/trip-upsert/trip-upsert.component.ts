import { Component } from '@angular/core';
import { TripState } from '../../stores/trip/trip.reducer';
import { Store } from '@ngrx/store';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { upsertTrip } from '../../stores/trip/trip.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Trip } from '../../models/trip.model';
import { Observable } from 'rxjs';
import { selectSelectedTrip } from '../../stores/trip/trip.selectors';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-trip-upsert',
  templateUrl: './trip-upsert.component.html',
  styleUrls: ['./trip-upsert.component.css'],
})
export class TripUpsertComponent {
  selectedTrip$: Observable<Trip | null>;
  tripForm: UntypedFormGroup;
  id: string | null;
  constructor(private fb: UntypedFormBuilder, private tripStore: Store<TripState>) {
    this.tripForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      description: ['', [Validators.maxLength(250)]],
    });

    this.id = null;
    this.selectedTrip$ = tripStore.select(selectSelectedTrip);
    this.selectedTrip$
      .pipe(
        tap((trip) => {
          this.id = trip?._id ?? null;
        }),
        map((trip) => {
          this.tripForm.patchValue({
            title: trip?.title ?? 'No title',
            description: trip?.description ?? 'No description',
            itinerary: trip?.itinerary,
          });
        })
      )
      .subscribe();
  }
  submitForm(): void {
    const newTrip = this.tripForm.value;
    const loggedInUser: User = JSON.parse(localStorage.getItem('user') || '{}');

    if (loggedInUser) {
      const trip: Trip = {
        _id: this.id,
        description: newTrip.description,
        title: newTrip.title,
        itinerary: {
          _id: this.id,
          description: newTrip.description,
          title: newTrip.title,
        },
        userId: loggedInUser.uid,
      };
      this.tripStore.dispatch(upsertTrip({ trip }));
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
