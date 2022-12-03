import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as conf from "../../conf";
import { Vente } from 'app/models/Vente.model';
import { VenteMapper } from 'app/mappers/vente-mapper';
import { VenteValidator } from 'app/validators/vente-validator';
import { Utils } from 'app/util';
import { HttpClientService } from '../http/http-client.service';
import { VentePaiment } from 'app/models/VentePaiment';
import { VenteWrapper } from 'app/models/VenteWrapper';
@Injectable()
export class SalesService {

  constructor(public http: HttpClientService) { }

  public getVentes(page?: number, date?: string): Observable<VenteWrapper> {
    return this.http
      .get(Utils.buildUrl(conf.API_ROOT + `/ventes`, { page , date} ))
      .map(ventes => VenteMapper.mapPaginatedVentes(ventes.json()));
  }

   
  public getVenteById(id): Observable<Vente> {
    return this.http
      .get(conf.API_ROOT + "/vente/" + id)
      .map(Vente => {
        console.log("vennte", Vente.json())
        return Vente.json().map(v => VenteMapper.getVente(v));
      });
  }
  

  public makeVente(vente: any): Observable<Vente> {
    return this.http
      .post(conf.API_ROOT + "/vente", vente)
      .map(v => v.json());
  }

  public update(vente:any):Observable<Vente>{
    VenteValidator.validate(vente);
    return this.http
            .put(conf.API_ROOT+"/vente",vente)
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

  public deleteVente(venteId: number){
    return this.http
                .delete(conf.API_ROOT+"/vente/"+venteId)
                .map(d => d.json());
  }

  public deletePaiment(venteId:number,paiment:VentePaiment):Observable<any>{
    return this.http.delete(conf.API_ROOT+"/vente/"+venteId+"/paiments/"+paiment.id).map(d => d.json());
  }
}
