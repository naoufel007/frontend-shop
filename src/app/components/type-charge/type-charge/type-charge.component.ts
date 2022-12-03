import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { typesCharge } from 'app/models/Charge';

@Component({
  selector: 'type-charge',
  templateUrl: './type-charge.component.html',
  styleUrls: ['./type-charge.component.scss']
})
export class TypeChargeComponent implements OnInit {

  @Output()
  picked: EventEmitter<string> = new EventEmitter<string>();
  typesDropdownSettings = {
    singleSelection: true,
    text: "Selectionner un type"
  }
  types = typesCharge;

  @Input()
  selectedCharge;
  constructor() { }

  ngOnInit() {
  }
  selectionActionPerformed(type) {
    this.picked.emit(type.itemName);
  }

}
