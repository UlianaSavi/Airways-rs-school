import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
})
export class CartFormComponent {
  selectedCount = 0;

  public setSelectedCount(count: number) {
    this.selectedCount = count;
  }
}
