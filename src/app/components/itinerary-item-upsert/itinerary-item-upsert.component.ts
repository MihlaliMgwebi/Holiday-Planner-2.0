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
import { map, tap } from 'rxjs/operators';
import { ItineraryItemState } from '../../stores/itinerary-item/itinerary-item.reducer';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-itinerary-item-upsert',
  templateUrl: './itinerary-item-upsert.component.html',
  styleUrls: [],
})
export class ItineraryItemUpsertComponent implements OnInit {
  selectedItineraryItem$: Observable<ItineraryItem | null>;
  allCurrencies$: Observable<Currency[]>;
  itineraryItemForm: UntypedFormGroup;
  itineraryId: string | null;
  itineraryItemId: string | null;
  constructor(
    private fb: UntypedFormBuilder,
    private itineraryItemStore: Store<ItineraryItemState>,
    private currencyStore: Store<CurrencyState>,
    private route: ActivatedRoute
  ) {
    this.itineraryItemForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      dateStart: ['', [Validators.required]],
      dateEnd: ['', [Validators.required]],
      tag: ['', [Validators.required, Validators.minLength(1)]],
      currency: ['', [Validators.required, Validators.minLength(3)]],
      costEstimate: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.maxLength(250)]],
      notes: ['', [Validators.maxLength(250)]],
    });

    this.allCurrencies$ = currencyStore.select(selectAllCurrencies);
    this.selectedItineraryItem$ = itineraryItemStore.select(selectItineraryItem);
    this.itineraryId = null;
    this.itineraryItemId = null;

    this.selectedItineraryItem$
      .pipe(
        tap((itineraryItem) => {
          this.itineraryId = itineraryItem?.itineraryId ?? null;
          this.itineraryItemId = itineraryItem?._id ?? null;
        }),
        map((itineraryItem) => {
          this.itineraryItemForm.patchValue({
            title: itineraryItem?.title ?? 'No tile',
            dateStart: itineraryItem?.startDateTimeISOString?.toDate() || Date.now(),
            dateEnd: itineraryItem?.endDateTimeISOString?.toDate() || Date.now(),
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
  }

  submitForm(): void {
    const item = this.itineraryItemForm.value;
    //Used a popup and not params askies
    const newItineraryItem: ItineraryItem = {
      _id: this.itineraryItemId,
      costEstimate: item.costEstimate,
      currency: item.currency,
      description: item.description,
      endDateTimeISOString: Timestamp.fromDate(item.dateEnd),
      itineraryId: this.itineraryId,
      notes: item.notes,
      startDateTimeISOString: Timestamp.fromDate(item.dateStart),
      tag: item.tag,
      title: item.title,
    };
    this.itineraryItemStore.dispatch(upsertItineraryItem({ itineraryItem: newItineraryItem }));
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
