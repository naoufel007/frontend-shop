import { Component, OnInit,Input,Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Fournisseur } from 'app/models/Fournisseur.model';
import { FournisseurService } from 'app/services/fournisseur.service';
import { Agence } from 'app/models/Agence.model';

@Component({
  selector: 'list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnInit, OnChanges{


  @Input()
  fournisseurs:Array<Fournisseur> = [];
  @Input()
  loadingFournisseurs:boolean = false;

  @Input()
  agences:Array<Agence> = [];

  fournisseurToEdit:Fournisseur;

  chosenAgence:Agence;
  @Output()
  deleted:EventEmitter<Fournisseur> = new EventEmitter<Fournisseur>();

  @Output()
  update:EventEmitter<Fournisseur> = new EventEmitter<Fournisseur>();

  totalCredits = 0;
  constructor(private fournisseurService:FournisseurService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.fournisseurs){
      (changes.fournisseurs.currentValue || []).forEach(f => this.totalCredits += -(-f.reste))
    }
  }
  
  ngOnInit() {
    this.fournisseurs.forEach(f => this.totalCredits += f.reste);
  }

  remove(f:Fournisseur){
    this.deleted.emit(f)
  }

  show(f:Fournisseur){
  }
  edit(f:Fournisseur){
    
    this.fournisseurToEdit = f;
  }

  getFournisseurToEdit(){
    return this.fournisseurToEdit;
  }

  updateFournisseur(f:Fournisseur){
    this.fournisseurService.updateFournisseur(f)
      .subscribe(res =>{
        this.fournisseurToEdit = null;
      });
  }
  cancelUpdate(){
    this.fournisseurToEdit = null;
  }
}
