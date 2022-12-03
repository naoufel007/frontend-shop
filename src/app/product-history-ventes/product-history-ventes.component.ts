import { Component, OnInit, Input } from '@angular/core';
import { VenteItem } from 'app/models/ProductHistory';
import { Vente } from 'app/models/Vente.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';
import { Paginable } from 'app/behaviors/paginable';

@Component({
  selector: 'product-history-ventes',
  templateUrl: './product-history-ventes.component.html',
  styleUrls: ['./product-history-ventes.component.scss']
})
export class ProductHistoryVentesComponent implements OnInit, Paginable {

  @Input()
  ventes:VenteItem[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  pagedArray: Array<VenteItem>;
  maxSize: number = 10;
  constructor() { }

  ngOnInit() {
    this.pagedArray = this.ventes.slice(0, this.itemsPerPage);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pagedArray = this.ventes.slice(startItem, endItem);
  }

  isPaginationDisplayed(): boolean {
    return this.ventes && this.ventes.length != 0 && this.ventes.length > this.itemsPerPage;
  }

}
