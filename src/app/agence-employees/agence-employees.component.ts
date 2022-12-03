import { Component, OnInit ,Input} from '@angular/core';
import { User } from 'app/models/Employee.model';

@Component({
  selector: 'agence-employees',
  templateUrl: './agence-employees.component.html',
  styleUrls: ['./agence-employees.component.scss']
})
export class AgenceEmployeesComponent implements OnInit {

  @Input()
  employees:Array<User> = [];

  @Input()
  loading:boolean =  true;
  constructor() { }

  ngOnInit() {
  }

}
