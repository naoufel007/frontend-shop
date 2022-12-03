import { Component, OnInit } from '@angular/core';
import { Fournisseur } from 'app/models/Fournisseur.model';
import { FournisseurService } from 'app/services/fournisseur.service';
import { Observable } from 'rxjs/Observable';
import { Agence } from 'app/models/Agence.model';
import { AgencesService } from 'app/services/agences/agences.service';

declare var swal: any;
@Component({
  selector: 'fournisseur-manager',
  templateUrl: './fournisseur-manager.component.html',
  styleUrls: ['./fournisseur-manager.component.scss']
})
export class FournisseurManagerComponent implements OnInit {
  fournisseurs$: Array<Fournisseur> = [];
  addNewFournisseur:boolean = false;
  loadingFournisseurs:boolean =false;
  agences:Array<Agence> = [];
  constructor(private fournisseurService:FournisseurService,
    private agenceService:AgencesService) { 
      this.loadingFournisseurs = true;
      fournisseurService.getFournisseurs()
        .subscribe(fournisseurs => {
            this.fournisseurs$ = fournisseurs
            this.loadingFournisseurs = false;
          },
          err => {
          swal({
            type: 'error',
            title: 'Vérifier votre internet',
          })
          this.loadingFournisseurs = false;
        });
        this.agenceService.getAgences().subscribe(agences=> this.agences = agences);
                      
  }

  ngOnInit() {
  }

  create(newF){
    this.fournisseurService.createFournisseur(newF)
        .subscribe(f =>{
          newF.id = f.id;
          this.fournisseurs$.push(newF);
          this.addNewFournisseur = false;
        },
        err =>{
          swal({
            type: 'error',
            title: 'Une erreur est survenue, vérifier votre internet',
          })
        });
    
  }

  cancel(){
    this.addNewFournisseur = false;
  }
  delete(f:Fournisseur){
    this.fournisseurService.deleteFournisseur(f)
        .subscribe(
          res => {
            if(res){
              this.fournisseurs$.splice(this.fournisseurs$.indexOf(f),1);
            }
        },
          error=>{
            swal({
              type: 'error',
              title: error.message,
            })
        });
  }

  updateFournisseur(f:Fournisseur){
    this.fournisseurService.updateFournisseur(f)
      .subscribe(res =>{
        if(res){
          
        }
      });
  }
}