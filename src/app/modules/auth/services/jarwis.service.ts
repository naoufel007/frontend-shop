import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as conf from "../../../conf";
import { HttpClientService } from 'app/services/http/http-client.service';
@Injectable()
export class JarwisService {
  private baseUrl = conf.API_ROOT;

  constructor(private http: HttpClientService, private http2: HttpClient) { }


  login(data) {
    return this.http2.post(`${this.baseUrl}/login`, data)
  }
  logout() {
    return this.http.post(`${this.baseUrl}/logout`,{});
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }
  
  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }

}
