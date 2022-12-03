import { Component, OnInit } from '@angular/core';
import { ProduitsService } from 'app/services/produits/produits.service';
import { ClientService } from 'app/services/client/client.service';
import { RetourService } from 'app/services/retour/retour.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from 'app/util';

declare var swal: any;

@Component({
  selector: 'retour',
  templateUrl: './retour.component.html',
  styleUrls: ['./retour.component.scss']
})
export class RetourComponent implements OnInit {

  editMode: boolean = false;

  produits = [];

  lines = [];

  clients = [];


  selectedClient = [];


  editedVenteId;

  typeVente = "D";

  venteId: number;

  typesVente = [
    {
      itemName: "Détails",
      id: 0,
      code: "D"
    },
    {
      itemName: "Gros",
      id: 1,
      code: "G"
    }
  ];

  editionType;

  clientDropdownSettings = {
    singleSelection: true,
    text: "Selectionner un client",
    searchPlaceholderText: "Rechercher un client",
    noDataLabel: "Aucun client trouvé",
    enableSearchFilter: true,
    classes: "myclass custom-class"
  };

  constructor(private produitService: ProduitsService,
    private clientService: ClientService,
    private retourService: RetourService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        if (id) {
          // mode d'edition
          this.editMode = true
          this.editedVenteId = id;
          this.populateVente(id);
        } else {
          this.editMode = false;
          // mode creation
          this.initMenus();
        }
      }
    );
  }
  initMenus() {
    this.produitService
      .getUserProducts()
      .subscribe(
        produits => {
          return produits.map(p => {
            this.produits.push({
              itemName: p.code + " - " + p.name,
              id: p.id,
              prixVente: p.prixVente,
              prixVenteCasio: p.prixVenteCasio,
              prixRecommende: p.prixVente
            });
          });
        },
        error => {
          swal({
            type: 'error',
            title: "Une erreur est survenue lors du chargement des produits",
          })
        }
      );

    this.clientService
      .loadClients()
      .subscribe(
        clients => {
          return clients.map(
            client => {
              this.clients.push({
                itemName: client.nom,
                id: client.id
              });
            }
          );
        }
      );
  }
  populateVente(id) {
    // this.loading = true;
    this.retourService
      .getRetourById(id)
      .subscribe(
        ventes => {
          this.populateTypeVente(ventes[0]);
          this.populateClient(ventes[0].client);
          this.populateLines(ventes[0].produits);
        }
      );

  }
  populateTypeVente(vente) {

    this.editionType = this.typesVente.filter(
      type => type.code == vente.type
    )
  }
  populateClient(client) {
    let c = {
      id: client.id,
      itemName: client.nom
    };
    this.clients.push(c);
    this.selectedClient.push(c);
  }
  populateLines(lines) {
    this.lines = [];
    for (let pq of lines) {
      this.lines.push(
        {
          produit: [{
            itemName: pq.produit.name,
            id: pq.produit.id,
            max: pq.produit.max,
            min: pq.produit.min,
            quantite: pq.produit.quantite,
            prixVente: pq.produit.prixVente,
            prixVenteCasio: pq.produit.prixVenteCasio,
            prixRecommende: pq.produit.prixVente
          }],
          quantite: pq.quantite,
          price: pq.prix,
          remise: pq.remise,
          type: this.getType(pq.type)
        });
    }
  }
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

  getTitre() {
    if (this.editMode)
      return "Modification du retour.";
    return "Ajout d'un nouveau retour.";
  }

  update() {
    try {
      this.retourService
        .update(this.prepareVente())
        .subscribe(
          vente => Utils.success(this.router, ["/retours"], "Le retour a bien été modifié"),
          error => Utils.errorOccured(error)
        );
    } catch (e) {
      Utils.error(e);
    };
  }

  confirm() {
    try {
      this.validateData();
      this.doConfirm();
    } catch (e) {

      this.errorOccured(e);
    }
  }
  errorOccured(error) {
    let message = "";
    try {
      error = JSON.parse(error._body).message;
      if (error) {
        message = error
      } else {
        message = 'Une érreur est survenue';
      }
    } catch (e) {
      message = error;
    }
    Utils.error(message);

  }

  cancel() {
    Utils.cancel(this.router, ['/retours']);
  }

  validateData() {
    if (!this.selectedClient.length) {
      throw "Veuillez selectionner le client.";
    }


    for (let line of this.lines) {
      if (!line.produit) {
        throw "Veuillez selectionner un produit.";
      }
      if (!line.price || !line.quantite) {
        throw "Veuillez remplir les champs obligatoires.";
      }
    }
  }

  doConfirm() {
    this.retourService
      .makeRetour(this.prepareVente())
      .subscribe(
        succ => {
          Utils.success(this.router, ["/retours"], "Le retour a bien été ajoutée.")
        },
        error => this.errorOccured(error)
      );
  }
  prepareVente(): any {
    let obj = {} as any;
    obj.id = this.editedVenteId;
    obj.client_id = this.selectedClient[0].id;
    obj.user_id = 10;
    obj.produits = [];
    obj.typeVente = this.typeVente;
    obj.venteId = this.venteId;
    for (let line of this.lines) {
      obj.produits.push({
        id: line.produit[0].id,
        price: line.price,
        quantite: line.quantite,
        remise: line.remise ? line.remise : 0,
        price_recommande: line.produit[0].prixVente,
        casio: line.produit[0].casio || "nouveau"
      });
    }
    return obj;
  }

}
