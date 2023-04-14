import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCurrency from '../reducers/currency.reducer';
export const selectCurrencyState = createFeatureSelector<fromCurrency.CurrencyState>(
  fromCurrency.currencyFeatureKey
);

// Sliced State
export const selectAllCurrencies = createSelector(
  selectCurrencyState,
  (state)=> state.allCurrencies
)

export const selectConvertedValue = createSelector(
  selectCurrencyState,
  (state)=> state.convertedValue
)
