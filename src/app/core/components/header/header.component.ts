import { Component, OnDestroy, OnInit } from '@angular/core';
import { SingInStatusService } from '../../services/sing-in-status.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private singInStatusService: SingInStatusService, public authServise: AuthService) {}

  singInSubscription: Subscription | undefined;

  singInActive = false;

  changeStatusSingIn() {
    this.singInStatusService.setSingInStatus(!this.singInActive);
    console.log(this.authServise.isLoggedIn);
  }

  ngOnInit(): void {
    this.singInSubscription = this.singInStatusService.singInStatus$.subscribe(
      (status) => (this.singInActive = status)
    );
  }

  ngOnDestroy(): void {
    this.singInSubscription?.unsubscribe();
  }
}
