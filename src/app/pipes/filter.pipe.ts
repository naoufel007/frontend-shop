import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Fournisseur } from 'app/models/Fournisseur.model';

@Pipe({
    name: 'filter',
    pure: false
})

@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: Fournisseur[],  value: string): any[] {
        if (!items) {
            return [];
        }
        if(!value)
            return items;
        return items.filter(singleItem => this.getSelectedItem(singleItem,value));
    }

    getSelectedItem(singleItem:Fournisseur,value:string){
        return singleItem.name.toLowerCase().includes(value.toLowerCase())
            ||  singleItem.adresse.toLowerCase().includes(value.toLowerCase())
            ||  singleItem.fax.toLowerCase().includes(value.toLowerCase())
            ||  singleItem.telephone.toLowerCase().includes(value.toLowerCase())
    }
}