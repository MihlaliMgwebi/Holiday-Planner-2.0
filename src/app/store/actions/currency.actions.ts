import { createAction, props } from '@ngrx/store';
import { Currency } from '../../models/currency.model';

export const getAllCurrencies = createAction('[Currency Component] Get Currencies');

export const getAllCurrenciesComplete = createAction(
  '[Currency Effect] Get Currencies Complete',
  props<{ allCurrencies: Currency[] }>()
);

export const getAllCurrenciesFailure = createAction('[Currency] Get Currencies Failure', props<{ error: unknown }>());
export const convertExchangeRates = createAction(
  '[Currency Component] Convert Exchange Rates',
  props<{
    valueToConvert: number;
    fromBaseCurrency: string;
    toSelectedCurrency: string;
  }>()
);

export const convertExchangeRatesComplete = createAction(
  '[Currency Effect] Convert Exchange Rates Complete',
  props<{ convertedValue: number }>()
);

export const convertExchangeRatesFailure = createAction(
  '[Currency] Convert Exchange Rates Failure',
  props<{ error: unknown }>()
);
