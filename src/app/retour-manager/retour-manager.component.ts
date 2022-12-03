import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { SalesService } from 'app/services/sales/sales-service.service';
import { Vente } from 'app/models/Vente.model';
import { Retour } from 'app/models/Retour.model';
import { RetourService } from 'app/services/retour/retour.service';

declare var swal: any;
@Component({
  selector: 'retour-manager',
  templateUrl: './retour-manager.component.html',
  styleUrls: ['./retour-manager.component.scss']
})
export class RetourManagerComponent implements OnInit {

  retours:Array<Retour> = [];
  loading:boolean = false;
  detailedRetour:Vente = null;
  displayDetails:boolean = false;
  constructor(public retourService:RetourService,private router:Router) {
    
   }

  ngOnInit() {
    this.loading = true;
    this.retourService
      .getRetours()
      .subscribe(
        retours => {
          this.retours = retours;
          this.loading = false;
        },
        error  => {
          console.log(error)
          this.loading = false;
          swal({
            type: 'error',
            title: 'Une érreur est survenue',
          });
        }
      );
  }


  show(retour){
    this.detailedRetour = retour;
    this.displayDetails = true;
  }

  edit(retour){
    this.router.navigate(["/retours",retour.id]);
  }

  delete(retour){
    swal({
      title: "Êtes-vous sûr de vouloir supprimer ce retour?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.value) {
        this.doDelete(retour);
      }
    });
  }

  doDelete(retour){
    try{
      this.retourService
          .deleteRetour(retour)
          .subscribe(
            success =>{
              swal({
                type: 'success',
                title: "Le retour a été supprimé",
              }).then(()=>{
                this.ngOnInit();
              });
            },

            error => {
              console.log(error)
              swal({
                type: 'error',
                title: "Une erreur est survenue",
              })
            }
          );
    }catch(e){
      swal({
        type: 'error',
        title: e,
      })
    }
  }

  newRetours(){
    this.router.navigate(["/retours/new"]);
  }



}
