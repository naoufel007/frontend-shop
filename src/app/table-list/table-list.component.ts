import { Component, OnInit,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  @Input()
  title:string = "";
  @Input()
  headers:Array<string>=[];
  @Input()
  data:Array<any>=[];
  @Input()
  emptyMessage = "";

  keyword:string;
  properties:Array<string> = [];
  constructor() { }
  ngOnInit() {
    this.properties = this.data.length != 0 ? Object.getOwnPropertyNames(this.data[0]) : [];
  }

}
