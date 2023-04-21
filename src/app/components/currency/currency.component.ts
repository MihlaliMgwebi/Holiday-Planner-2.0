import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
})
export class CurrencyComponent {
  selectedCurrency: string = 'ZAR';
  @Output() currencySelected = new EventEmitter<string>();

  onCurrencyChange(currency: string) {
    this.selectedCurrency = currency;
    this.currencySelected.emit(currency);
  }
}
