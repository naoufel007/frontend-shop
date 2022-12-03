import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {
  @Input()
  list = [];
  @Output()
  selected:EventEmitter<any> = new EventEmitter<any>();
  @Input()
  selectedItems = [];
  dropdownSettings = {};

  constructor() { }

  ngOnInit() {

  this.dropdownSettings = { 
          singleSelection: false, 
          text:"Selectionner une agence",
          selectAllText:'Selectionner tout',
          unSelectAllText:'Déselctionner tout',
          searchPlaceholderText:"Recherche",
          noDataLabel: "Aucune agence trouvée",
          enableSearchFilter: true,
          classes:"myclass custom-class"
        };   
  }
  
  selectionActionPerformed(e){
    this.selected.emit(this.selectedItems);
  }

}
 