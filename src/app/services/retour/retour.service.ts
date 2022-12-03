import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import * as conf from "../../conf";
import { VenteValidator } from 'app/validators/vente-validator';
import { Utils } from 'app/util';
import { Retour } from 'app/models/Retour.model';
import { RetourMapper } from 'app/mappers/retour-mapper';
import { HttpClientService } from '../http/http-client.service';

@Injectable()
export class RetourService {

  constructor(public http: HttpClientService) { }

  public getRetours(): Observable<Retour[]> {
    return this.http
      .get(conf.API_ROOT + "/retours")
      .map(retours => {
        return retours.json().map(v => RetourMapper.getRetour(v));
      });
  }

  public deleteRetour(v: Retour): Observable<Retour> {
    if (!v || !v.id) {
      throw "Il faut choisir un retour à supprimer";
    }
    return this.http
      .delete(conf.API_ROOT + "/retour/" + v.id)
      .map(v => v.json());
  }

  public getRetourById(id): Observable<Retour> {
    return this.http
      .get(conf.API_ROOT + "/retour/" + id)
      .map(retour => {
        return retour.json().map(v => RetourMapper.getRetour(v));
      });
  }

  public makeRetour(retour: any): Observable<Retour> {
    return this.http
      .post(conf.API_ROOT + "/retour", retour)
      .map(v => v.json());
  }

  public update(vente:any):Observable<Retour>{
    VenteValidator.validate(vente);
    return this.http
            .put(conf.API_ROOT+"/retour",vente)
            .map(
              vente => vente.json(),
              error => this.errorOccured(error)
            );
          ;
  }

  errorOccured(error) {
    console.log(error);
    error = JSON.parse(error._body).message;
    let message = "";
    if (error) {
      message = error
    } else {
      message = 'Une érreur est survenue';
    }
    
    Utils.error(message);
  }
}
