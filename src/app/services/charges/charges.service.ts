import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';

import * as conf from "../../conf";
import { Charge, ChargesWrapper } from 'app/models/Charge';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChargesService {

  constructor(private http: HttpClientService) { }


  loadCharges(agenceId: number): Observable<ChargesWrapper> {
    return this.http
      .get(`${conf.API_ROOT}/agences/${agenceId}/charges`)
      .map(
        data => {
          let chargesX = data.json();
          const chargeWrapper = new ChargesWrapper();
          chargeWrapper.charges = [];
          chargesX.charges.map(charge => {
            const dataCharge = new Charge();
            dataCharge.id = charge.id;
            dataCharge.date = new Date();//(charge.date.date);
            dataCharge.montant = charge.montant;
            dataCharge.type = charge.type;
            chargeWrapper.charges.push(dataCharge);
          });
          chargeWrapper.capital = chargesX.capital;
          chargeWrapper.totalAchats = chargesX.achatTotal;
          chargeWrapper.totalVentes = chargesX.venteTotal;
          chargeWrapper.totalRetours = chargesX.retourTotal;
          chargeWrapper.totalServices = chargesX.serviceTotal;
          return chargeWrapper;


        }

      );
  }

  saveCharge(charge: Charge, agenceId: number): Observable<Charge> {
    return this.http
      .post(`${conf.API_ROOT}/agences/${agenceId}/charge`, charge)
      .map(data => data.json());
  }


  fetchCharge(id: number): Observable<Charge> {

    return this.http
      .get(`${conf.API_ROOT}/charge/${id}`)
      .map(data => data.json());
  }

  updateCharge(charge: Charge): Observable<Charge> {
    return this.http
      .put(`${conf.API_ROOT}/charge`, charge)
      .map(data => data.json());
  }

}
