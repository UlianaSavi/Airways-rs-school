import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PopapsStatusService } from 'src/app/core/services/popaps-status.service';
import { emailPattern } from '../../constants/email-pattern';
import * as valid from 'card-validator';
import { cardNumRegexp1, cardNumRegexp2 } from '../../constants/card-number-pattern';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  constructor(private PopapsService: PopapsStatusService) {}

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
    const val = this.paymentForm.value.cardDates;
    if (val && val.toString().length > 4) {
      const res = val.toString().slice(0, 4);
      this.paymentForm.get('cardDates')?.setValue(res);
    }
  };

  onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    this.closePayment();
    this.paymentForm.reset();
  };
}
