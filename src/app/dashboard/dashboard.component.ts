import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Agence } from 'app/models/Agence.model';
import { AgencesService } from 'app/services/agences/agences.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  agences: Array<Agence> = [];
  dateFrom: Date = null;
  dateTo: Date = null;
  constructor(private agenceService: AgencesService) {

  }
  ngOnInit() {
    this.agenceService.getAgences()
      .subscribe(agences => {
        this.agences = agences
      });
  }


  loadAgences() {
    this.agenceService.getAgences(this.dateFrom, this.dateTo)
      .subscribe(agences => {
        this.agences = agences
      });
  }
  dateFilterFrom(date) {
    this.dateFrom = date;
    this.loadAgences();
  }

  dateFilterTo(date) {
    this.dateTo = date;
    this.loadAgences();
  }

}
