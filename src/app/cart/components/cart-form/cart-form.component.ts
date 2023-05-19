import { Component } from '@angular/core';
import { PopupsStatusService } from 'src/app/core/services/popups-status.service';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
})
export class CartFormComponent {
  constructor(private popupsService: PopupsStatusService) {}

  selectedCount = 0;

  public setSelectedCount(count: number) {
    this.selectedCount = count;
  }

  public openPayment = () => {
    this.popupsService.setPaymentStatus(true);
  };
}
