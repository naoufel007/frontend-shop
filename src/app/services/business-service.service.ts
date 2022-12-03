import { Injectable } from '@angular/core';
import { HttpClientService } from './http/http-client.service';
import { Observable } from 'rxjs/Observable';
import { BusinessService } from 'app/models/BusinessService';
import * as conf from "../conf";
@Injectable()
export class BusinessServiceService {

  constructor(private http: HttpClientService) { }

  public getBusinessServiceses(): Observable<BusinessService[]>{

    return this.http.get(conf.API_ROOT + "/services")
            .map(services => services.json().map(service => {
              let b = new BusinessService()
              b.id = service.id;
              b.description = service.description;
              b.montant = service.montant;
              b.user = service.user? service.user.name : "" ;
              b.date = new Date(service.created_at);
              return b;
            }));
  }


  public createService(bs: BusinessService){
    if(!bs.description){
      throw "Veuillez remplir la description";
    }
    
    if(!bs.montant){
      throw "Veuillez remplir le montant";
    }

    return this.http.post(conf.API_ROOT+"/service",bs);
  }



  public deleteService(service: BusinessService):Observable<any>{
    return this.http.delete(conf.API_ROOT + "/service/"+service.id);

  }

}
