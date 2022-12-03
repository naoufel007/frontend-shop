import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { Observable } from 'rxjs/Observable';
import { Login } from '../../models/Login.model';
import * as conf from "../../conf";
import { LoginMapper } from '../../mappers/login-mapper';
@Injectable()
export class LoginHistoryService {

  constructor(private http:HttpClientService) { }

  getLogins():Observable<Login[]>{
    return this.http.get(conf.API_ROOT+"/historique")
                      .map(logins => LoginMapper.mapLogins(logins.json()));
  }

}
