import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-info-block',
  templateUrl: './search-info-block.component.html',
  styleUrls: ['./search-info-block.component.scss'],
})
export class SearchInfoBlockComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  from: string | null = null;

  to: string | null = null;

  dateFrom: string | null = null;

  dateTo: string | null = null;

  count: number | null = null;

  editBlock = false;

  @Output() editBlockChanged = new EventEmitter<boolean>();

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.from = params.get('from') || null;
      this.to = params.get('destination') || null;
      this.dateFrom = new Date(params.get('dateFrom') || '').toLocaleString('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
      this.dateTo = new Date(params.get('dateDestination') || '').toLocaleString('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
      const adult = params.get('adult')?.replace(/[^0-9]/g, '') || null;
      const child = params.get('child')?.replace(/[^0-9]/g, '') || null;
      const infant = params.get('infant')?.replace(/[^0-9]/g, '') || null;
      this.count = Number(adult) + Number(child) + Number(infant);
    });
  }

  showEditBlock = () => {
    this.editBlock = !this.editBlock;
    this.editBlockChanged.emit(this.editBlock);
  };
}
