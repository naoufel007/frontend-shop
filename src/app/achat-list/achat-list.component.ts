import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Achat } from 'app/models/Achat.model';
import { Router } from '@angular/router';
import { AchatsService } from 'app/services/achat/achats.service';
import { Paginable } from 'app/behaviors/paginable';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';
import { Utils } from 'app/util';

declare var swal;
@Component({
  selector: 'achat-list',
  templateUrl: './achat-list.component.html',
  styleUrls: ['./achat-list.component.scss']
})
export class AchatListComponent implements OnInit, Paginable {

  @Input()
  achats: Array<Achat> = [];

  @Input()
  loading: boolean = true;

  @Input()
  showActions: boolean = true;

  @Output()
  showTriggered: EventEmitter<Achat> = new EventEmitter<Achat>();


  currentPage: number = 1;
  itemsPerPage: number = 10;
  pagedArray: Array<Achat>;
  maxSize: number = 5;
  date = new Date();
  keyword: string = "";
  paginationTotal = 0;
  isAdmin = false;
  constructor(public achatService: AchatsService, private router: Router) { }

  ngOnInit() {
    this.isAdmin = localStorage.getItem('role') === 'admin';
    this.pagedArray = this.achats.slice(0, this.itemsPerPage);
    this.paginationTotal = this.achats.length;
  }

  show(achat: Achat) {
    this.showTriggered.emit(achat);
  }

  search(event) {
    const filteredAchats = this.achats.filter(achat => achat.fournisseur.name.includes(event));
    this.pagedArray = filteredAchats.slice(0, this.itemsPerPage);
    this.paginationTotal = filteredAchats.length;
  }


  edit(achat: Achat) {
    this.router.navigate(['/achats/', achat.id]);
  }

  delete(achat: Achat) {



    swal({
      title: "Êtes-vous sûr de vouloir supprimer cet achat?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.value) {
        this.achatService.delete(achat)
          .subscribe(
            success => {
              //Utils.success(this.router, ["achats"], );
              swal({
                type: 'success',
                title: "L'achat a bien été supprimé"
            }).then(() => {
                location.reload();
            })
            },
            Utils.errorOccured
          );
      }
    })
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pagedArray = this.achats.slice(startItem, endItem);
  }

  isPaginationDisplayed(): boolean {
    return this.achats && this.achats.length != 0 && this.achats.length > this.itemsPerPage;
  }
}
