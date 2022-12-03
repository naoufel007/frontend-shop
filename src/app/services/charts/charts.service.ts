import { Injectable } from '@angular/core';
import * as conf from "../../conf";
import { HttpClientService } from '../http/http-client.service';

@Injectable()
export class ChartsService {

  constructor(private http: HttpClientService) { }

  loadCharts(agenceId, year, month) {
    return this.http
      .get(`${conf.API_ROOT}/statistiques/${agenceId}/${month}/${year}`)
      //.get("http://www.mocky.io/v2/5e026b9d2f0000b9b3dcd639")
      .map(response => response.json());
  }


}
