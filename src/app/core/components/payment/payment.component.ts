import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PopapsStatusService } from 'src/app/core/services/popaps-status.service';

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
    email: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.paymentSubscription = this.PopapsService.paymentStatus$.subscribe(
      (status) => (this.paymentActive = status)
    );
  }

  ngOnDestroy(): void {
    this.paymentSubscription?.unsubscribe();
  }
}
