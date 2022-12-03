import { Injectable } from '@angular/core';
import * as conf from "../../conf";
import { Observable } from 'rxjs/Observable';
import { Client } from 'app/models/client';
import { Agence } from 'app/models/Agence.model';
import { HttpClientService } from '../http/http-client.service';
import { CreditMapper } from 'app/mappers/credit-mapper';
import { VenteMapper } from 'app/mappers/vente-mapper';

@Injectable()
export class ClientService {

  constructor(private http: HttpClientService) { }

  public loadClients(): Observable<Client[]> {
    return this.http
      .get(conf.API_ROOT + "/clients")
      .map(clients => {
        return clients.json().map(client => {
          let c = new Client();
          c.id = client.id;
          c.cin = client.cin;
          c.nom = client.nom;
          c.credit = client.credit;
          c.reste = client.reste;
          c.telephone = client.telephone;
          c.points = client.points;
          c.agences = client.agences.map(agence => {
            let a = new Agence();
            a.id = agence.agence_id;
            a.name = agence.nom;
            return a;
          });
          return c;
        });
      });

  }

  public getClientById(id): Observable<Client> {
    return this.http
      .get(conf.API_ROOT + "/client/" + id)
      .map(
        client => client.json().map(c => this.mapClient(c)),
        error => { throw error; }
      );
  }

  public mapClient(client): Client {
    let c = new Client();
    c.id = client.id;
    c.cin = client.cin;
    c.nom = client.nom;
    c.telephone = client.telephone;
    c.credit = client.credit;
    c.reste = client.reste;
    c.points = client.points;
    c.agences = client.agences.map(agence => {
      let a = new Agence();
      a.id = agence.agence_id;
      a.name = agence.nom;
      return a;
    });
    if (client.credits && client.ventes) {
      c.credits = CreditMapper.map(client.credits);
      c.ventes = VenteMapper.mapVentes(client.ventes);
    }

    return c;
  }
  public deleteClient(c: Client): Observable<Client> {
    if (!c || !c.id)
      throw "Il faut choisir un client à supprimer";

    return this.http
      .delete(conf.API_ROOT + "/client/" + c.id)
      .map(
        client => client.json()
      );
  }

  public create(client: Client, agences: Array<any>): Observable<Client> {
    this.validate(client, agences);
    return this.http.post(conf.API_ROOT + "/client", client).map(c => c.json());

  }

  public update(client: Client, agences: Array<any>) {
    this.validate(client, agences);
    return this.http.put(conf.API_ROOT + "/client", client).map(c => c.json());
  }
  validate(client: Client, agences) {
    let prefix = "Il faut remplir ";
    if (!client.nom || !client.nom.trim())
      throw prefix + "le champ Nom";

    if (!client.cin || !client.cin.trim())
      throw prefix + "le champ CIN";

    if (!client.telephone || !client.telephone.trim())
      throw prefix + "le champ Téléphone";

    if (!agences.length)
      throw "Il faut choisir au moins une agences";
    this.prepareClient(client, agences);
  }
  prepareClient(client: Client, agences) {
    client.agences = [];
    for (let agence of agences) {
      let a = new Agence();
      a.id = agence.id;
      client.agences.push(a);
    }
  }

  public search(terms: Observable<string>) {
    return terms
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }
  searchEntries(term) {
    return this.http.get(conf.API_ROOT + "/clients?keyword=" + encodeURI(term))
      .map(res => res.json());
  }
}
