import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fournisseur } from 'app/models/Fournisseur.model';
import { FournisseurService } from 'app/services/fournisseur.service';
import { SumPipe } from 'app/pipes/sum/sum-pipe.pipe';
import { Paiment } from 'app/models/Paiment.model';

declare const swal: any;
declare var jsPDF;
declare var $;
declare var html2canvas;
@Component({
  selector: 'app-details-fournisseur',
  templateUrl: './details-fournisseur.component.html',
  styleUrls: ['./details-fournisseur.component.scss']
})
export class DetailsFournisseurComponent implements OnInit {

  fournisseur:Fournisseur;

  minDate: Date;
  maxDate: Date;

  
  availablePaimentTypes = ["AVANCE","PAIMENT"];

  sumPipe:SumPipe = new SumPipe();
  selectedRange:string;
  sumPaiments:number;
  sumAchats:number;
  addPaimentDisplayed:boolean = false;
  newPaiment:Paiment = {type:"PAIMENT"} as Paiment;
  constructor(private route:ActivatedRoute,private router: Router,
    private fournisseurService:FournisseurService) {
  }

  ngOnInit() {
    
    this.route.params.subscribe(params =>{
      this.fournisseurService.getFournisseur(+params['id']).subscribe(f =>{
        if(f){
          this.fournisseur = f;
          this.sumPaiments = this.sumPipe.transform(this.fournisseur.paiments,'montant');
          this.sumAchats = this.sumPipe.transform(this.fournisseur.achats,'montant');
        }
      });
    });
  }

  setDates(dates,target){
      this.minDate = dates[0];
      this.maxDate = dates[1];
  }


  deletePaiment(paiment:Paiment){ 

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
        this.fournisseurService.deletePaiment(paiment,this.fournisseur)
        .subscribe(
          d => this.handleSuccess(d,paiment),
          e => this.handleError(e)
        );
      }
    });



   
  }

  handleSuccess(data,p:Paiment){
    swal.close();
    swal({
      type: 'success',
      title: data.message,
    }).then(()=>{
      this.fournisseur.paiments.splice(this.fournisseur.paiments.indexOf(p),1);
      this.sumPaiments = this.sumPipe.transform(this.fournisseur.paiments,'montant');
    });

  }
  handleError(data){
    swal.close();
    swal({
      type: 'error',
      title: JSON.parse(data._body),
    })
  }

  submitPaiment(){
    try{
      this.fournisseurService.addPaiment(this.fournisseur,this.newPaiment)
      .subscribe(
        data => this.handlePaimentCreationSuccess(data),
        error => this.handleError(error)
      )
    }catch(e){
      swal({
        type: 'error',
        title: e
      })
    }
  }

  cancelPaiment(){
    this.addPaimentDisplayed = false;
  }

  handlePaimentCreationSuccess(data){
    swal({
      type: 'success',
      title: "Paiment ajouté avec succés",
    }).then(()=>{
      this.fournisseur.paiments.unshift(data);
      this.sumPaiments = this.sumPipe.transform(this.fournisseur.paiments,'montant');
      this.addPaimentDisplayed = false;
      this.newPaiment = {} as Paiment;
    });
    
  }

  print() {
    const target = $('#content')[0];
    $(".to-hide").hide()
    html2canvas(target).then(canvas => {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();

      doc.addImage(img, 'JPEG',0,0, 200, 85);
      doc.save(`Facture-12.pdf`);
      $(".to-hide").show()
    });

  }

  show(achat){
    this.router.navigateByUrl("/detail-achat/"+achat.id);
  }
}
