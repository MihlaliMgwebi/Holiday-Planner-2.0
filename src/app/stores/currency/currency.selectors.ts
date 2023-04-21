import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCurrency from './currency.reducer';

export const selectCurrencyState = createFeatureSelector<fromCurrency.CurrencyState>(fromCurrency.currencyFeatureKey);

// Sliced State
export const selectAllCurrencies = createSelector(selectCurrencyState, (state) => state.allCurrencies);

export const selectSelectedCurrencyCode = createSelector(selectCurrencyState, (state) => state.selectedCurrencyCode);
export const selectSelectBaseValue = createSelector(selectCurrencyState, (state) => state.selectedCurrencyValue);
// Derived State

export const selectSelectedBaseCurrency = createSelector(
  selectSelectedCurrencyCode,
  selectAllCurrencies,
  (baseCurrencyCode, allCurrencies) => allCurrencies.find((currentCurrency) => currentCurrency.code == baseCurrencyCode)
);

export const selectConvertedValue = createSelector(
  selectSelectBaseValue,
  selectSelectedBaseCurrency,
  (baseValue, baseCurrency) => (baseCurrency && baseCurrency.rate ? baseValue * baseCurrency?.rate : baseValue)
);
