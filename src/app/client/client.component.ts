import { Component, OnInit } from '@angular/core';
import { Client } from 'app/models/client';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'app/services/client/client.service';
import { AgencesService } from 'app/services/agences/agences.service';
import { Agence } from 'app/models/Agence.model';
declare var swal: any;
@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {


  client: Client = {} as Client;
  agences = [];
  selectedAgences = [];
  editMode: boolean = false;
  loading:boolean = false;
  dropdownSettings = { 
    singleSelection: false, 
    text:"Selectionner des agences",
    searchPlaceholderText:"Recherche",
    noDataLabel: "Aucune agence trouvée",
    selectAllText: "Selectionner tout",
    unSelectAllText: "Deselectionner tout",
    classes:"myclass custom-class"
  }; 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private agenceService: AgencesService) { }

  ngOnInit() {
    this.populateAgences();
    this.route.params.subscribe(params => {
      let id = +params['id'];
      if (id) {
        this.editMode = true;
        try {
          this.loading = true;
          this.clientService.getClientById(id).subscribe(
            client => {this.populateClient(client[0])},
            error => this.errorOccured(error)
          );
        } catch (e) {
          this.loading = false;
          this.errorOccured(e);
        }
      } else {
        this.editMode = false;
      }
    })
  }
  populateClient(client){
    this.client = client;
    this.mapSelectedAgences(this.client.agences);
    this.loading = false
  }
  populateAgences() {
    this.agenceService
      .getAgencesClient()
      .subscribe(
      agences => this.mapAgences(agences),
      error => this.errorOccured(error)
      );
  }

  mapAgences(agences) {
    agences.map(
      agence => this.agences.push({
        itemName: agence.name,
        id: agence.id
      })
    );
  }

  mapSelectedAgences(agences){
    this.selectedAgences = agences.map(agence => {
      return {
        itemName:agence.name,
        id:agence.id
      };
    });
    console.warn(this.selectedAgences);
  }
  errorOccured(error) {
    this.loading = false
    error = JSON.parse(error._body).message;
    let message = "";
    if (error) {
      message = error
    } else {
      message = 'Une érreur est survenue';
    }
    swal({
      type: 'error',
      title: message,
    });
  }
  getTitre() {
    if (this.editMode) {
      return "Modification du client";
    }
    return "Ajout d'un client";
  }

  selectionActionPerformed(agences) {
  }

  cancel() {
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
        this.router.navigate(['/clients']);
      }
    })
  }

  create() {
    try {
      this.clientService
        .create(this.client, this.selectedAgences)
        .subscribe(
        client => this.done(client),
        e => this.errorOccured(e)
        );
    } catch (e) {
      swal({
        type: "error",
        title: e
      });
    }
  }

  update() {
    try {
      this.clientService
        .update(this.client, this.selectedAgences)
        .subscribe(
        client => this.done(client,true),
        e => this.errorOccured(e)
        );
    } catch (e) {
      swal({
        type: "error",
        title: e
      });
    }
  }

  done(client: Client,update?:boolean) {
    let message = !update ? "créé":"mis à jour."
    swal({
      type: 'success',
      title: "Client a été "+message,
    }).then(() => {
      this.router.navigate(["/clients"]);
    });
  }
}
