import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private currencyService: CurrencyService) {}
  currentEuroValue = '';
  currentUSDValue = '';

  ngOnInit(): void {
    this.currencyService
      .convertCurrency('EUR', 'UAH', '1')
      .subscribe(
        (data: any) => (this.currentEuroValue = data.rates.UAH.rate_for_amount)
      );
    this.currencyService
      .convertCurrency('USD', 'UAH', '1')
      .subscribe(
        (data: any) => (this.currentUSDValue = data.rates.UAH.rate_for_amount)
      );
  }
}
