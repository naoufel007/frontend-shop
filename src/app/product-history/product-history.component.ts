import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AchatItem, VenteItem, ProductHistory } from 'app/models/ProductHistory';

@Component({
  selector: 'product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.scss']
})
export class ProductHistoryComponent implements OnInit, OnChanges{


  achats: AchatItem[] = [];
  ventes: VenteItem[] = [];

  @Input()
  productHistory:ProductHistory;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.productHistory = changes.productHistory.currentValue;
    
  }

  ngOnInit() {
  }

}
