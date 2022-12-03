import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class DatePipe implements PipeTransform {

  transform(values: any, args?: any): any {
    if(!values){
      return [];
    }

    if(!args){
      return values;
    }
    return values.filter(value => this.checkValue(value.date,args));
  }

  checkValue(date1,date2){
    date1.setHours(0,0,0,0);
    date2.setHours(0,0,0,0);
    return date1.getTime() == date2.getTime();
  }

  keepDate(date:Date):Date{
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    let newDate = new Date(month+"/"+day+"/"+year);
    return newDate;
  }

}
