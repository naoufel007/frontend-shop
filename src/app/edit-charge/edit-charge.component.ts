import { Component, OnInit } from '@angular/core';
import { Charge, typesCharge } from 'app/models/Charge';
import { ActivatedRoute, Router } from '@angular/router';
import { ChargesService } from 'app/services/charges/charges.service';
import { Utils } from 'app/util';

declare var swal;
@Component({
  selector: 'edit-charge',
  templateUrl: './edit-charge.component.html',
  styleUrls: ['./edit-charge.component.scss']
})
export class EditChargeComponent implements OnInit {

  charge: Charge = {} as Charge;
  selectedCharge;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private chargesService: ChargesService) { }

  ngOnInit() {

    this.route.params.subscribe(
      params => {
        let id = +params['chargeId'];
        if (id) {
            this.chargesService
                .fetchCharge(id)
                .subscribe(
                  charge => {
                    this.charge = charge;
                    
                    this.selectedCharge = typesCharge.filter(e => e.itemName === this.charge.type.toString());

                  }
                );
        }
      }
    );

  }


  edit(){
    swal("Chargement en cours...");
    swal.showLoading();
    setTimeout(() => swal.close(), 20000);
    this.chargesService
    .updateCharge(this.charge)
    .subscribe(
      data => {
        swal.close();
        Utils.success(this.router, ["/charges"], "La charge a bien été modifiée.");
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
