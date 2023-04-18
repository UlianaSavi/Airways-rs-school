import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  hide = true;

  singInActive = false;

  changeStatusSingIn() {
    this.singInActive = !this.singInActive;
  }
}
