import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItineraryItem } from '../../models/itineraryItem.model';
import { getItineraryItem, upsertItineraryItem } from '../../stores/itinerary-item/itinerary-item.actions';
import { selectItineraryItem } from '../../stores/itinerary-item/itineraryItem.selectors';
import { Currency } from '../../models/currency.model';
import { CurrencyState } from '../../stores/currency/currency.reducer';
import { selectAllCurrencies } from '../../stores/currency/currency.selectors';
import { getAllCurrencies } from '../../stores/currency/currency.actions';
import { map } from 'rxjs/operators';
import { ItineraryItemState } from '../../stores/itinerary-item/itinerary-item.reducer';

@Component({
  selector: 'app-itinerary-item-upsert',
  templateUrl: './itinerary-item-upsert.component.html',
  styleUrls: [],
})
export class ItineraryItemUpsertComponent implements OnInit {
  selectedItineraryItem$: Observable<ItineraryItem | null>;
  allCurrencies$: Observable<Currency[]>;
  itineraryItemForm: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private itineraryItemStore: Store<ItineraryItemState>,
    private currencyStore: Store<CurrencyState>,
    private route: ActivatedRoute
  ) {
    this.itineraryItemForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      dateRange: ['', [Validators.required]],
      tag: ['', [Validators.required, Validators.minLength(1)]],
      currency: ['', [Validators.required, Validators.minLength(3)]],
      costEstimate: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.maxLength(250)]],
      notes: ['', [Validators.maxLength(250)]],
    });

    this.allCurrencies$ = currencyStore.select(selectAllCurrencies);
    this.selectedItineraryItem$ = itineraryItemStore.select(selectItineraryItem);

    this.selectedItineraryItem$
      .pipe(
        map((itineraryItem) => {
          this.itineraryItemForm.patchValue({
            title: itineraryItem?.title ?? 'No tile',
            dateRange: [
              itineraryItem?.startDateTimeISOString ? itineraryItem.startDateTimeISOString.toDate() : null,
              itineraryItem?.endDateTimeISOString ? itineraryItem.endDateTimeISOString.toDate() : null,
            ],
            tag: itineraryItem?.tag ?? '',
            currency: itineraryItem?.currency ?? 'ZAR',
            costEstimate: itineraryItem?.costEstimate ?? '0',
            description: itineraryItem?.description ?? 'No description',
            notes: itineraryItem?.notes ?? 'No notes',
          });
        })
      )
      .subscribe();
  }
  ngOnInit(): void {
    this.currencyStore.dispatch(getAllCurrencies());
    const itineraryItemId: string = this.route.snapshot.params['itineraryItemId'];
    this.itineraryItemStore.dispatch(getItineraryItem({ itineraryItemId }));
  }

  submitForm(): void {
    const item = this.itineraryItemForm.value;
    const _id: string = this.route.snapshot.params['itineraryItemId'];
    const newItineraryItem: ItineraryItem = {
      _id,
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
    this.itineraryItemStore.dispatch(upsertItineraryItem({ upsertedItineraryItem: newItineraryItem }));
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
