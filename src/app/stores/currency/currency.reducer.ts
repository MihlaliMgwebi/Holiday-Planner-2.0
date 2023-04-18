import { createFeature, createReducer, on } from '@ngrx/store';
import * as CurrencyActions from './currency.actions';
import { Currency } from '../../models/currency.model';

export const currencyFeatureKey = 'currency';

export interface CurrencyState {
  allCurrencies: Currency[];
  convertedValue: number | null;
  fromBaseCurrency: string | null;
  toSelectedCurrency: string | null;
  valueToConvert: number | null;
}

export const initialState: CurrencyState = {
  allCurrencies: [],
  convertedValue: null,
  fromBaseCurrency: null,
  toSelectedCurrency: null,
  valueToConvert: null,
};

export const reducer = createReducer(
  initialState,
  on(CurrencyActions.getAllCurrenciesComplete, (state, { allCurrencies }) => ({ ...state, allCurrencies })),
  on(CurrencyActions.convertExchangeRatesComplete, (state, { convertedValue }) => ({ ...state, convertedValue }))
);

export const currencyFeature = createFeature({
  name: currencyFeatureKey,
  reducer,
});
