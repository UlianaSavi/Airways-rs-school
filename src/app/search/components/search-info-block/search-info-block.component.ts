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

  dateFrom: string | null | undefined = null;

  dateTo: string | null = null;

  passengers: string | null = null;

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      // TO DO: translate data to currect format
      this.from = params.get('from');
      this.to = params.get('to');
      this.dateFrom = params.get('dateFrom');
      this.dateTo = params.get('dateTo');
      this.passengers = params.get('passengers');
    });
  }
}
