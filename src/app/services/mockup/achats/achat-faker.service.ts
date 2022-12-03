import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Achat } from 'app/models/Achat.model';
import { Utils } from 'app/util';
import { ProduitFakerService } from 'app/services/mockup/produits/produit-faker.service';

@Injectable()
export class AchatFakerService {

  constructor(private produitFaker:ProduitFakerService) { }

  public getAchatsForAgence(agenceId:number):Observable<Array<Achat>>{
    return new Observable<Array<Achat>>(observer =>{
      setTimeout(()=>{
        let achats = [];
        for(let i = 0;i<10;i++){
          let a = new Achat();
          a.id = Utils.randomInt()+"";
          a.date = Utils.randomDate();
          
          a.montant = Utils.randomInt();
          //a.produit = this.produitFaker.makeProduit();
          a.quantite = Utils.randomInt();
          achats.push(a);
        }
        observer.next(achats);
      },2500);
    });
  }
}
