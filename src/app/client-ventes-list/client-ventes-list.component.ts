import { Component, OnInit,Input } from '@angular/core';
import { Vente } from 'app/models/Vente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'client-ventes-list',
  templateUrl: './client-ventes-list.component.html',
  styleUrls: ['./client-ventes-list.component.scss']
})
export class ClientVentesListComponent implements OnInit {

  @Input()
  ventes:Array<Vente> = [];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  show(vente: Vente){
    this.router.navigateByUrl("/detail-vente/"+vente.id)
  }

}
