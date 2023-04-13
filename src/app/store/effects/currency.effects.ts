import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CurrencyActions from '../actions/currency.actions';
import {CurrencyApiService} from "../../services/api/currency-api.service";
import {Currency} from "../../models/currency.model";


@Injectable()
export class CurrencyEffects {

  getAllCurrencies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrencyActions.getAllCurrencies),
      concatMap(({commaSeperatedCurrencyCodes}) =>
        this.currencyApiService.getAllCurrencies(commaSeperatedCurrencyCodes).pipe(
          map((allCurrencies: Currency[]) => CurrencyActions.getAllCurrenciesComplete({ allCurrencies })),
          catchError((error) => of(CurrencyActions.getAllCurrenciesFailure({ error }))
          )
        )
      ))
  });
  convertExchangeRates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrencyActions.convertExchangeRates),
      concatMap(({ valueToConvert, fromBaseCurrency, toSelectedCurrency}) =>
        this.currencyApiService.convertExchangeRates(valueToConvert, fromBaseCurrency, toSelectedCurrency).pipe(
          map((convertedValue: number) => CurrencyActions.convertExchangeRatesComplete({ convertedValue })),
          catchError((error) => of(CurrencyActions.convertExchangeRatesFailure({ error }))
          )
        )
      ))
  });

  constructor(private actions$: Actions, private currencyApiService: CurrencyApiService) {}
}
