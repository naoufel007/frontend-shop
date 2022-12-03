import { Component, OnInit } from '@angular/core';
import { Charge, ChargesWrapper } from 'app/models/Charge';
import { ChargesService } from 'app/services/charges/charges.service';
import { Utils } from 'app/util';
import { AgencesService } from 'app/services/agences/agences.service';
import { Agence } from 'app/models/Agence.model';

@Component({
  selector: 'charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.scss']
})
export class ChargeComponent implements OnInit {
  chargesWrapper: ChargesWrapper = {} as ChargesWrapper;
  loadingCharges: boolean = true;
  loadingView: boolean = true;
  agences: Agence[] = [];
  constructor(private chargesService: ChargesService, private agenceService: AgencesService) { }

  ngOnInit() {

    this.agenceService
      .getAgences()
      .subscribe(
        agences => {
          this.agences = agences;
          this.loadingView = false;
          this.loadCharges(this.agences[0].id);
        },
        error => {
          this.loadingView = false;
          Utils.error(error)
        }
      );
  }


  loadCharges(agenceId: number) {
    this.loadingCharges = true;
    this.chargesService
      .loadCharges(agenceId)
      .subscribe(
        data => {
          this.chargesWrapper = data;
          this.loadingCharges = false;
        },
        e => {
          Utils.error(e);
          this.loadingCharges = false
        }
      )
  }


  redirect() {
  }








}
