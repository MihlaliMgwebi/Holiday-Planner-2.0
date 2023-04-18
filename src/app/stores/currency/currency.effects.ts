import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as CurrencyActions from './currency.actions';
import { CurrencyApiService } from '../../services/api/currency-api.service';
import { Currency } from '../../models/currency.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class CurrencyEffects {
  getAllCurrencies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrencyActions.getAllCurrencies),
      concatMap(() =>
        this.currencyApiService.getAllCurrencies().pipe(
          map((allCurrencies: Currency[]) => CurrencyActions.getAllCurrenciesComplete({ allCurrencies })),
          catchError((error) => {
            this.notification.create('error', 'Get All Currencies Error', error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });
  convertExchangeRates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrencyActions.convertExchangeRates),
      concatMap(({ valueToConvert, fromBaseCurrency, toSelectedCurrency }) =>
        this.currencyApiService.convertExchangeRates(valueToConvert, fromBaseCurrency, toSelectedCurrency).pipe(
          map((convertedValue: number) => CurrencyActions.convertExchangeRatesComplete({ convertedValue })),
          catchError((error) => {
            this.notification.create('error', 'Convert Exchange Rates Error', error.error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private currencyApiService: CurrencyApiService,
    private notification: NzNotificationService
  ) {}
}
