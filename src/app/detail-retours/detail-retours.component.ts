import { Component, OnInit } from '@angular/core';
import { Utils } from 'app/util';
import { RetourService } from 'app/services/retour/retour.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Retour } from 'app/models/Retour.model';
@Component({
  selector: 'detail-retours',
  templateUrl: './detail-retours.component.html',
  styleUrls: ['./detail-retours.component.scss']
})
export class DetailRetoursComponent implements OnInit {

    retour: Retour;
    loading = true;
  
    constructor(
      private retourService: RetourService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location) { }
  
    ngOnInit() {
      this.route.params.subscribe(
        params => {
          const id = +params['id'];
          this.retourService.getRetourById(id)
          .subscribe(
            retour => {
              this.retour = retour[0];
              this.loading = false;
            },
            error => {
              Utils.errorOccured(error);
              this.loading = false;
            }
          ) 
        }
      )
    }
  
    goBack(){
      this.location.back();
    }
  
   
}
