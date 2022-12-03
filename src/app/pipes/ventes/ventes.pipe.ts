import { Pipe, PipeTransform } from '@angular/core';
import { Vente } from 'app/models/Vente.model';

@Pipe({
  name: 'filterventesBy'
})
export class VentesPipe implements PipeTransform {

  transform(ventes:Vente[], keyword?: any): any {
    if(!ventes)
      return [];
    
    if(! keyword)
      return ventes;
      
    
    return ventes.filter(v =>{
      return v.montant.toString().includes(keyword)
      || v.prix.toString().includes(keyword)
      || v.quantite.toString().includes(keyword);
    });
  }

}
