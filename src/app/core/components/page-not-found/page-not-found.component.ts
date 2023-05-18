import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  link = document.querySelector('#appIcon') as HTMLLinkElement;

  previousFavicon = this.link.href;

  ngOnInit(): void {
    this.link.href = 'assets/favicons/favicon-404.png';
  }

  ngOnDestroy(): void {
    this.link.href = this.previousFavicon;
  }
}
