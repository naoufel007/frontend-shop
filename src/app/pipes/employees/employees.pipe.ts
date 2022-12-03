import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'app/models/Employee.model';

@Pipe({
  name: 'employeesFilter'
})
export class EmployeesPipe implements PipeTransform {

  transform(employees: User[],value:string): any {
    if(!employees)
      return [];
    if(employees && !value){
      return employees;
    }

    return employees.filter(e => e.name.toLowerCase().includes(value));
    
  }

}
