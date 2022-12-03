import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from 'app/modules/auth/services/token.service';
import { AchatPayment } from 'app/models/AchatPayment';
import { Utils } from 'app/util';

@Component({
  selector: 'achat-payment',
  templateUrl: './achat-payment.component.html',
  styleUrls: ['./achat-payment.component.scss']
})
export class AchatPaymentComponent implements OnInit {

  @Input()
  total: number = 0;
  newPaiment: AchatPayment = { type: "E" } as AchatPayment;

  @Input()
  payments: Array<AchatPayment> = [];


  addPaimentDisplayed: boolean = false;

  paimentTypesMap = {
    C: "Crédit",
    E: "Espèces",
    P: "Points",
    H: "Chèque"
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
    if (this.newPaiment.montant && this.newPaiment.type) {
      this.newPaiment.date = new Date();
      this.newPaiment.user = this.Token.getUserName();
      this.payments.push(this.newPaiment);
      this.emptyFields();
    } else {
      Utils.error("Il faut remplire le montant ET le type du paiement.");
    }
  }

  emptyFields() {
    this.newPaiment = {} as AchatPayment;
    this.addPaimentDisplayed = false;
  }

  deletePaiment(p: AchatPayment) {
    this.payments.splice(this.payments.indexOf(p), 1);
  }

}
