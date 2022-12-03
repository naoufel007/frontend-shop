import { Component, OnInit,Input } from '@angular/core';
import { Vente } from 'app/models/Vente.model';

@Component({
  selector: 'agence-ventes',
  templateUrl: './agence-ventes.component.html',
  styleUrls: ['./agence-ventes.component.scss']
})
export class AgenceVentesComponent implements OnInit {

  @Input()
  ventes:Array<Vente> = [];

  @Input()
  loading:boolean =  true;
  constructor() { }

  ngOnInit() {
  }

}
