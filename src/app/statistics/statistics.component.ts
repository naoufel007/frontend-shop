import { Component, OnInit } from '@angular/core';
import { Utils } from 'app/util';
import { Agence } from 'app/models/Agence.model';
import { AgencesService } from 'app/services/agences/agences.service';
import { ChartsService } from 'app/services/charts/charts.service';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  loadingStats: boolean = true;
  loadingView: boolean = true;
  agences: Agence[] = [];

  ioData;//= [8, 10, 15, 12, 6];

  bestSellerProducts;//=[120,340,220,110,890,230,560,760,770,490];
  bestSellerProductsLabels;//=['P1','P2','P3','P4','P5','P6','P7','P8','P9','P10'];

  worstSellerProducts;//=[12,34,22,11,89,23,56,76,77,49];
  worstSellerProductsLabels;//=['P10','P20','P30','P40','P50','P60','P70','P80','P90','P100'];

  employees = [];
  months = Utils.months;
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();
  agenceId = -1;
  constructor(private agenceService: AgencesService, private chartService: ChartsService) { }

  ngOnInit() {

    this.agenceService
      .getAgences()
      .subscribe(
        agences => {
          this.agences = agences;
          this.loadingView = false;
          this.loadStats(this.agences[0].id, this.year, this.month);
        },
        error => {
          this.loadingView = false;
          Utils.error(error)
        }
      );
  }

  filterChanged() {
    if (this.agenceId != -1) {
      this.loadStats(this.agenceId, this.year, this.month)
    }
  }
  loadStats(agenceId, year, month) {
    this.agenceId = agenceId;
    this.loadingStats = true;
    this.chartService
      .loadCharts(agenceId, year, month)
      .subscribe(
        charts => {
          this.ioData = charts.mouvements.data;

          this.bestSellerProducts = charts.produits.plus.data;
          this.bestSellerProductsLabels = charts.produits.plus.labels;

          this.worstSellerProducts = charts.produits.moins.data;
          this.worstSellerProductsLabels = charts.produits.moins.labels;

          this.employees = charts.employees;

          this.loadingStats = false
        }
      );
  }

}
