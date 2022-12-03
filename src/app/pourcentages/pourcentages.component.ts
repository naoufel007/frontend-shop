import { Component, OnInit, Input } from '@angular/core';
import { Pourcentage } from 'app/models/Pourcentage';
import { Paginable } from 'app/behaviors/paginable';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'pourcentages',
  templateUrl: './pourcentages.component.html',
  styleUrls: ['./pourcentages.component.scss']
})
export class PourcentagesComponent implements OnInit, AfterContentInit,Paginable {

  @Input()
  pourcentages: Pourcentage[] = [];

  @Input()
  editMode: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pagedArray: Array<Pourcentage>;
  maxSize: number = 5;
  
  constructor() { }

  ngOnInit() {
    this.pagedArray = this.pourcentages.slice(0,this.itemsPerPage);
  }

  ngAfterContentInit(){}
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pagedArray = this.pourcentages.slice(startItem, endItem);
  }
  isPaginationDisplayed():boolean{
    return this.pourcentages && this.pourcentages.length != 0 && this.pourcentages.length > this.itemsPerPage;
  }
}
