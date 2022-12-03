import { Injectable } from '@angular/core';
import { Fournisseur } from 'app/models/Fournisseur.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as conf from "../conf";
import { Agence } from 'app/models/Agence.model';
import { HttpClientService } from './http/http-client.service';
import { FournisseurMapper } from 'app/mappers/fournisseur-mapper';
import { Paiment } from 'app/models/Paiment.model';
import { PaimentMapper } from 'app/mappers/paiment-mapper';

@Injectable()
export class FournisseurService {

  constructor(private http:HttpClientService) { }

  public getFournisseurs():Observable<Array<Fournisseur>>{
    
    return this.http.get(conf.API_ROOT+"/fournisseurs")
        .map(d => {
          return d.json().map(fournisseur =>{
            let f = new Fournisseur();
            f.name = fournisseur.name;
            f.id = fournisseur.id;
            f.fax = fournisseur.fax;
            f.telephone = fournisseur.telephone;
            f.created_at = fournisseur.created_at;
            f.adresse = fournisseur.adresse
            f.reste = fournisseur.reste;
            f.agences = fournisseur.agences.map(agence =>{
              let a = new Agence();
              a.id = agence.agence_id;
              a.name = agence.nom;
              return a;
            });
            
            return f;
          });
        });
  }
  public getFournisseur(id):Observable<Fournisseur>{
    return this.http.get(conf.API_ROOT+"/fournisseurs/"+id)
      .map(d => FournisseurMapper.map(d.json()));
  }
  public createFournisseur(newF:Fournisseur):Observable<Fournisseur>{
    return this.http.post(conf.API_ROOT+"/fournisseurs",newF)
                .map(d => d.json());   
  }

  public deleteFournisseur(f:Fournisseur):Observable<Fournisseur>{
    return this.http.delete(conf.API_ROOT+"/fournisseur/"+f.id)
            .map(d => d.json());
  }

  public updateFournisseur(f:Fournisseur):Observable<Fournisseur>{
    return this.http.post(conf.API_ROOT+"/fournisseur/update/",f)
            .map(d => d.json());
  }

  public deletePaiment(paiment:Paiment,fournisseur:Fournisseur):Observable<boolean>{
    return this.http.delete(conf.API_ROOT+"/fournisseur/"+fournisseur.id+"/paiments/"+paiment.id)
    .map(d => d.json());
  }

  public addPaiment(fournisseur:Fournisseur,paiment:Paiment):Observable<Paiment>{
    if (!paiment.montant)
      throw "Il faut saisir un montant";
    
      return this.http.post(conf.API_ROOT+"/fournisseur/"+fournisseur.id+"/paiments",paiment)
            .map(d => PaimentMapper.map(d.json()));
  }
}
