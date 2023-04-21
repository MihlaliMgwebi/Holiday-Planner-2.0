import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EMPTY } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { Currency } from '../../models/currency.model';
import { CurrencyApiService } from '../../services/api/currency-api.service';
import * as CurrencyActions from './currency.actions';

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

  constructor(
    private actions$: Actions,
    private currencyApiService: CurrencyApiService,
    private notification: NzNotificationService
  ) {}
}
