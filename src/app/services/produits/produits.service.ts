import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Produit } from 'app/models/Produit.model';
import * as conf from "../../conf";
import { ProduitMapper } from 'app/mappers/produit-mapper';
import { ProduitValidator } from 'app/validators/produit-validator';
import { HttpClientService } from '../http/http-client.service';
@Injectable()
export class ProduitsService {

  constructor(private http:HttpClientService) { }

  public getProducts():Observable<any>{
    return this.http.get(conf.API_ROOT+"/produits").map(d => { 
     return {
       produits: d.json().produits.map(ProduitMapper.mapFull),
       gain:d.json().gain,
       totalAchats: d.json().totalAchats | 0
     };
    });
  }

  public getUserProducts():Observable<Produit[]>{
    return this.http.get(conf.API_ROOT+"/produitsByUser").map(d => { 
     return d.json().map(prod=> ProduitMapper.mapFull(prod));
    });
  }

  public getProduitById(id:number):Observable<Produit>{
    return this.http
                .get(conf.API_ROOT+"/produits/"+id)
                .map(produit => ProduitMapper.mapFull(produit.json())); 
  }
  public createProduit(p:Produit):Observable<Produit>{
    ProduitValidator.validate(p);
    return this.http
                .post(conf.API_ROOT+"/produits",p)
                .map(d=> d.json());
  }

  public updateProduit(p:Produit):Observable<Produit>{
    ProduitValidator.validate(p);
    return this.http
                .post(conf.API_ROOT+"/produit/update",p)
                .map(d=> d.json());
  }
  
  // public delete(p:Produit):Observable<boolean>{
  //   return this.http
  //               .delete(conf.API_ROOT+"/produit/"+p.id)
  //               .map(d => {
  //                 let res = d.json();
  //                 return res.status;
  //               });
  // }

  public search(terms: Observable<string>) {
    return terms
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }
  searchEntries(term) {
    return this.http.get(conf.API_ROOT + "/produits?keyword=" + encodeURI(term))
      .map(res => res.json());
  }
}
