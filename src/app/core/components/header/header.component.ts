import { Component, OnDestroy, OnInit, DoCheck } from '@angular/core';
import { SingInStatusService } from '../../services/sing-in-status.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CurrentStep } from '../../models/current-step.model';
import { Store } from '@ngrx/store';
import * as CurrencyDateActions from '../../../redux/actions/currency-date.actions';
import { MY_FORMATS } from '../../../shared/shared.module';

enum EuroCoefficient {
  EUR = 1,
  USD = 0.9,
  RUB = 90,
  PLN = 4.6,
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, DoCheck {
  constructor(
    private singInStatusService: SingInStatusService,
    public authService: AuthService,
    private store: Store
  ) {}

  dateFormat = 'MM/DD/YYYY';

  currency = 'EUR';

  onChangeDateFormat() {
    this.store.dispatch(CurrencyDateActions.setDateFormat({ formatDate: this.dateFormat }));
    MY_FORMATS.parse.dateInput = this.dateFormat;
    MY_FORMATS.display.dateInput = this.dateFormat;
  }

  onChangeCurrencyFormat() {
    this.store.dispatch(
      CurrencyDateActions.setCurrencyFormat({
        currency: { name: this.currency, euroCoefficient: this.getEuroCoefficient(this.currency) },
      })
    );
  }

  private getEuroCoefficient(currency: string): number {
    switch (currency) {
      case 'EUR':
        return EuroCoefficient.EUR;
      case 'USD':
        return EuroCoefficient.USD;
      case 'RUB':
        return EuroCoefficient.RUB;
      case 'PLN':
        return EuroCoefficient.PLN;
      default:
        return EuroCoefficient.EUR;
    }
  }

  singInSubscription: Subscription | undefined;

  singInActive = false;

  stepsActivate = false;

  activeSearchStep = false;

  activeBookingStep = false;

  activeLastStep = false;

  changeStatusSingIn() {
    this.singInStatusService.setSingInStatus(!this.singInActive);
  }

  ngOnInit(): void {
    this.singInSubscription = this.singInStatusService.singInStatus$.subscribe(
      (status) => (this.singInActive = status)
    );
  }

  ngDoCheck() {
    this.getCurrStep();
  }

  getCurrStep() {
    switch (location.pathname) {
      case CurrentStep.activeSearchStep:
        this.stepsActivate = true;
        this.activeSearchStep = true;
        break;
      case CurrentStep.activeBookingStep:
        this.stepsActivate = true;
        this.activeSearchStep = true;
        this.activeBookingStep = true;
        break;
      case CurrentStep.activeLastStep:
        this.stepsActivate = true;
        this.activeSearchStep = true;
        this.activeBookingStep = true;
        this.activeLastStep = true;
        break;
      default:
        this.stepsActivate = false;
        this.activeSearchStep = false;
        this.activeBookingStep = false;
        this.activeLastStep = false;
        break;
    }
  }

  ngOnDestroy(): void {
    this.singInSubscription?.unsubscribe();
  }
}
