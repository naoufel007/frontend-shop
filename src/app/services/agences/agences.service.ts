import { Injectable } from '@angular/core';
import * as conf from "../../conf";
import { Observable } from 'rxjs/Observable';
import { Agence } from 'app/models/Agence.model';
import { Achat } from 'app/models/Achat.model';
import { Fournisseur } from 'app/models/Fournisseur.model';
import { User } from 'app/models/Employee.model';
import { Vente } from 'app/models/Vente.model';
import { HttpClientService } from '../http/http-client.service';

@Injectable()
export class AgencesService {


  constructor(private http: HttpClientService) { }

  public getAgences(date?: Date, date2?: Date): Observable<Array<Agence>> {
    let paramQuery = "";
    if (date) {
      let dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      paramQuery = `?dateFrom=${dateString}`;
    }
    if (date2 && date) {
      let dateString = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
      paramQuery += `&dateTo=${dateString}`;
    }
    return this.http.get(conf.API_ROOT + "/agences"+paramQuery)
      .map(d => {
        return d.json().map(agenceElement => {
          let newAgence = new Agence(); 
          newAgence.id = agenceElement.agence.id;
          newAgence.gain = agenceElement.gain;
          newAgence.name = agenceElement.agence.nom;
          newAgence.users = agenceElement.userList.map(userElement => {
            let e = this.mapUser(userElement);
            newAgence.totalCredit -= -userElement.totalCredit;
            newAgence.totalRetours -= -userElement.totalRetour;
            newAgence.totalServices -= -userElement.totalService;
            return e;
          });
          newAgence.loading = false;
          return newAgence;
        });
      });
  }

  private mapVentes(userElement) {
    return userElement.ventes.map(v => {
      let vente = new Vente();
      vente.date = new Date(v.created_at);
      vente.montant = v.montant;
      vente.user = v.user.name
      vente.client.nom = v.client.nom
      return vente;
    });
  }
  private mapachats(agenceElement: any) {
    return agenceElement.achats.map(achat => {
      let newAchat = new Achat();
      newAchat.id = achat.id;
      newAchat.montant = achat.montant;
      let fournisseur = new Fournisseur();
      fournisseur.id = achat.fournisseur.id;
      fournisseur.name = achat.fournisseur.name;
      newAchat.fournisseur = fournisseur;
      newAchat.user = achat.user.name;
      newAchat.date = new Date(achat.created_at);
      return newAchat;
    });
  }

  private mapUser(userElement: any) {
    let e = new User();
    e.id = userElement.user.id;
    e.role = userElement.user.role;
    e.addresse = userElement.user.addresse;
    e.cin = userElement.user.cin;
    e.telephone = userElement.user.telephone;
    e.name = userElement.user.name;
    e.totalVentes = userElement.totalPrixVente;
    e.totalCredits = userElement.totalCredit;
    e.totalRetours = userElement.totalRetour;
    e.totalService = userElement.totalService;
    return e;
  }

  public getAgencesClient(): Observable<Array<Agence>> {
    return this.http.get(conf.API_ROOT + "/agences")
      .map(d => {
        return d.json().map(agence => {
          let a = new Agence();
          a.id = agence.agence.id
          a.name = agence.agence.nom;
          return a;
        })
      });
  }
  public getAgenceById(id): Observable<Agence> {
    return this.http.get(conf.API_ROOT + "/agences/" + id)
      .map(d => d.json());
  }
}
