import { Component } from '@angular/core';
import { PopapsStatusService } from 'src/app/core/services/popaps-status.service';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
})
export class CartFormComponent {
  constructor(private PopapsService: PopapsStatusService) {}

  openPayment = () => {
    this.PopapsService.setPaymentStatus(true);
    console.log('set payment popap');
  };
}
