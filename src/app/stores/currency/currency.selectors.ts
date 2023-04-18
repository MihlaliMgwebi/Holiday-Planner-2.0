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

export const selectZARCurrency = createSelector(selectAllCurrencies, (allCurrencies) =>
  allCurrencies.find((currentCurrency) => currentCurrency.code?.toUpperCase() == 'ZAR')
);

export const selectConvertedValue = createSelector(
  selectSelectBaseValue,
  selectSelectedBaseCurrency,
  selectZARCurrency,
  (baseValue, baseCurrency, ZARCurrency) =>
    baseCurrency && ZARCurrency && baseCurrency.rate && ZARCurrency.rate
      ? (baseValue * baseCurrency?.rate) / ZARCurrency?.rate
      : baseValue
);
