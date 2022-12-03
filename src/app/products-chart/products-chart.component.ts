import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

declare var Chart, $;
@Component({
  selector: 'products-chart',
  templateUrl: './products-chart.component.html',
  styleUrls: ['./products-chart.component.scss']
})
export class ProductsChartComponent implements OnInit {

  @Input()
  data = [];
  @Input()
  labels = [];

  @Input()
  title;

  @Input()
  id;

  @Input()
  type = "default";

  @Input()
  color = 'rgb(54, 162, 235)';

  @ViewChild('canvas_box')
  canvas: ElementRef;

  constructor() { 
  }

  ngOnInit() {
    new Chart(this.canvas.nativeElement.getContext('2d'), {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
        labels: this.labels,
        datasets: [{
          backgroundColor: this.color,
          //borderColor: 'rgb(100, 99, 200)',
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
