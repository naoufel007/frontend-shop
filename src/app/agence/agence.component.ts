import { Component, OnInit,Input } from '@angular/core';
import { Agence } from 'app/models/Agence.model';
import { SumPipe } from 'app/pipes/sum/sum-pipe.pipe';

@Component({
  selector: 'agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss']
})
export class AgenceComponent implements OnInit {

  @Input()
  agence:Agence = new Agence();
  howMuchToPay:number;
  sumPipe:SumPipe = new SumPipe();
  constructor() { }

  ngOnInit() {
    let ventes = this.sumPipe.transform(this.agence.ventes,'montant')
    this.howMuchToPay = ventes -(- this.agence.totalCredit) -(-this.agence.totalServices) - this.agence.totalRetours;
  }

}
