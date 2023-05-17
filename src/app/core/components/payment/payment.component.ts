import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PopapsStatusService } from 'src/app/core/services/popaps-status.service';
import { emailPattern } from '../../constants/email-pattern';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  constructor(private PopapsService: PopapsStatusService) {}

  paymentSubscription: Subscription | null = null;

  paymentActive = false;

  paymentForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
    cardNumber: new FormControl('', [Validators.required]),
    cardDates: new FormControl('', [Validators.required]),
    CVC: new FormControl('', [
      Validators.required,
      Validators.maxLength(3),
      Validators.minLength(3),
    ]),
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

  onSubmit = () => {
    this.paymentForm.reset();
  };
}
