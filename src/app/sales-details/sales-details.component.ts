import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vente } from 'app/models/Vente.model';
declare var jsPDF;
declare var $;
declare var html2canvas;
@Component({
  selector: 'sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.scss']
})
export class SalesDetailsComponent implements OnInit {

  @Input()
  detailedVente: any = {};

  @Output()
  close: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  displayed: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  print() {
    const target = $('#content')[0];
    $("button.to-hide").hide()
    html2canvas(target).then(canvas => {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();

      doc.addImage(img, 'JPEG',0,0, 200, 100);
      doc.save(`Facture-${this.detailedVente.id}.pdf`);
      $("button.to-hide").show()
    });

  }

}
