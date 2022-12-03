import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/observable/zip';

import * as conf from "../../conf";
import { User } from 'app/models/Employee.model';
import { UserMapper } from 'app/mappers/employeeMapper';
import { UserValidator } from 'app/validators/user-validator';
import { Commission } from 'app/models/Commissions';
import { CommissionMapper } from 'app/mappers/commission-mapper';
import { Vente } from 'app/models/Vente.model';
import { VenteMapper } from 'app/mappers/vente-mapper';
import { Achat } from 'app/models/Achat.model';
import { AchatMapper } from 'app/mappers/achat-mapper';
import { HttpClientService } from '../http/http-client.service';
import { Utils } from 'app/util';
import { VenteWrapper } from 'app/models/VenteWrapper';
import { zip } from 'rxjs/observable/zip';
import { UserFilter } from 'app/user-filter';

@Injectable()
export class UserService {

  constructor(private http: HttpClientService) { }

  public getUsers(): Observable<User[]> {
    return this.http
      .get(conf.API_ROOT + "/users")
      .map(employees => employees.json().map(
        employee => UserMapper.map(employee)
      ));
  }

  public getUserById(id): Observable<User> {
    return this.http
      .get(conf.API_ROOT + "/user/" + id)
      .map(user => UserMapper.mapSingleUser(user.json()));
  }
  public createUser(user: User): Observable<User> {
    UserValidator.validate(user);
    let data: any = user;
    data.agence_id = user.agence.id;
    return this.http
      .post(conf.API_ROOT + "/user", data)
      .map(user => user.json());
  }

  public updateUser(user: User): Observable<User> {
    UserValidator.validate(user);
    let data: any = user;
    data.agence_id = user.agence.id;
    return this.http
      .put(conf.API_ROOT + "/user", data)
      .map(user => user.json());

  }
  public search(filter$: Observable<UserFilter>) {
    return filter$.debounceTime(150)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));

    ;
  }


  searchEntries(term) {
    return this.http.get(Utils.buildUrl(`${conf.API_ROOT}/users`, term))
      .map(res => res.json());
  }
  public loadCommissions(userId, queryParam?): Observable<Commission[]> {
    
    return this.http
      .get(`${conf.API_ROOT }/user/${userId}/commissions${queryParam ? '?'+queryParam : ''}`)
      .map(
        commissions => commissions.json().map(
          com => CommissionMapper.map(com)
        )
      );

  }

  public loadVentes(userId, page?: number, date?: string): Observable<VenteWrapper> {
    return this.http
      .get(Utils.buildUrl(conf.API_ROOT + "/user/" + userId + "/ventes", { page , date} ))
      .map( ventes => VenteMapper.mapLightVente(ventes.json()) );
  }

  public loadAchats(userId): Observable<Achat[]> {
    return this.http
      .get(conf.API_ROOT + "/user/" + userId + "/achats")
      .map(
        ventes => ventes.json().map(
          v => AchatMapper.map(v)
        )
      );

  }

}
