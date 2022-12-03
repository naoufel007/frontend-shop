import {
  Component, OnInit, Input,
  ViewChild, ElementRef,
} from '@angular/core';

declare var Chart, $;
@Component({
  selector: 'io-chart',
  templateUrl: './io-chart.component.html',
  styleUrls: ['./io-chart.component.scss']
})
export class IoChartComponent implements OnInit {

  @Input()
  data = [];

  @Input() id = 1;

  @ViewChild('canvas_box')
  canvas: ElementRef;
  constructor() { }

  ngOnInit() {
    this.draw();
  }


  draw() {
    new Chart(this.canvas.nativeElement.getContext('2d'), {
      // The type of chart we want to create
      type: 'pie',

      // The data for our dataset
      data: {
        labels: ['Achats', 'Ventes', 'Services', 'Retours', 'Charges'],
        datasets: [{
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          //borderColor: 'rgb(100, 99, 200)',
          barThickness: 6,
          maxBarThickness: 8,
          data: this.data
        }]
      },

      // Configuration options go here
      options: {
        // scales: {
        //   yAxes: [{
        //     display: true,
        //     ticks: {
        //       beginAtZero: true
        //     }
        //   }]
        // },
        legend: {
          display: true
        }
      }
    });
  }

}
