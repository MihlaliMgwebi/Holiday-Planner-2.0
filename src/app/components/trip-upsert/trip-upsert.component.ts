import { Component } from '@angular/core';
import { TripState } from '../../store/reducers/trip.reducer';
import { Store } from '@ngrx/store';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { upsertTrip } from '../../store/actions/trip.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Trip } from '../../models/trip.model';
import { Observable } from 'rxjs';
import { selectSelectedTrip } from '../../store/selectors/trip.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trip-upsert',
  templateUrl: './trip-upsert.component.html',
  styleUrls: ['./trip-upsert.component.css'],
})
export class TripUpsertComponent {
  selectedTrip$: Observable<Trip | null>;
  tripForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
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

    this.selectedTrip$ = tripStore.select(selectSelectedTrip);
    this.selectedTrip$
      .pipe(
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
    const _id: string = this.route.snapshot.params['tripId'];
    const loggedInUser: User = JSON.parse(localStorage.getItem('user') || '{}');

    if (loggedInUser) {
      const trip: Trip = {
        _id,
        description: newTrip.description,
        title: newTrip.title,
        itinerary: {
          _id,
          description: newTrip.itinerary.description,
          title: newTrip.itinerary.title,
        },
        userId: loggedInUser.uid,
      };
      this.tripStore.dispatch(upsertTrip({ trip }));
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
