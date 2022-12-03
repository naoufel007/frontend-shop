import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TokenService } from './token.service';
import { HttpClientService } from 'app/services/http/http-client.service';
import * as conf from "../../../conf";
@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }


  public me(){
    return this.http
    .post(`${conf.API_ROOT}/me`,null)
    .map(d => d.json())
  }

  constructor(private Token: TokenService, private http: HttpClientService) { }

}
