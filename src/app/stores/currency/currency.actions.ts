import { createAction, props } from '@ngrx/store';
import { Currency } from '../../models/currency.model';

// API Action
export const getAllCurrencies = createAction('[Currency Component] Get Currencies');
export const getAllCurrenciesComplete = createAction(
  '[Currency Effect] Get Currencies Complete',
  props<{ allCurrencies: Currency[] }>()
);

// UI Actions
export const setSelectedCurrencyCode = createAction(
  '[Itinerary Item Create] Set Selected Currency Code',
  props<{ selectedCurrencyCode: string }>()
);

export const setSelectedCurrencyValue = createAction(
  '[Itinerary Item Create] Set Selected Currency Value',
  props<{ selectedCurrencyValue: number }>()
);
