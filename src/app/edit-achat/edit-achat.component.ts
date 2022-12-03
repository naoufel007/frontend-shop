import { Component, OnInit, Input } from '@angular/core';
import { FournisseurService } from 'app/services/fournisseur.service';
import { ProduitsService } from 'app/services/produits/produits.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Achat, PQ } from 'app/models/Achat.model';
import { AchatsService } from 'app/services/achat/achats.service';
declare var swal: any;
@Component({
  selector: 'edit-achat',
  templateUrl: './edit-achat.component.html',
  styleUrls: ['./edit-achat.component.scss']
})
export class EditAchatComponent implements OnInit {

  achat: Achat = {} as Achat;
  selectedFournisseur = [];
  produits: Array<any> = [];
  fournisseurs: Array<any> = [];
  lines = [];
  loading:boolean = true;
  types = [
    {
      itemName: "Casio",
      id: 0,
      code: "casio"
    },
    {
      itemName: "Nouveau",
      id: 1,
      code: "nouveau"
    }
  ];
  getType(t) {
    let filtered = this.types.filter(type => type.code == t);
    let res = filtered || [this.types[1]];
    return res;
  }
  dropdownSettings = {
    singleSelection: true,
    text: "Selectionner un fournisseur",
    searchPlaceholderText: "Rechercher un fournisseur",
    noDataLabel: "Aucun fournisseur trouvé",
    enableSearchFilter: true,
    classes: "myclass custom-class"
  };
  constructor(
    private router: Router, private produitService: ProduitsService,
    private achatService: AchatsService,
    private route: ActivatedRoute,
    private fournisseursService: FournisseurService) { }

  ngOnInit() {
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

    this.route.params.subscribe(params => {
      let id = +params['id']
      if (id) {// mode consultation du produit
        this.achatService.getAchatById(id).subscribe(
          data => this.populateAchat(data[0]),
          err => console.error(err)
        );

      }
    });
  }

  populateAchat(achat: Achat) {
    this.achat = achat;
    this.selectedFournisseur = [{
      itemName: achat.fournisseur.name,
      id: achat.fournisseur.id
    }];

    for (let pq of achat.produit) {
       this.lines.push(
           {
             produit: [{
               itemName: pq.produit.name,
               id: pq.produit.id,
               max:pq.produit.max,
               quantite:pq.produit.quantite
             }],
             quantite: pq.quantite,
             price: pq.prix,
             remise: pq.remise,
             type:this.getType(pq.type)
           }
       );
    }

    this.loading = false;
  }

  getTitre() {
    return "Modification d'un achat";

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
    this.achatService.updateAchat(achat)
      .subscribe(
      achat => {
        swal({
          type: "success",
          title: "Achat bien mis à jour",
          confirmButtonText: "OK",
          showConfirmButton: true
        }).then(r => {
          if (r.value) {
            this.router.navigate(["/achats"]);
          }
        });
      },
      error => {
        console.error(error);
      }
      );
  }

  prepapreAchat(): any {
    let obj = {} as any;
    obj.id = this.achat.id;
    obj.fournisseur_id = this.selectedFournisseur[0].id;
    obj.user_id = 10;
    obj.produits = [];
    for (let line of this.lines) {
      obj.produits.push({
        id: line.produit[0].id,
        price: line.price,
        quantite: line.quantite,
        remise: line.remise,
        casio:line.produit[0].casio || "nouveau"
      });
    }
    // obj.payments = this.achat.payments;
    return obj;
  }
}

