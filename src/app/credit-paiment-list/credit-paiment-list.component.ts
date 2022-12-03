import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { PaimentsService } from 'app/services/credit/paiments.service';
import { PaimentCredit } from 'app/models/PaimentCredit';
import { Utils } from 'app/util';
import { TokenService } from 'app/modules/auth/services/token.service';
declare var swal: any;
@Component({
  selector: 'credit-paiment-list',
  templateUrl: './credit-paiment-list.component.html',
  styleUrls: ['./credit-paiment-list.component.scss']
})
export class CreditPaimentListComponent implements OnInit {

  paiments: Array<PaimentCredit> = [];
  newPaiment: PaimentCredit = {
    date: new Date(),
    type: 'E'
  } as PaimentCredit;
  loading = false;
  addPaiment: boolean = false;
  availablePaimentTypes = [
    {
      code: "E", label: "Espèces"
    },
    {
      code: "H", label: "Chèque"
    }
  ];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private Token: TokenService,
    private location:Location,
    private paimentService: PaimentsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (+params['id']) {
        this.loading = true;
        let id = +params['id'];
        this.newPaiment.creditId = id;
        this.paimentService.getPaiments(id)
          .subscribe(
            data => this.handleSuccess(data),
            error => this.handleError(error)
          );
      } else {
        alert("error");
      }
    });
  }


  handleSuccess(paiments) {
    this.loading = false;
    this.paiments = paiments;
  }

  handleError(error) {
    this.loading = false;
    console.warn(error);
  }

  showAddPaiment() {
    this.addPaiment = true;
  }

  delete(p: PaimentCredit) {
    swal({
      title: "Êtes-vous sûr de vouloir supprimer ce paiment?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Supprimer',
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.value) {
        swal('Suppression en cours...');
        swal.showLoading();
        this.paimentService.deletePaiment(p.id)
          .subscribe(
            d => {
              swal.close();
              swal({
                type: 'success',
                title: "Paiement supprimé avec succès",
              }).then(() => {
                this.paiments.splice(this.paiments.indexOf(p), 1);
              });
            },
            e => { 
              swal.close(); 
              Utils.errorOccured(e); 
            }
          );
      }
    });
  }

  createPaiment() {
    swal.showLoading()
    try {
      swal('Ajout du paiement en cours.');
      this.paimentService.postPaiment(this.newPaiment)
        .subscribe(
          res => {
            swal({
              type: 'success',
              title: "Paiment ajouté avec succès",
            }).then(() => {
              this.newPaiment.id = res.id;
              this.newPaiment.user = this.Token.getUserName();
              this.paiments.unshift(this.newPaiment);
              this.cancelAddPaiment();
            });
          },
          error => {
            console.log(error)
            Utils.errorOccured(error);
          }
        );
    } catch (e) {
      Utils.error(e);
    }
  }

  cancelAddPaiment() {
    this.addPaiment = false;
    this.newPaiment = {
      date:new Date(),
      creditId : this.newPaiment.creditId
    } as PaimentCredit;
  }

  goBack(){
    this.location.back();
  }

  getType(paiement:PaimentCredit){
    if(paiement.type == 'H'){
      return Utils.paimentTypesMap['H']+"("+paiement.checkNumber+")" || "-"
    }
    return Utils.paimentTypesMap[paiement.type] || "-";
  }
}
