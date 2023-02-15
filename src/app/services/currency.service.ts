import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private MainHTTP = 'https://api.getgeoapi.com/v2/currency/';
  // private API_KEY = 'd4850d49521be164b994e6c9e38d98fb99cf9856';
  private API_KEY = 'fd4e64728e29881697f11cb3578a325ed323a7f0';
  // private API_KEY = '39e4611774a0f1b08b5c71946b941afbbeb55d45';
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  convertCurrency(
    from: String,
    to: String,
    amount: String
  ): Observable<Object> {
    return this.http
      .get<Object>(
        `${this.MainHTTP}convert?api_key=${this.API_KEY}&from=${from}&to=${to}&amount=${amount}&format=json`
      )
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
