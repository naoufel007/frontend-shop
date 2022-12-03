import { Component, OnInit } from '@angular/core';
import { AchatsService } from 'app/services/achat/achats.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Achat } from 'app/models/Achat.model';
import { Utils } from 'app/util';
import { Location } from '@angular/common';

@Component({
  selector: 'detail-achat',
  templateUrl: './detail-achat.component.html',
  styleUrls: [
    //'./detail-achat.component.scss'
  ]
})
export class DetailAchatComponent implements OnInit {


  achat:Achat;
  loading = true;
  constructor(private achatService: AchatsService, 
    private router: Router, 
    private location:Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.params.subscribe(
      params => {
        const achatId = +params['id'];
        this.achatService.getAchatById(achatId)
        .subscribe(
          achat => {
            this.achat = achat[0];
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
