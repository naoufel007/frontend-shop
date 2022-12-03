import { Component, OnInit } from '@angular/core';
import { Charge } from 'app/models/Charge';
import { Router, ActivatedRoute } from '@angular/router';
import { ChargesService } from 'app/services/charges/charges.service';
import { Utils } from 'app/util';

declare var swal;

@Component({
  selector: 'new-charge',
  templateUrl: './new-charge.component.html',
  styleUrls: ['./new-charge.component.scss']
})
export class NewChargeComponent implements OnInit {


  charge: Charge = {} as Charge;
  agenceId: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chargesService: ChargesService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        let id = +params['agenceId'];
        if (id) {
            this.agenceId = id;
        }
      }
    );
  }

  create() {
    swal("Chargement en cours...");
    swal.showLoading();
    setTimeout(() => swal.close(), 20000)
    this.chargesService
      .saveCharge(this.charge, this.agenceId)
      .subscribe(
        data => {
          swal.close();
          Utils.success(this.router, ["/charges"], "La charge a bien été ajoutée.");
        },
        error => {
          Utils.errorOccured(error);
        }
      );

  }

  cancel() {
    swal({
      title: 'Êtes-vous sûr de vouloir annuler?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/charges']);
      }
    })
  }

}
