import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'types-vente',
  templateUrl: './types-vente.component.html',
  styleUrls: ['./types-vente.component.scss']
})
export class TypesVenteComponent implements OnInit {

  @Output()
  picked:EventEmitter<string> = new EventEmitter<string>();
  typesDropdownSettings = {
    singleSelection: true,
    text: "Selectionner un type"
  }
  types = [
    {
      itemName:"Détails",
      id:0,
      code:"D"
    },
    {
      itemName:"Gros",
      id:1,
      code:"G"
    }
  ];

  @Input()
  selectedType = [this.types[1]];
  constructor() { }

  ngOnInit() {
  }

  selectionActionPerformed(type){
    this.picked.emit(type.code);
  }

}
