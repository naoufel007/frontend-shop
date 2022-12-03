import { Component, OnInit } from '@angular/core';
import { Client } from 'app/models/client';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'app/services/client/client.service';
declare var swal: any;

@Component({
  selector: 'client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  client:Client = {} as Client;
  loading:false;
  constructor(
    private clientService:ClientService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      if(id){
        this.loadClient(id);
      }
    });
  }

  loadClient(id){
    this.clientService.getClientById(id).subscribe(
      client => {this.populateClient(client[0])},
      error => this.errorOccured(error)
    );
  }

  populateClient(client){
    this.client = client;
    // this.mapSelectedAgences(this.client.agences);
    this.loading = false
  }
  goBack(){
    this.router.navigate(["/clients"]);
  }
  errorOccured(error) {
    console.log(error);
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


  printAgences(){
    if(this.client){
      let agences:string = "";
      this.client.agences.forEach(agence => agences += agence.name+", ");
      return agences.slice(0,-2);
    }

    return "";
  }
}
