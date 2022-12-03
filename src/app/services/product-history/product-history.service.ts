import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import * as conf from "../../conf";
import { ProductHistory } from 'app/models/ProductHistory';
import { Observable } from 'rxjs/Observable';
import { Produit } from 'app/models/Produit.model';
import { ProductHistoryMapper } from 'app/mappers/product-history-mapper';

@Injectable()
export class ProductHistoryService {

  constructor(private http:HttpClientService) { }

  public getProductHistory(produit: Produit): Observable<ProductHistory>{
    
    return this.http.get(conf.API_ROOT+"/produitHistory/"+produit.id)
      .map(data => ProductHistoryMapper.map(data.json()));
  }

}
