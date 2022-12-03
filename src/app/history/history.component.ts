import { Component, OnInit } from '@angular/core';
import { LoginHistoryService } from '../services/history/login-history.service';
import { Login } from '../models/Login.model';
import { Utils } from '../util';
import { Paginable } from '../behaviors/paginable';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit,Paginable {
  
  logins:Login[] = [];
  loading:boolean = false;
  currentPage:number = 1;
  itemsPerPage:number = 20;
  pagedArray:Array<any> = [];
  maxSize:number = 5;
  date;
  keyword = "";
  constructor(private historyService:LoginHistoryService) { }

  ngOnInit() {
    this.loading = true;
    this.historyService.getLogins().subscribe(
      logins => this.handleResponse(logins),
      error => this.handleError(error)
    );
  }
  
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pagedArray = this.logins.slice(startItem, endItem);
  }

  isPaginationDisplayed():boolean{
    return this.logins && this.logins.length != 0 && this.logins.length > this.itemsPerPage;
  }
  handleResponse(logins){
    this.loading = false;
    this.logins = logins
    this.pagedArray = this.logins.slice(0, this.itemsPerPage);
  }

  handleError(error){
    this.loading = false;
    Utils.errorOccured(error)
  }

  filterDate($event){
    this.date = $event;
  }
}
