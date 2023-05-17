import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
})
export class CartFormComponent {
  openedPayment = false;

  openPayment = () => {
    console.log('payment opened!');
    this.openedPayment = !this.openedPayment;
  };
}
