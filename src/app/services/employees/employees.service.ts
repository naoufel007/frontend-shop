import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as conf from "../../conf";
import { User } from 'app/models/Employee.model';
import { HttpClientService } from '../http/http-client.service';

@Injectable()
export class EmployeesService {

  constructor(private http:HttpClientService) { }

  getUsers():Observable<User[]>{
    return this.http
            .get(conf.API_ROOT+"/clients")
            .map(users => {
              return users.json().map(u =>{
                let e = new User();
                e.id = u.id;
                e.name = u.nom;
                return e;
              });
            });
  }

}
