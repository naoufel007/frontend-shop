import { Component, OnInit, Input } from '@angular/core';
import { VentePaiment } from 'app/models/VentePaiment';
import { Utils } from 'app/util';
@Component({
  selector: 'sale-payments',
  templateUrl: './sale-payments.component.html',
  styleUrls: ['./sale-payments.component.scss']
})
export class SalePaymentsComponent implements OnInit {


  @Input()
  paiments: Array<VentePaiment> = [];
  constructor() { }

  ngOnInit() {
    console.log(this.paiments)
  }

  getFullType(typeCode){
      return Utils.paimentTypesMap[typeCode];
  }

}
