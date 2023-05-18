import { Component } from '@angular/core';
import { PopupsStatusService } from 'src/app/core/services/popaps-status.service';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
})
export class CartFormComponent {
  constructor(private popapsService: PopupsStatusService) {}

  openPayment = () => {
    this.popapsService.setPaymentStatus(true);
  };
}
