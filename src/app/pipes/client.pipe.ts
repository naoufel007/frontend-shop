import { Pipe, PipeTransform } from '@angular/core';
import { Client } from 'app/models/client';

@Pipe({
  name: 'client'
})
export class ClientPipe implements PipeTransform {

  transform(items: Client[], value: any): any {
    if (!items) {
      return [];
    }
    if (!value)
      return items;

    
    return items.filter(singleItem => this.getSelectedItem(singleItem,value));
  }

  getSelectedItem(singleItem:Client,value:string){
    return singleItem.nom.toLowerCase().includes(value.toLowerCase())
        ||  singleItem.cin.toLowerCase().includes(value.toLowerCase())
}

}
