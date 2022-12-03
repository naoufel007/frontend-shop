import { Component, OnInit } from '@angular/core';
import { BusinessServiceService } from 'app/services/business-service.service';
import { Utils } from 'app/util';
import { Router } from '@angular/router';

declare var swal: any;
declare var $: any;
@Component({
  selector: 'business-service',
  templateUrl: './business-service.component.html',
  styleUrls: ['./business-service.component.scss']
})
export class BusinessServiceComponent implements OnInit {

  services = [];
  loading:boolean = false;
  constructor( private service: BusinessServiceService, private router:Router) { }

  ngOnInit() {
    this.loading = true;
    this.service.getBusinessServiceses().subscribe(
      services => {
        this.services = services;
        this.loading = false;
      },
      error => {
        Utils.errorOccured(error);
        this.loading = false;
      }
    );
  }

  show(s){
    console.log(s);
    $('.modal').modal({show:true});
  }

  newService(){
    console.log('frjlfrjs')
    this.router.navigateByUrl("new-service");
  }

  delete(s){
    swal({
      title: "Êtes-vous sûr de vouloir supprimer ce service?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.value) {
        this.service.deleteService(s)
          .subscribe(
          res => this.serviceDeleted(s),
          err => Utils.errorOccured(err)
          )
      }
    })

  }


  serviceDeleted(service){
    swal({
      type: 'success',
      title: "Le service a bien été supprimé",
    }).then(()=>{
      this.services.splice(this.services.indexOf(service),1);
    });
  }

}
