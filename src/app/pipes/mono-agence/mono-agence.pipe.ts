import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monoAgence'
})
export class MonoAgencePipe implements PipeTransform {

  transform(values: any, id?: any): any {
    if(! values)
    return [];
  
  if(!id)
    return values;
  return values.filter(v => v.agence.id == id);

  }

}
