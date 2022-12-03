import { Component, OnInit, Input } from '@angular/core';
import { Charge, ChargesWrapper } from 'app/models/Charge';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'list-charges',
  templateUrl: './list-charges.component.html',
  styleUrls: ['./list-charges.component.scss']
})
export class ListChargesComponent implements OnInit {

  @Input()
  chargesWrapper: ChargesWrapper = {} as ChargesWrapper;
  
  @Input()
  agence:any;
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  show(charge: Charge) {
  }

  edit(charge: Charge) {
    this.router.navigateByUrl(`/edit-charge/${charge.id}`);

  }

  redirect(agenceId: number){
    this.router.navigateByUrl(`/new-charge/${agenceId}`);
  }


}
