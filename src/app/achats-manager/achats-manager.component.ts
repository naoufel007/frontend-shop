import { Component, OnInit } from '@angular/core';
import { Achat } from 'app/models/Achat.model';
import { AchatsService } from 'app/services/achat/achats.service';
import { AchatFakerService } from 'app/services/mockup/achats/achat-faker.service';
import { Agence } from 'app/models/Agence.model';
import { Router} from '@angular/router';
import { AgencesService } from 'app/services/agences/agences.service';

declare var swal: any;
@Component({
  selector: 'achats-manager',
  templateUrl: './achats-manager.component.html',
  styleUrls: ['./achats-manager.component.scss']
})
export class AchatsManagerComponent implements OnInit {

  achats:Array<Achat>  = [];
  agences:Array<Agence> = [];
  loadingAchats:boolean = false;
  detailedAchat:Achat = null;
  constructor(private achatService:AchatsService,
    private router:Router,
    private agenceService:AgencesService) { }

  ngOnInit() {
    this.loadAgences();
  }

  loadAgences(){
    this.agenceService
        .getAgences()
        .subscribe(
          agences => {
            this.agences = agences;
            this.loadAchatsForAgence(this.agences[0].id);
          },
          error => {
            console.log(error)
            swal({
              type: 'error',
              title: 'Une érreur est survenue',
            });

          }
      );
  }

  loadAchatsForAgence(aid){
    this.loadingAchats = true;
    this.achatService
        .getAchatsForAgence(aid)
        .subscribe(
          achats =>{
            this.achats = achats;
            this.loadingAchats = false;
          },
          error =>{
            console.log(error)
            swal({
              type: 'error',
              title: 'Une érreur est survenue',
            });
            this.loadingAchats = false;
          }
        );

  }

  newAchat(){
    this.router.navigate(["/achats/new"]);
  }

  displayAchatDetails(achat:Achat){
    this.router.navigateByUrl("detail-achat/"+achat.id)
  }
}
