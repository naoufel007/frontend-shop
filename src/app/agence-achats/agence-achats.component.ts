import { Component, OnInit,Input } from '@angular/core';
import { Achat } from 'app/models/Achat.model';

@Component({
  selector: 'agence-achats',
  templateUrl: './agence-achats.component.html',
  styleUrls: ['./agence-achats.component.scss']
})
export class AgenceAchatsComponent implements OnInit {

  @Input()
  achats:Array<Achat> = [];

  @Input()
  loading:boolean =  true;
  constructor() { }

  ngOnInit() {
  }

}
