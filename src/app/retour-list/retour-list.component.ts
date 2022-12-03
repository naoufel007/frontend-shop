import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vente } from 'app/models/Vente.model';
import { Paginable } from 'app/behaviors/paginable';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';
import { Retour } from 'app/models/Retour.model';
import { Router } from '@angular/router';

@Component({
  selector: 'retour-list',
  templateUrl: './retour-list.component.html',
  styleUrls: ['./retour-list.component.scss']
})
export class RetourListComponent implements OnInit, Paginable {


  @Input()
  retours: Array<Vente> = [];

  @Input()
  loading: boolean = false;

  @Input()
  showActions = true;
  @Output()
  onDelete: EventEmitter<Retour> = new EventEmitter<Retour>();
  @Output()
  onShow: EventEmitter<Retour> = new EventEmitter<Retour>();
  @Output()
  onEdit: EventEmitter<Retour> = new EventEmitter<Retour>();

  currentPage: number = 1;
  itemsPerPage: number = 10;
  pagedArray: Array<Retour>;
  maxSize: number = 5;
  date = new Date();
  keyword = "";
  constructor(private router: Router) { }

  ngOnInit() {
    this.pagedArray = this.retours.slice(0, this.itemsPerPage);
  }


  show(v: Retour) {
    this.router.navigateByUrl("detail-retour/"+v.id);
  }

  edit(v: Retour) {
    this.onEdit.emit(v);
  }

  delete(v: Retour) {
    this.onDelete.emit(v);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pagedArray = this.retours.slice(startItem, endItem);
  }

  isPaginationDisplayed(): boolean {
    return this.retours && this.retours.length != 0 && this.retours.length > this.itemsPerPage;
  }
}
