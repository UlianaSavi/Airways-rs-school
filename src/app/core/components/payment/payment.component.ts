import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PopupsStatusService } from 'src/app/core/services/popaps-status.service';
import { emailPattern } from '../../constants/email-pattern';
import * as valid from 'card-validator';
import { cardNumRegexp1, cardNumRegexp2 } from '../../constants/card-number-pattern';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  constructor(private PopapsService: PopupsStatusService) {}

  paymentSubscription: Subscription | null = null;

  paymentActive = false;

  cardImagePath = 'default';

  cardNumRegexp = this.cardImagePath === 'american-express' ? cardNumRegexp2 : cardNumRegexp1;

  paymentForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
    cardNumber: new FormControl('', [Validators.required, Validators.pattern(this.cardNumRegexp)]),
    cardDates: new FormControl('', [Validators.required]),
    CVC: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.paymentSubscription = this.PopapsService.paymentStatus$.subscribe(
      (status) => (this.paymentActive = status)
    );
  }

  ngOnDestroy() {
    this.paymentSubscription?.unsubscribe();
  }

  closePayment = () => {
    this.PopapsService.setPaymentStatus(false);
  };

  checkCardType = () => {
    const num = this.paymentForm.value?.cardNumber;
    if (num && num.toString().length > 3 && num.toString().length <= 4) {
      const cardType = valid.number(num).card?.type;
      this.cardImagePath = cardType || 'default';
    }
  };

  setExpiration = () => {
    const val = this.paymentForm.value.cardDates || '';
    if (val.toString().match('/') || val.toString().match(/[^0-9]/)) {
      const numberEl = val.replace(/[^0-9]/g, '');
      this.paymentForm.get('cardDates')?.setValue(numberEl);
      return;
    }
    if (val && val.toString().length >= 4) {
      const num = val.toString().slice(0, 4);
      let month = num.slice(0, 2);
      let year = num.slice(-2);
      if (Number(year) < 23) {
        year = '23';
      }
      if (Number(month) > 12) {
        month = '01';
      }
      const res = `${month} / ${year}`;
      this.paymentForm.get('cardDates')?.setValue(res);
      return;
    }
  };

  onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    this.closePayment();
    this.paymentForm.reset();
    // when cart is ready - add here method to save order data to store (for user acc info)
  };
}
