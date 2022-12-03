import { Injectable } from '@angular/core';
import { Vente } from 'app/models/Vente.model';
import { Observable } from 'rxjs/Observable';
import { Utils } from 'app/util';
import { ProduitFakerService } from 'app/services/mockup/produits/produit-faker.service';

@Injectable()
export class VenteFakerService {

  constructor(private produitFaker:ProduitFakerService) { }

  public getVentesForAgence(agenceId:number):Observable<Array<Vente>>{
    
    return new Observable<Array<Vente>>(observer =>{
      setTimeout(()=>{
        let ventes = [];
        for(let i = 0;i<30;i++){
          let a = new Vente();
          a.id = Utils.randomInt();
          //a.date = Utils.randomDate();
          //a.produit = this.produitFaker.makeProduit();
          a.quantite = Utils.randomInt();
          a.prix = Utils.randomInt();
          a.montant = a.prix * a.quantite;
          ventes.push(a);
        }
        observer.next(ventes);
      },1000);
    });
  }
  
}
