import { Component, OnInit, Input } from '@angular/core';
import { AchatItem } from 'app/models/ProductHistory';
import { Paginable } from 'app/behaviors/paginable';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';

@Component({
  selector: 'product-history-achats',
  templateUrl: './product-history-achats.component.html',
  styleUrls: ['./product-history-achats.component.scss']
})
export class ProductHistoryAchatsComponent implements OnInit, Paginable {

  @Input()
  achats:AchatItem[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  pagedArray: Array<AchatItem>;
  maxSize: number = 10;
  constructor() { }

  ngOnInit() {

    this.pagedArray = this.achats.slice(0, this.itemsPerPage);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pagedArray = this.achats.slice(startItem, endItem);
  }

  isPaginationDisplayed(): boolean {
    return this.achats && this.achats.length != 0 && this.achats.length > this.itemsPerPage;
  }

}
