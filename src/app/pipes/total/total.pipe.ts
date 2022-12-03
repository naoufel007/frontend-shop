import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'total'
})
export class TotalPipe implements PipeTransform {

  transform(lines: any, args?: any): any {
    if(!lines)
    return "";

    return lines.reduce(
      (acc,line) => {
        return acc-(-line.price*line.quantite)
      },
      0
    );
  }

}
