import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from 'app/services/sales/sales-service.service';
import { Vente } from 'app/models/Vente.model';
import { VenteWrapper } from 'app/models/VenteWrapper';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';

declare var swal: any;
@Component({
  selector: 'sales-manager',
  templateUrl: './sales-manager.component.html',
  styleUrls: ['./sales-manager.component.scss']
})
export class SalesManagerComponent implements OnInit {

  venteWrapper: VenteWrapper
  loading: boolean = false;
  detailedVente: Vente = null;
  displayDetails: boolean = false;
  constructor(public venteService: SalesService, private router: Router) {

  }

  ngOnInit() {
    this.loading = true;
    this.venteService
      .getVentes()
      .subscribe(
        wrapper => {
          this.venteWrapper = wrapper;
          this.loading = false;
        },
        error => {
          console.log(error)
          this.loading = false;
          swal({
            type: 'error',
            title: 'Une érreur est survenue',
          });
        }
      );
  }


  show(vente) {
    //this.detailedVente = vente;
    this.router.navigateByUrl("detail-vente/"+vente.id);
    this.displayDetails = true;
  }

  edit(vente) {
    this.router.navigate(["/ventes", vente.id]);
  }

  newVentes() {
    this.router.navigate(["/ventes/new"]);
  }



  filterDate($dateQuery) {
    let observable;
    if ($dateQuery) {
      observable =  this.venteService
      .getVentes( null, $dateQuery)
        
    }else{
      observable =  this.venteService
      .getVentes()
    }
  
    observable.subscribe(
      wrapper => {
        this.venteWrapper = wrapper;
        //this.loading = false;
      },
      error => {
        console.log(error)
        //this.loading = false;
        swal({
          type: 'error',
          title: 'Une érreur est survenue',
        });
      }
    );
  }
  paginate($event: any){
    // console.log("fetching page:",$event.page)
    //this.loading = true;
    this.venteService
      .getVentes($event.event.page,$event.date)
      .subscribe(
        wrapper => {
          this.venteWrapper = wrapper;
          //this.loading = false;
        },
        error => {
          console.log(error)
          //this.loading = false;
          swal({
            type: 'error',
            title: 'Une érreur est survenue',
          });
        }
      );
  }


}
