import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'app/models/BusinessService';
import { Router } from '@angular/router';
import { BusinessServiceService } from 'app/services/business-service.service';
import { Utils } from 'app/util';
declare var swal;
@Component({
  selector: 'new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss']
})
export class NewServiceComponent implements OnInit {


  service: BusinessService = {} as BusinessService;
  constructor(private serviceService: BusinessServiceService, private router:Router) { }

  ngOnInit() {
  }

  crateService(){
    try{
      this.serviceService.createService(this.service)
      .subscribe(
        success => this.router.navigateByUrl("/services"),

        error => Utils.errorOccured(error)
      );
    }catch(ex){
      Utils.error(ex);
    }
  }

  modifierService(){

  }

  cancelService(){
    swal({
      title: 'Êtes-vous sûr de vouloir annuler?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/clients']);
      }
    })
  }

}
