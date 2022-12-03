import { Injectable } from '@angular/core';
import { PaimentCredit } from 'app/models/PaimentCredit';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../http/http-client.service';
import * as conf from "../../conf";
import { CreditMapper } from 'app/mappers/credit-mapper';
@Injectable()
export class PaimentsService {

  constructor(private http:HttpClientService) { }

  public getPaiments(creditId):Observable<PaimentCredit[]>{
    return this.http.get(conf.API_ROOT+`/historiqueCredit/${creditId}`)
              .map(credit => CreditMapper.mapPaiments(credit.json()));
  }

  public deletePaiment(id):Observable<PaimentCredit>{
    return this.http.delete(conf.API_ROOT+`/historiqueCredit/${id}`)
      .map(res => res.json());
  }

  public postPaiment(p:PaimentCredit):Observable<PaimentCredit>{
    if(!p.montant){
      throw "Il faut saisir un montant";
    }

    if(!p.creditId){
      throw "Il faut tout d'abord choisir un credit";
    }

    if(p.type == 'H' && ! p.checkNumber){
      throw "Il faut saisir le numéro de chéque";
    }

    return this.http.post(conf.API_ROOT+`/historiqueCredit`,p)
      .map(res => res.json());
  }

}
