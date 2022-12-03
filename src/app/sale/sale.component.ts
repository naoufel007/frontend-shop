import { Component, OnInit, Input } from '@angular/core';
import { ProduitsService } from 'app/services/produits/produits.service';
import { SalesService } from 'app/services/sales/sales-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from 'app/util';
import { ClientService } from 'app/services/client/client.service';
import { VentePaiment } from 'app/models/VentePaiment';
declare var swal: any;
@Component({
  selector: 'sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  editMode: boolean = false;

  produits = [];

  lines = [];

  clients = [];


  selectedClient = [];

  editedVenteId;

  typeVente = "G";

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

  total: number = 0;
  paiments: Array<VentePaiment> = [];

  clientDropdownSettings = {
    singleSelection: true,
    text: "Selectionner un client",
    searchPlaceholderText: "Rechercher un client",
    noDataLabel: "Aucun client trouvé",
    enableSearchFilter: true,
    classes: "myclass custom-class"
  };

  isAdmin = false;
  constructor(private produitService: ProduitsService,
    private clientService: ClientService,
    private venteService: SalesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.isAdmin = localStorage.getItem('role') === 'admin';
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
              itemName: p.code+" - "+p.name,
              id: p.id,
              ...p,
              prixVente: p.prixVente,
              prixVenteCasio: p.prixVenteCasio,
              prixRecommende: p.prixVente,
              remise: p.remise
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
                id: client.id,
                credit: client.credit,
                points: client.points
              });
            }
          );
        }
      );
  }
  populateVente(id) {
    // this.loading = true;
    swal.showLoading("Chargement en cours...")
    this.venteService
      .getVenteById(id)
      .subscribe(
        ventes => {
          this.populateTypeVente(ventes[0]);
          this.populateClient(ventes[0].client);
          this.populateLines(ventes[0].produits);
          this.populatePaiments(ventes[0]);
          swal.close();
        }
      );

  }

  populatePaiments(vente) {
    this.paiments = vente.paiments;
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
      return "Modification de la vente.";
    return "Ajout d'une nouvelle vente.";
  }

  update() {
    try {
      this.venteService
        .update(this.prepareVente())
        .subscribe(
          vente => Utils.success(this.router, ["/ventes"], "La vente a bien été modifié"),
          error => Utils.errorOccured(error)
        );
    } catch (e) {
      Utils.error(e);
    };
  }

  confirm() {


    swal({ title: 'Enregistrement en cours...', allowOutsideClick: false });
    swal.showLoading();
    try {
      this.validateData();
      this.doConfirm();

    } catch (e) {
      this.errorOccured(e);
      //swal.close();
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
    Utils.cancel(this.router, ['/ventes']);
  }

   validateData() {
    if (!this.selectedClient.length) {
      throw "Veuillez selectionner le client.";
    }

    for (let line of this.lines) {
      if (!line.produit) {
        throw "Veuillez selectionner un produit.";
      }
      if ( !line.quantite) {
        throw "Veuillez remplir les champs obligatoires.";
      }
    }
  }

  doConfirm() {
    try {
      this.venteService
        .makeVente(this.prepareVente())
        .subscribe(
          succ => {
            Utils.success(this.router, ["/ventes"], "La vente a bien été ajoutée.")
          },
          error => this.errorOccured(error)
        );
    } catch (e) {
      Utils.error(e);
    }
  }
  prepareVente(): any {
    let obj = {} as any;
    obj.id = this.editedVenteId;
    obj.client_id = this.selectedClient[0].id;
    obj.user_id = 10;
    obj.produits = [];
    obj.typeVente = this.typeVente;
    for (let line of this.lines) {
      obj.produits.push({
        id: line.produit[0].id,
        price: line.price,
        quantite: line.quantite,
        remise: line.remise ? line.remise : 0,
        prixVente: line.prixVente,
        price_recommande: line.produit[0].prixVente,
        casio: line.produit[0].casio || "nouveau"
      });
    }
    let total = 0;
    for (let p of this.paiments) {
      total += p.montant;
    }

    obj.paiments = this.paiments;
    return obj;
  }

  catchTotal($total) {
    this.total = $total;
  }

  deletePaiment($paiment) {
    if (this.editedVenteId && $paiment.id) {
      swal({
        title: "Êtes-vous sûr de vouloir supprimer ce paiment?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Supprimer',
        cancelButtonText: "Annuler"
      }).then((result) => {
        if (result.value) {
          this.paiments.splice(this.paiments.indexOf($paiment), 1);
        }
      });
    } else {
      this.paiments.splice(this.paiments.indexOf($paiment), 1);
    }
  }

  handleSuccess(data, paiment) {
    swal.close();
    swal({
      type: 'success',
      title: data.message,
    }).then(() => {
      this.paiments.splice(this.paiments.indexOf(paiment), 1);
    });
  }
}

/*



*/