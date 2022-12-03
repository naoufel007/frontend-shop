import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
declare var Chart, $;
@Component({
  selector: 'employees-chart',
  templateUrl: './employees-chart.component.html',
  styleUrls: ['./employees-chart.component.scss']
})
export class EmployeesChartComponent implements OnInit {
  
  @Input()
  data = [];
  @Input()
  labels = [];
  @ViewChild('canvas_box')
  canvas: ElementRef;
  constructor() { }

  ngOnInit() {
    new Chart(this.canvas.nativeElement.getContext('2d'), {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
        labels: this.labels,
        datasets: [{
          backgroundColor: 'rgb(75, 192, 192)',
          barThickness: 6,
          maxBarThickness: 8,
          data: this.data
        }]
      },

      // Configuration options go here
      options: {
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        }
      }
    });
  }

}
