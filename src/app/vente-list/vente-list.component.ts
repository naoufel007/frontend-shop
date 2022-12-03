import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Vente } from 'app/models/Vente.model';
import { Paginable } from 'app/behaviors/paginable';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';
import { SalesService } from 'app/services/sales/sales-service.service';
import { Utils } from 'app/util';
import { VenteWrapper } from 'app/models/VenteWrapper';
declare var swal;
@Component({
  selector: 'vente-list',
  templateUrl: './vente-list.component.html',
  styleUrls: ['./vente-list.component.scss']
})
export class VenteListComponent implements OnInit, OnChanges {


  @Input()
  ventes: Array<Vente> = [];

  @Input()
  venteWrapper: VenteWrapper = {} as VenteWrapper;

  @Input()
  loading: boolean = false;

  @Input()
  showUser = true;
  @Input()
  showActions = true;
  @Output()
  onShow: EventEmitter<Vente> = new EventEmitter<Vente>();

  @Output()
  onEdit: EventEmitter<Vente> = new EventEmitter<Vente>();

  @Output()
  onPaginate: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onDate: EventEmitter<String> = new EventEmitter<String>();

  currentPage: number = 1;

  maxSize: number = 5;
  date = new Date();

  keyword = "";
  isAdmin = false;
  constructor(private salesService: SalesService) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes", changes)
    this.ventes = this.venteWrapper.ventes
  }

  ngOnInit() {
    this.isAdmin = localStorage.getItem('role') === 'admin';
    this.ventes = this.venteWrapper.ventes;
  }
  show(v: Vente) {
    this.onShow.emit(v);
  }

  edit(v: Vente) {
    this.onEdit.emit(v);
  }

  pageChanged(event: PageChangedEvent): void {
    if (event.page != this.venteWrapper.currentPage) {
      this.onPaginate.emit({ event, date: Utils.computeDateQuery(this.date) });
    }
  }

  isPaginationDisplayed(): boolean {
    return this.venteWrapper.displayPagination;
  }

  canEdit(vente: Vente) {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    return vente.date >= now || this.isAdmin;

  }

  filterByDate(date) {
    this.onDate.emit(Utils.computeDateQuery(date));
    this.date = date;
  }

  delete(vente: Vente) {
    swal.showLoading("Chargement en cours...")
    swal({
      title: "Êtes-vous sûr de vouloir supprimer cette vente?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Supprimer',
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.value) {
        this.salesService.deleteVente(vente.id)
          .subscribe(success => {
            swal({
              type: 'success',
              title: "La vente a bien été supprimée"
            }).then(() => {
              this.ventes.splice(this.ventes.indexOf(vente), 1);
            })
          },
            Utils.errorOccured
          );


      }
    });
  }
}
