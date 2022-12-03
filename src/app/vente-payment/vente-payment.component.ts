import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VentePaiment } from 'app/models/VentePaiment';
import { Utils } from 'app/util';
import { TokenService } from 'app/modules/auth/services/token.service';

@Component({
  selector: 'vente-payment',
  templateUrl: './vente-payment.component.html',
  styleUrls: ['./vente-payment.component.scss']
})
export class VentePaymentComponent implements OnInit {

  @Input()
  client;

  @Input()
  total: number = 0;
  newPaiment: VentePaiment = {type:"E"} as VentePaiment;
  @Input()
  paiments: Array<VentePaiment> = [];
  @Output()
  onPaiment = new EventEmitter<Array<VentePaiment>>();

  @Output()
  onDelete = new EventEmitter<VentePaiment>();

  addPaimentDisplayed: boolean = false;
  paimentTypesMap = {
    C:"Crédit",
    E:"Espèces",
    P:"Points",
    H:"Chèque"
  }
  availablePaimentTypes = [
    {
      code: "E", label: "Espèces"
    },
    {
      code: "C", label: "Crédit"
    },
    {
      code: "P", label: "Points"
    },
    {
      code: "H", label: "Chèque"
    }

  ];
  constructor(private Token: TokenService) { }

  ngOnInit() {
  }

  submitPaiment() {
    if (this.newPaiment.montant) {
      this.newPaiment.date = new Date();
      this.newPaiment.user = this.Token.getUserName();
      this.paiments.push(this.newPaiment);
      this.onPaiment.emit(this.paiments);
      this.cancelPaiment();
    }else{
      Utils.error("Il faut remplire la valeur.");
    }
  }

  cancelPaiment() {
    this.newPaiment = {} as VentePaiment;
    this.addPaimentDisplayed = false;
  }

  deletePaiment(p:VentePaiment){
    this.onDelete.emit(p);
  }
}
