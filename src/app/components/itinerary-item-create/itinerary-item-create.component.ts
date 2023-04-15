import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ItineraryItemState } from '../../store/reducers/itinerary-item.reducer';
import { createItineraryItem } from '../../store/actions/itinerary-item.actions';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-itinerary-item-create',
  templateUrl: './itinerary-item-create.component.html',
  styleUrls: ['./itinerary-item-create.component.css'],
})
export class ItineraryItemCreateComponent {
  itineraryItemForm: UntypedFormGroup;
  demoValue = 100;
  submitForm(): void {
    console.log('submit', this.itineraryItemForm.value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.itineraryItemForm.reset();
    for (const key in this.itineraryItemForm.controls) {
      if (this.itineraryItemForm.controls.hasOwnProperty(key)) {
        this.itineraryItemForm.controls[key].markAsPristine();
        this.itineraryItemForm.controls[key].updateValueAndValidity();
      }
    }
  }

  constructor(private fb: UntypedFormBuilder) {
    this.itineraryItemForm = this.fb.group({
      title: ['', [Validators.required]],
      startDateTimeISOString: ['', [Validators.required]],
      endDateTimeISOString: ['', [Validators.required]],
      tag: [''],
      currency: ['', [Validators.required]],
      costEstimate: [''],
      description: [''],
      notes: [''],
    });
  }

  onCurrencySelected(selectedCurrency: string): void {
    this.itineraryItemForm.get('currency')?.setValue(selectedCurrency);
  }
}
