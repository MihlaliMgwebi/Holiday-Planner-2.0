import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Currency } from '../../models/currency.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CurrencyState } from '../../store/reducers/currency.reducer';
import { getAllCurrencies } from '../../store/actions/currency.actions';
import { Observable } from 'rxjs';
import { selectAllCurrencies } from '../../store/selectors/currency.selectors';

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
  //
  // allCurrencies$: Observable<Currency[]>;
  // form = new FormGroup({
  //   currency: new FormControl('', Validators.required),
  // });
  //
  // constructor(private currencyStore: Store<CurrencyState>) {
  //   this.allCurrencies$ = currencyStore.select(selectAllCurrencies);
  // }
  // ngOnInit(): void {
  //   this.currencyStore.dispatch(getAllCurrencies({ commaSeperatedCurrencyCodes: '' })); // Q: should I make this optional
  // }
  // get f() {
  //   return this.form.controls;
  // }
  //
  // submit() {
  //   console.log(this.form.value);
  // }
}
