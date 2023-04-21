import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss'],
})
export class ResultItemComponent {
  @Input() isBack = false;

  cityFrom = 'Dublin';

  cityTo = 'Warsaw Modlin';
}
