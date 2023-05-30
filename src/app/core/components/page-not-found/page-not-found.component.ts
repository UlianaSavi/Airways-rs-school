import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  link = this.renderer.selectRootElement('#appIcon');

  previousFavicon = this.link.getAttribute('href');

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.link.href = 'assets/favicons/favicon-404.png';
  }

  ngOnDestroy(): void {
    this.link.href = this.previousFavicon;
  }
}
