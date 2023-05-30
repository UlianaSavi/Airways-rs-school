import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupsStatusService } from '../../services/popups-status.service';

@Component({
  selector: 'app-password-helper-popup',
  templateUrl: './password-helper-popup.component.html',
  styleUrls: ['./password-helper-popup.component.scss'],
})
export class PasswordHelperPopupComponent implements OnInit, OnDestroy {
  constructor(private popupsService: PopupsStatusService) {}

  passwordHelperSubscription: Subscription | null = null;

  passwordHelperActive = false;

  ngOnInit(): void {
    this.passwordHelperSubscription = this.popupsService.passwordHelperStatus$.subscribe(
      (status) => (this.passwordHelperActive = status)
    );
  }

  ngOnDestroy() {
    this.passwordHelperSubscription?.unsubscribe();
  }

  closePasswordHelper = () => {
    this.popupsService.setPasswordHelper(false);
  };
}
