import { Component, OnInit } from '@angular/core';
import { FournisseurService } from 'app/services/fournisseur.service';
import { ProduitsService } from 'app/services/produits/produits.service';
import { Router } from '@angular/router';
import { Achat, PQ } from 'app/models/Achat.model';
import { Produit } from 'app/models/Produit.model';
import { AgencesService } from 'app/services/agences/agences.service';
import { AchatsService } from 'app/services/achat/achats.service';
import { AchatPayment } from 'app/models/AchatPayment';
import { Utils } from 'app/util';
declare var swal: any;
@Component({
  selector: 'achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.scss']
})
export class AchatComponent implements OnInit {

  editMode: boolean = false;
  achat: Achat = new Achat();
  selectedFournisseur = [];
  // selectedAgence = [];
  produits: Array<any> = [];
  fournisseurs: Array<any> = [];
  // agences = [];
  lines = [];
  payments:Array<AchatPayment> = [];
  dropdownSettings = {
    singleSelection: true,
    text: "Selectionner un fournisseur",
    searchPlaceholderText: "Rechercher un fournisseur",
    noDataLabel: "Aucun fournisseur trouvé",
    enableSearchFilter: true,
    classes: "myclass custom-class"
  };
  // agenceDropdownSettings = {
  //   singleSelection: true,
  //   text: "Selectionner une agence",
  //   searchPlaceholderText: "Rechercher une agence",
  //   enableSearchFilter: true,
  //   classes: "myclass custom-class"
  // }
  constructor(
    private router: Router, private produitService: ProduitsService,
    private achatService:AchatsService,
    private fournisseursService: FournisseurService) { }

  ngOnInit() {
    this.produitService
    .getUserProducts()
      .subscribe(
      produits => {
        return produits.map(p => {
          this.produits.push({
            
            itemName: p.code+" - "+p.name,  
            id: p.id,
            max:p.max,
            quantite:p.quantite,
            ...p
          });
        });
      },
      error => {
        console.log(error);
      }
      );

    this.fournisseursService
      .getFournisseurs()
      .subscribe(
      fournisseurs => {
        return fournisseurs.map(f => {
          this.fournisseurs.push({
            itemName: f.name,
            id: f.id
          });
        });
      }
      );

    // this.agenceService
    //   .getAgences()
    //   .subscribe(
    //   agences => {
    //     if(agences.length == 1){
    //       this.selectedAgence[0] = {
    //         itemName: agences[0].name,
    //         id: agences[0].id
    //       };
    //     }
    //     return agences.map(agence => {
    //       this.agences.push({
    //         itemName: agence.name,
    //         id: agence.id
    //       });
          
    //     });
    //   }
    //   );

  }

  getTitre() {
    if (this.editMode) {
      return "Modification d'un achat";
    }
    return "Ajout d'un nouveau achat";
  }

  cancelAchat() {
    this.router.navigate(["/achats"]);
  }
  setResult(data) {
    // this.lines = data;
  }

  selectionActionPerformed(e) {
    console.info(e);
  }
  confirmAchat() {


    if (this.selectedFournisseur.length == 0) {
      swal({
        type: 'error',
        title: 'Il faut renseigner un fournisseur.',
      });
      return;
    }

    // if (this.selectedAgence.length == 0) {
    //   swal({
    //     type: 'error',
    //     title: 'Il faut choisir une agence.',
    //   });
    //   return;
    // }
    for (var i = 0; i < this.lines.length; ++i) {
      if (!this.lines[i].produit) {
        swal({
          type: 'error',
          title: 'Veuillez choisir au moins un produit',
        });

        return;
      }

      if (!this.lines[i].quantite && !this.lines[i].price
        || this.lines[i].quantite == 0) {
        swal({
          type: 'error',
          title: 'Veuillez remplire le formulare avec de vrais valeurs',
        });

        return;
      }
    }

    let achat = this.prepapreAchat();
    swal({ title: 'Enregistrement en cours...', allowOutsideClick: false });
    swal.showLoading();
    this.achatService.addAchat(achat)
      .subscribe(
        achat => {
          // swal({
          //   type:"success",
          //   title:"Achat bien ajouté",
          //   confirmButtonText:"OK",
          //   showConfirmButton:true
          // }).then(r =>{
          //   if(r.value){
          //     this.router.navigate(["/achats"]);
          //   }
          // });
          Utils.success(this.router, ["/achats"], "Achat bien ajouté.")
        },
        error => Utils.error(error.json().message)
      );
  }

  prepapreAchat(): any {
    let obj = {} as any;
    obj.fournisseur_id = this.selectedFournisseur[0].id;
    // obj.agence_id = this.selectedAgence[0].id
    obj.produits = [];
    for(let line of this.lines){
      obj.produits.push({
        id:line.produit[0].id,
        price:line.price,
        quantite:line.quantite,
        remise:line.remise ? line.remise : 0,
        casio:line.produit[0].casio || "nouveau"
      });
    }
    return obj;
  }
}

