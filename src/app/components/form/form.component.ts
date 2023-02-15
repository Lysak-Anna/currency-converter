import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from 'src/app/services/currency.service';
import { currenciesList } from './../../data/currencies';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(private currencyService: CurrencyService) {}
  ngOnInit() {
    this.form = new FormGroup({
      amountFrom: new FormControl(null, [
        Validators.pattern('^[1-9][0-9]*(\\.\\d+)?$'),
      ]),
      amountTo: new FormControl(null, [
        Validators.pattern('^[1-9][0-9]*(\\.\\d+)?$'),
      ]),
      currencyFrom: new FormControl('UAH'),
      currencyTo: new FormControl('USD'),
    });
  }
  form: any = FormGroup;
  currencies: any = currenciesList;
  list = Object.keys(this.currencies);
  selectedCurrencyFrom = 'Ukrainian hryvnia';
  selectedCurrencyTo = 'United States dollar';

  changeSelectedCurrencyFrom(event: any) {
    this.selectedCurrencyFrom = this.currencies[event.target.value];
    const formData = { ...this.form.value };
    if (formData.amountFrom === '') {
      return;
    }
    this.commonGetAmountFrom();
  }
  changeSelectedCurrencyTo(event: any) {
    this.selectedCurrencyTo = this.currencies[event.target.value];
    const formData = { ...this.form.value };
    if (formData.amountTo === '') {
      return;
    }
    this.commonGetAmountTo();
  }
  getAmountFrom() {
    const formData = { ...this.form.value };
    if (
      formData.amountFrom === '' ||
      this.form.get('amountFrom').errors !== null
    ) {
      this.form.value.amountTo = '';
      return;
    }
    this.commonGetAmountFrom();
  }
  getAmountTo() {
    const formData = { ...this.form.value };
    if (formData.amountTo === '' || this.form.get('amountTo').errors !== null) {
      this.form.value.amountFrom = '';
      return;
    }
    this.commonGetAmountTo();
  }
  commonGetAmountFrom() {
    const formData = { ...this.form.value };
    this.currencyService
      .convertCurrency(
        formData.currencyFrom,
        formData.currencyTo,
        formData.amountFrom
      )
      .subscribe(
        (data: any) =>
          (this.form.value.amountTo = Number(
            data.rates[formData.currencyTo].rate_for_amount
          ).toFixed(2))
      );
  }
  commonGetAmountTo() {
    const formData = { ...this.form.value };
    this.currencyService
      .convertCurrency(
        formData.currencyTo,
        formData.currencyFrom,
        formData.amountTo
      )
      .subscribe(
        (data: any) =>
          (this.form.value.amountFrom = Number(
            data.rates[formData.currencyFrom].rate_for_amount
          ).toFixed(2))
      );
  }
}
