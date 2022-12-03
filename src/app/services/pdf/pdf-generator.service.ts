import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClientService } from '../http/http-client.service';
import * as conf from "../../conf";
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PdfGeneratorService {

  constructor(private http:HttpClientService) {}

  downloadFactureVente(id:number):Observable<any>{
    return this.http.get(conf.API_ROOT+"/vente/"+id+"/pdf",new Headers())

  }

}
