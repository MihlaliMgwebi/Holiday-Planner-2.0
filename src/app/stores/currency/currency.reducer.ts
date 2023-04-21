import { createFeature, createReducer, on } from '@ngrx/store';
import { Currency } from '../../models/currency.model';
import * as CurrencyActions from './currency.actions';

export const currencyFeatureKey = 'currency';

export interface CurrencyState {
  allCurrencies: Currency[];
  selectedCurrencyValue: number;
  selectedCurrencyCode: string;
}

export const initialState: CurrencyState = {
  allCurrencies: [],
  selectedCurrencyValue: 0,
  selectedCurrencyCode: 'ZAR',
};

export const reducer = createReducer(
  initialState,
  on(CurrencyActions.getAllCurrenciesComplete, (state, { allCurrencies }) => ({ ...state, allCurrencies })),
  on(CurrencyActions.setSelectedCurrencyCode, (state, { selectedCurrencyCode }) => ({
    ...state,
    selectedCurrencyCode,
  })),
  on(CurrencyActions.setSelectedCurrencyValue, (state, { selectedCurrencyValue }) => ({
    ...state,
    selectedCurrencyValue,
  }))
);

export const currencyFeature = createFeature({
  name: currencyFeatureKey,
  reducer,
});
