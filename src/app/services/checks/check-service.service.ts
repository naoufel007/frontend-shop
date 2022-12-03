import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import * as conf from "../../conf";
import { Observable } from 'rxjs/Observable';
import { CheckWrapper } from 'app/models/CheckWrapper.model';
import { CheckMapper } from 'app/mappers/check-mapper';
import { Utils } from 'app/util';
@Injectable()
export class CheckServiceService {

  constructor(private http: HttpClientService) { }

  getChecksVente(page?: number, checkNbr?: number): Observable<CheckWrapper> {
    return this.getChecks('paymentVenteCheque', page, checkNbr);
  }

  getChecksCredit(page?: number, checkNbr?: number): Observable<CheckWrapper> {
    return this.getChecks('paymentVenteCredit', page, checkNbr);
  }


  getChecks(url:string, page?: number, checkNbr?: number): Observable<CheckWrapper> {
    return this.http
      .get(Utils.buildUrl(`${conf.API_ROOT}/${url}`, { page, checkNumber: checkNbr }))
      .map(result => CheckMapper.mapVentes(result.json()));
  }



}
