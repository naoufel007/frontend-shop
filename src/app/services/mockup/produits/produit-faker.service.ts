import { Injectable } from '@angular/core';
import { Produit } from 'app/models/Produit.model';
import { Utils } from 'app/util';

@Injectable()
export class ProduitFakerService {

  constructor() { }

  public makeProduit():Produit{
    let p = new Produit();
    p.code = Utils.randomInt()+"";
    p.id = Utils.randomInt();
    p.date = Utils.randomDate();
    //this.fournisseurFaker.getFournisseurById(0).subscribe(f => p.fournisseur = f);
    p.prixAchat = Utils.randomInt();
    p.prixVente = Utils.randomInt();
    p.name = Utils.randomString()  + "  "+ Utils.randomString();
    return p;
  }
}
