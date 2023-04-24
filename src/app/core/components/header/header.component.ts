import { Component, OnDestroy, OnInit, DoCheck } from '@angular/core';
import { SingInStatusService } from '../../services/sing-in-status.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CurrentStep } from '../../models/current-step.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, DoCheck {
  constructor(private singInStatusService: SingInStatusService, public authServise: AuthService) {}

  singInSubscription: Subscription | undefined;

  singInActive = false;

  stepsActivate = false;

  activeSearchStep = false;

  activeBookingStep = false;

  activeLastStep = false;

  changeStatusSingIn() {
    this.singInStatusService.setSingInStatus(!this.singInActive);
  }

  ngOnInit(): void {
    this.singInSubscription = this.singInStatusService.singInStatus$.subscribe(
      (status) => (this.singInActive = status)
    );
  }

  ngDoCheck() {
    this.getCurrStep();
  }

  getCurrStep() {
    switch (location.pathname) {
      case CurrentStep.activeSearchStep:
        this.stepsActivate = true;
        this.activeSearchStep = true;
        break;
      case CurrentStep.activeBookingStep:
        this.stepsActivate = true;
        this.activeSearchStep = true;
        this.activeBookingStep = true;
        break;
      case CurrentStep.activeLastStep:
        this.stepsActivate = true;
        this.activeSearchStep = true;
        this.activeBookingStep = true;
        this.activeLastStep = true;
        break;
      default:
        this.stepsActivate = false;
        this.activeSearchStep = false;
        this.activeBookingStep = false;
        this.activeLastStep = false;
        break;
    }
  }

  ngOnDestroy(): void {
    this.singInSubscription?.unsubscribe();
  }
}
