import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agence'
})
export class AgencePipe implements PipeTransform {

  transform(values: any, agence_id?: any): any {
    if(! values)
      return [];
    
    if(!agence_id)
      return values;
    return values.filter(v => v.agences.filter(a => a.id == agence_id).length != 0);
  }

}
