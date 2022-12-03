import { Injectable } from '@angular/core';
import * as conf from "../../../conf";
@Injectable()
export class TokenService {
  private iss = {
    login: '/login',
    signup: '/signup'
  };

  constructor() { }

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }
  get() {
    return localStorage.getItem('token');
  }

  getUserName(){
    return localStorage.getItem('username');
  }

  setUserName(username){
    localStorage.setItem('username', username);
  }

  setUserRole(role){
    localStorage.setItem('role', role);
  }
  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.keys(this.iss).map(key=>this.iss[key]).indexOf(payload.iss.substring(payload.iss.lastIndexOf('/'))) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
