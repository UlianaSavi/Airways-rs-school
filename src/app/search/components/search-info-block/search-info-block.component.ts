import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.from = params.get('from')?.slice(0, -4) || null;
      this.to = params.get('to')?.slice(0, -4) || null;
      this.dateFrom = params.get('dateFrom');
      this.dateTo = params.get('dateTo');
      const adult = params.get('adult')?.replace(/[^0-9]/g, '') || null;
      const child = params.get('child')?.replace(/[^0-9]/g, '') || null;
      const infant = params.get('infant')?.replace(/[^0-9]/g, '') || null;

      this.count = Number(adult) + Number(child) + Number(infant);
    });
  }
}
