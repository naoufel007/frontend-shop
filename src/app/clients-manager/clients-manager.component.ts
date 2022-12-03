import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Client } from 'app/models/client';
import { ClientService } from 'app/services/client/client.service';
import { Agence } from 'app/models/Agence.model';
import { AgencesService } from 'app/services/agences/agences.service';
import { Subject } from 'rxjs/Subject';
import { Paginable } from '../behaviors/paginable';
import { Searchable } from '../behaviors/searchable';
declare var swal: any;
@Component({
  selector: 'clients-manager',
  templateUrl: './clients-manager.component.html',
  styleUrls: ['./clients-manager.component.scss']
})
export class ClientsManagerComponent implements OnInit, Paginable, Searchable {

  clients: Array<Client> = [];
  agences: Array<Agence> = [];
  loadingClients: boolean = false;
  chosenAgence: string;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 5;
  pagedArray: Array<Client> = [];
  searchTerm$ = new Subject<string>();
  totalCredits = 0;
  constructor(private clientService: ClientService,
    private agenceService: AgencesService,
    private router: Router) { }

  ngOnInit() {
    this.loadingClients = true;
    this.hookSearche();
    this.searchTerm$.next("");
    this.clientService
      .loadClients()
      .subscribe(
        clients => this.populateClients(this.clients = clients),
        error => this.errorOccured(error)
      );
    this.agenceService
      .getAgencesClient()
      .subscribe(
        agences => this.agences = agences,
        error => console.error(error)
      );
  }
  pageChanged(event): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pagedArray = this.clients.slice(startItem, endItem);
  }

  hookSearche() {
    this.clientService.search(this.searchTerm$)
      .subscribe(results => {
        this.clients = results.map(client => this.clientService.mapClient(client));
        this.pagedArray = this.clients.slice(0, this.itemsPerPage);
      });
  }
  isPaginationDisplayed(): boolean {
    return this.clients && this.clients.length != 0 && this.clients.length > this.itemsPerPage;
  }

  populateClients(clients) {
    this.clients = clients;
    this.clients.forEach(client => this.totalCredits += -(-client.reste));
    this.loadingClients = false;
  }

  errorOccured(error) {
    console.error(error);
    swal({
      type: 'error',
      title: 'Une érreur est survenue',
    });
  }
  redirect() {
    this.router.navigate(['/client']);
  }

  show(c: Client) {
    this.router.navigate(["/client", c.id, "show"]);
  }
  edit(c: Client) {
    this.router.navigate(["/client", c.id]);
  }

  remove(c: Client) {
    swal({
      title: "Êtes-vous sûr de vouloir supprimer ce client?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(c)
          .subscribe(
            res => this.clientDeleted(c),
            err => {
              swal({
                type: 'error',
                title: 'Une erreur est survenue.',
              })
            }
          )
      }
    })
  }
  clientDeleted(client) {
    swal({
      type: 'success',
      title: "Client a été supprimé",
    }).then(() => {
      this.chosenAgence = "";
      this.clients.splice(this.clients.indexOf(client), 1);
    });
  }

}
