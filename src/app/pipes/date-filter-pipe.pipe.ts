import { Pipe, PipeTransform } from '@angular/core';
import { Paiment } from 'app/models/Paiment.model';

@Pipe({
  name: 'between'
})
export class DateFilterPipePipe implements PipeTransform {

  transform(paiments: Paiment[], start: any, end: any): any {
    if (!paiments) {
      return [];
    }

    if (!start && !end) {
      return paiments;
    }
    if (start && !end) {
      return paiments.filter(p => (new Date(p.date)).getTime() >= (new Date(start).getTime()));
    }

    if (!start && end) {
      return paiments.filter(p => (new Date(p.date)).getTime() <= (new Date(end).getTime()));
    }

    if (start && end) {
      return paiments.filter(p => (new Date(p.date)).getTime() >= (new Date(start).getTime()) && (new Date(p.date)).getTime() <= (new Date(end).getTime()));
    }
    return paiments;
  }

}
