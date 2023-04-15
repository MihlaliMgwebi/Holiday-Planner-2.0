import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getISOWeek } from 'date-fns';

import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { first, Observable, Observer } from 'rxjs';
import { CurrencyState } from '../../store/reducers/currency.reducer';
import { getAllCurrencies } from '../../store/actions/currency.actions';
import { Currency } from '../../models/currency.model';
import { selectAllCurrencies } from '../../store/selectors/currency.selectors';
import { map, tap } from 'rxjs/operators';
import { ItineraryItem } from '../../models/itineraryItem.model';
import { ActivatedRoute, Router } from '@angular/router';
import { createItineraryItem } from '../../store/actions/itinerary-item.actions';
import { ItineraryItemState } from '../../store/reducers/itinerary-item.reducer';

@Component({
  selector: 'app-itinerary-item-create',
  templateUrl: './itinerary-item-create.component.html',
  styleUrls: ['./itinerary-item-create.component.css'],
})
export class ItineraryItemCreateComponent implements OnInit {
  allCurrencies$: Observable<Currency[]>;
  itineraryItemForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private currencyStore: Store<CurrencyState>,
    private itineraryItemStore: Store<ItineraryItemState>,
    private route: ActivatedRoute
  ) {
    this.allCurrencies$ = currencyStore.select(selectAllCurrencies);
    this.itineraryItemForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      dateRange: ['', [Validators.required]],
      tag: ['', [Validators.required, Validators.minLength(1)]],
      currency: ['ZAR', [Validators.required, Validators.minLength(3)]],
      costEstimate: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.maxLength(250)]],
      notes: ['', [Validators.maxLength(250)]],
    });
  }
  ngOnInit(): void {
    this.currencyStore.dispatch(getAllCurrencies());
  }
  submitForm(): void {
    const item = this.itineraryItemForm.value;
    const newItineraryItem: ItineraryItem = {
      _id: null,
      costEstimate: item.costEstimate,
      currency: item.currency,
      description: item.description,
      endDateTimeISOString: item.dateRange[1],
      itineraryId: this.route.snapshot.paramMap.get('tripId'),
      notes: item.notes,
      startDateTimeISOString: item.dateRange[0],
      tag: item.tag,
      title: item.title,
    };
    this.itineraryItemStore.dispatch(createItineraryItem({ itineraryItem: newItineraryItem }));
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
}
