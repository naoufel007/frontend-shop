import { Component, OnInit } from '@angular/core';
import { Vente } from 'app/models/Vente.model';
import { SalesService } from 'app/services/sales/sales-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Utils } from 'app/util';
import { PdfGeneratorService } from 'app/services/pdf/pdf-generator.service';
declare var jsPDF;
declare var $;
declare var html2canvas;
@Component({
  selector: 'detail-vente',
  templateUrl: './detail-vente.component.html',
  styleUrls: ['./detail-vente.component.scss']
})
export class DetailVenteComponent implements OnInit {


  vente: Vente;
  loading = true;
  printing = false;
  constructor(
    private venteService: SalesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private pdfService: PdfGeneratorService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.venteService.getVenteById(id)
          .subscribe(
            vente => {
              this.vente = vente[0];
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

  goBack() {
    this.location.back();
  }

  print() {

    this.printing = true;
    return this.pdfService.downloadFactureVente(this.vente.id)
      .map(res => {
        return {
          filename: 'facture vente: ' + this.vente.id + '.pdf',
          data: new Blob([res._body])
        };
      })
      .subscribe(res => {
        var url = window.URL.createObjectURL(res.data);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = res.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      }, e => {
        console.error(e);
        this.printing = false;
      },
        () => {
          console.log('Completed file download.');
          this.printing = false;
        });


  }
}
