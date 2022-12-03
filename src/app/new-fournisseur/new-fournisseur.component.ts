import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
import { Fournisseur } from 'app/models/Fournisseur.model';
declare var swal;
@Component({
  selector: 'new-fournisseur',
  templateUrl: './new-fournisseur.component.html',
  styleUrls: ['./new-fournisseur.component.scss']
})
export class NewFournisseurComponent implements OnInit {

  @Input()
  newFournisseur:Fournisseur = {} as Fournisseur;

  @Input()
  editMode:boolean = false;
  @Output()
  cancel: EventEmitter<Fournisseur> = new EventEmitter<Fournisseur>();

  @Output()
  create :EventEmitter<Fournisseur> = new EventEmitter<Fournisseur>();

  @Output()
  edit:EventEmitter<Fournisseur> = new EventEmitter<Fournisseur>();

  selectedAgences:any = [];
  constructor() { }

  ngOnInit() {
  }
  getTitre(){
    if(this.editMode){
      return 'Modification du fournisseur:';
    }else{
      return 'Nouveau fournisseur';
    }
  }
  createFournisseur(){
    this.create.emit(this.newFournisseur);
  }
  cancelFournisseur(){
    swal("Êtes-vous sûr de vouloir annuler?","",
                "warning",{
                  buttons: ["Non", "Oui"],
                  dangerMode:true
                }).then((willCancel)=>{
                  if(willCancel){
                    if(! this.editMode){
                      this.newFournisseur = {} as Fournisseur;
                    }
                    this.cancel.emit();
                  }
                });
    
  }

  modifierFournisseur(){
    this.edit.emit(this.newFournisseur);
  }

}
