import { Injectable } from '@angular/core';
import * as conf from "../../conf";
import { Observable } from 'rxjs/Observable';
import { Achat, PQ } from 'app/models/Achat.model';
import { Fournisseur } from 'app/models/Fournisseur.model';
import { Produit } from 'app/models/Produit.model';
import { Agence } from 'app/models/Agence.model';
import { HttpClientService } from '../http/http-client.service';
@Injectable()
export class AchatsService {

  constructor(private http: HttpClientService) { }


  public getAchatById(id): Observable<Achat> {
    return this.http.get(conf.API_ROOT + "/achat/" + id)
      .map(achat => {
        return achat.json().map(achat => {       
          let a = new Achat();
          a.id = achat.id;
          a.date = achat.date;
          a.montant = achat.montant;
          a.quantite = achat.quantite;
          let agence = new Agence();
          agence.id = achat.agence.id;
          agence.name = achat.agence.nom;
          a.agence = agence;
          let produits = [];
          for (let p of achat.produits) {
            let pq = new PQ();
            let produit = new Produit();
            produit.name = p.nom;
            produit.id = p.id;
            produit.max = p.max;
            pq.produit = produit;
            pq.quantite = p.quantite;
            pq.produit.quantite = p.quantite_produit
            pq.prix = p.prix;
            pq.remise = p.remise;
            pq.type = p.type;
            produits.push(pq);
          }
          a.total = achat.montant;
          a.produit = produits;
          let f = new Fournisseur();
          f.name = achat.fournisseur;
          f.id = achat.fournisseur_id;
          a.fournisseur = f;
          a.payments = achat.payments;
          return a;
        });
      });

  }
  public getAchatsForAgence(agenceId: number): Observable<Array<Achat>> {
    return this.http
      .get(conf.API_ROOT + "/achats")
      .map(achats => {
        return achats.json().map(achat => {
          let a = new Achat();
          a.id = achat.id;
          a.date = new Date(achat.date);
          a.montant = achat.montant;
          a.quantite = achat.quantite;
          let agence = new Agence();
          agence.id = achat.agence.id;
          agence.name = achat.agence.nom;
          a.user = achat.user
          a.agence = agence;
          let produits = [];
          for (let p of achat.produits) {
            let pq = new PQ();
            let produit = new Produit();
            produit.name = p.nom;
            pq.produit = produit;
            pq.quantite = p.quantite;
            pq.prix = p.prix;
            pq.remise = p.remise;
            produits.push(pq);
          }
          a.total = achat.montant;
          a.produit = produits;
          let f = new Fournisseur();
          f.name = achat.fournisseur;
          a.fournisseur = f;
          return a;

        });
      });

  }

  public addAchat(a: any): Observable<Achat> {
    return this.http
      .post(conf.API_ROOT + "/achat", a)
      .map(a => a.json());

  }

  public updateAchat(achat: any): Observable<Achat> {
    console.error(achat);
    return this.http.post(conf.API_ROOT + "/updateAchat", achat)
      .map(
        a => a.json()
      );
  }


  delete(achat:Achat){

    return this.http.delete(conf.API_ROOT + "/deleteAchat/"+achat.id)
              .map(a => a.json());

  }


}
