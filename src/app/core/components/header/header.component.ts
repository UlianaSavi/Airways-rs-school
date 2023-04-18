import { Component, OnDestroy, OnInit } from '@angular/core';
import { SingInStatusService } from '../../services/sing-in-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private singInStatusService: SingInStatusService) {}

  singInSubscription: Subscription | undefined;

  singInActive = false;

  changeStatusSingIn() {
    this.singInStatusService.setSingInStatus(!this.singInActive);
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
