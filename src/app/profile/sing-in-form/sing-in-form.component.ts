import { Component, OnDestroy, OnInit } from '@angular/core';
import { SingInStatusService } from '../../core/services/sing-in-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sing-in-form',
  templateUrl: './sing-in-form.component.html',
  styleUrls: ['./sing-in-form.component.scss'],
})
export class SingInFormComponent implements OnInit, OnDestroy {
  hide = true;

  constructor(private singInStatusService: SingInStatusService) {}

  singInActive = false;

  singInSubscription: Subscription | undefined;

  changeStatus() {
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
