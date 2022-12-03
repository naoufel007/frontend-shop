import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
 
@Component({
  selector: 'type-produit',
  templateUrl: './type-produit.component.html',
  styleUrls: ['./type-produit.component.scss']
})
export class TypeProduitComponent implements OnInit {

  @Output()
  picked:EventEmitter<string> = new EventEmitter<string>();
  typesDropdownSettings = {
    singleSelection: true,
    text: "Selectionner un type"
  }
  types = [
    {
      itemName:"Casio",
      id:0,
      code:"casio"
    },
    {
      itemName:"Nouveau",
      id:1,
      code:"nouveau"
    }
  ];

  @Input()
  selectedType = [this.types[1]];
  isAdmin = false;
  constructor() { }

  ngOnInit() {
    this.isAdmin = localStorage.getItem('role') === 'admin';
    if(this.isAdmin){
      this.types.splice(0,1);
    }
  }
  selectionActionPerformed(type){
    this.picked.emit(type.code);
  }
}
