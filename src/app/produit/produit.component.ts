import { Component, OnInit} from '@angular/core';
import { Produit } from 'app/models/Produit.model';
import { ProduitsService } from 'app/services/produits/produits.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Fournisseur } from 'app/models/Fournisseur.model';
import { Utils } from 'app/util';

declare var swal: any;
@Component({
  selector: 'produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  produit:Produit = new Produit();
  editMode:boolean = false;
  dropdownSettings:any = {};
  selectedFournisseur:any;
  
  constructor(private produitService:ProduitsService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {

    this.route.params.subscribe(params =>{
      
      if(+params['id']){// mode consultation du produit
        this.produitService.getProduitById(+params['id']).subscribe(
          prod => {
            this.produit = prod;
            this.selectedFournisseur = [{
              id:this.produit.fournisseur.id,
              itemName: this.produit.fournisseur.name
            }];
          },
          error => console.log(error)
        )
        if(params['action'] === 'edit'){ // mode edition
          this.editMode = true;
        }else{
          this.editMode = false;
        }
      }
    });
  }
  getTitre(){
    if(this.editMode){
      return "Modification du produit";
    }
    return "Ajout d'un nouveau produit";
  }

  selectFournisseur(fournisseur){
    this.produit.fournisseur = fournisseur as Fournisseur;
  }

  crateProduit(){
    try{
      this.produitService
        .createProduit(this.produit)
        .subscribe(
          produit => Utils.success(this.router,["/stock"],'Produit Ajouté') ,
          error => Utils.errorOccured(error)
        )
    }catch(error){
      Utils.error(error);
    }
  }

  selectionActionPerformed(e){
  }
  modifierProduit(){
    try{
      this.produitService.updateProduit(this.produit)
          .subscribe(
            produit => Utils.success(this.router,["/stock"],'Produit bien modifié') ,
            error => Utils.errorOccured(error)
          );
    }catch(error){
      Utils.error(error)
    }
  }
  cancelProduit(){
    swal({
      title: 'Êtes-vous sûr de vouloir annuler?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/stock']);
      }
    })
  }
}
