import { Pipe, PipeTransform, keyframes } from '@angular/core';
import { Achat } from 'app/models/Achat.model';

@Pipe({
  name: 'filterAchatsBy'
})
export class AchatsPipe implements PipeTransform {

  transform(achats: Achat[], keyword?: any): any {
    if(!achats){
      return [];
    }

    if(achats && ! keyword){
      return achats;
    }
    
    return achats.filter(achat =>{
      return achat.montant.toString().includes(keyword) 
      || achat.fournisseur.name.toLowerCase().includes(keyword)
     // || achat.produit.name.toLowerCase().includes(keyword)
      || achat.quantite.toString().includes(keyword);
      //|| achat.produit.prixAchat.toString().includes(keyword)
    })
  }

}
