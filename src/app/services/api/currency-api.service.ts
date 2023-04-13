import { Injectable } from '@angular/core';
import {Currency} from "../../models/currency.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {
// MOCK for now
  apiKey: string = ''
  getAllCurrencies(commaSeperatedCurrencyCodes : string) : Observable<Currency[]> {
    return new Observable(observer => {
      fetch(`https://api.currencyapi.com/v3/latest?apikey=${this.apiKey}&currencies=${commaSeperatedCurrencyCodes}`)
        .then((response) =>
          response.json())
        .then((data) => {
          const currenciesByCurrencyCode = data.data
          const currencies: Currency[] = []
          for(let currencyCode in currenciesByCurrencyCode){
            if (currenciesByCurrencyCode.hasOwnProperty(currencyCode)) {
              currencies.push(currenciesByCurrencyCode[currencyCode] as Currency)
            }
          }
          observer.next(currencies)
          observer.complete()
        })
        .catch((error) => observer.error(error))
    })
  }

  convertExchangeRates(
    valueToConvert: number,
    fromBaseCurrency: string,
    toSelectedCurrency: string
  ) : Observable<number> {
    return new Observable(observer => {
      fetch(`https://api.currencyapi.com/v3/latest?apikey=${this.apiKey}&currencies=`)
        .then((response) =>
          response.json() as Promise<Currency[]>)// do I need error here
        .then((currencies) => {
          let fromRate: number = 1;
          let toRate: number = 1;

          for (let currency of currencies){
            if (currency.code == fromBaseCurrency){
              toRate = currency.value ?? 1
            }
            if (currency.code == toSelectedCurrency){
              fromRate = currency.value ?? 1
            }
          }
          const convertedValue = (valueToConvert / fromRate) * toRate;
          observer.next(convertedValue)
          observer.complete()
        })
        .catch((error) => observer.error(error))
    })
  }

  constructor() {
    this.apiKey = environment.currency.apiKey
  }
}