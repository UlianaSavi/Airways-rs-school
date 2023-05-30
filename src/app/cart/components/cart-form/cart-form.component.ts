import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupsStatusService } from 'src/app/core/services/popups-status.service';
import { resetSearchForm } from 'src/app/redux/actions/search-form.actions';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
})
export class CartFormComponent implements OnDestroy {
  constructor(private popupsService: PopupsStatusService, private store: Store) {}

  selectedCount = 0;

  public setSelectedCount(count: number) {
    this.selectedCount = count;
  }

  public openPayment = () => {
    this.popupsService.setPaymentStatus(true);
  };

  ngOnDestroy(): void {
    this.store.dispatch(resetSearchForm());
  }
}
