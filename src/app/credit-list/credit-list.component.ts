import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router'
import { Credit } from 'app/models/Credit';

@Component({
  selector: 'credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent implements OnInit {


  @Input()
  credits:Array<Credit> = [];
  constructor(private router:Router) { 

  }
  show(credit:Credit){
    this.router.navigateByUrl(`/credit/${credit.id}/paiments`);
  }
  ngOnInit() {
  }

}
