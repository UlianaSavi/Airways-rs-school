import { Component } from '@angular/core';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent {
  canEditBlock = false;

  editBlockChanged(editBlock: boolean) {
    this.canEditBlock = editBlock;
  }

  hasBack = true;
}
