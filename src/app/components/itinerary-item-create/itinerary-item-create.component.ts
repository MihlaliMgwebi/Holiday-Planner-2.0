import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CurrencyState } from '../../stores/currency/currency.reducer';
import {
  getAllCurrencies,
  setSelectedCurrencyCode,
  setSelectedCurrencyValue,
} from '../../stores/currency/currency.actions';
import { Currency } from '../../models/currency.model';
import {
  selectAllCurrencies,
  selectConvertedValue,
  selectSelectBaseValue,
  selectSelectedBaseCurrency,
  selectSelectedCurrencyCode,
} from '../../stores/currency/currency.selectors';
import { ItineraryItem } from '../../models/itineraryItem.model';
import { ActivatedRoute } from '@angular/router';
import { createItineraryItem } from '../../stores/itinerary-item/itinerary-item.actions';
import { ItineraryItemState } from '../../stores/itinerary-item/itinerary-item.reducer';

@Component({
  selector: 'app-itinerary-item-create',
  templateUrl: './itinerary-item-create.component.html',
  styleUrls: ['./itinerary-item-create.component.css'],
})
export class ItineraryItemCreateComponent implements OnInit {
  allCurrencies$: Observable<Currency[]>;
  selectedCurrencyCode$: Observable<string>;
  selectedBaseValue$: Observable<number>;
  selectedBaseCurrency$: Observable<Currency | undefined>;
  selectConvertedValue$: Observable<number>;
  itineraryItemForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private currencyStore: Store<CurrencyState>,
    private itineraryItemStore: Store<ItineraryItemState>,
    private route: ActivatedRoute
  ) {
    this.allCurrencies$ = currencyStore.select(selectAllCurrencies);
    this.selectedCurrencyCode$ = currencyStore.select(selectSelectedCurrencyCode);
    this.selectedBaseValue$ = currencyStore.select(selectSelectBaseValue);
    this.selectedBaseCurrency$ = currencyStore.select(selectSelectedBaseCurrency);
    this.selectConvertedValue$ = currencyStore.select(selectConvertedValue);

    this.itineraryItemForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
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
  setSelectedCurrencyCode(selectedCurrencyCode: string) {
    this.itineraryItemStore.dispatch(setSelectedCurrencyCode({ selectedCurrencyCode }));
  }
  setSelectedCurrencyValue(selectedCurrencyValue: number) {
    console.log(selectedCurrencyValue);
    this.itineraryItemStore.dispatch(setSelectedCurrencyValue({ selectedCurrencyValue }));
  }

  submitForm(): void {
    const item = this.itineraryItemForm.value;
    const newItineraryItem: ItineraryItem = {
      _id: null,
      costEstimate: parseFloat((item.costEstimate * item.currency).toFixed(2)),
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
