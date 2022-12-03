import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitsService } from 'app/services/produits/produits.service';
import { Produit } from 'app/models/Produit.model';
import { Utils } from 'app/util';
import { ProductHistoryService } from 'app/services/product-history/product-history.service';
import { ProductHistory } from 'app/models/ProductHistory';

@Component({
  selector: 'produit-details',
  templateUrl: './produit-details.component.html',
  styleUrls: ['./produit-details.component.scss']
})
export class ProduitDetailsComponent implements OnInit {

  produit: Produit;
  productHistory: ProductHistory;
  loading: boolean = true;
  constructor(private produitService: ProduitsService, 
    private productHistoryService: ProductHistoryService,
    private router: Router,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
    
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        if (id) {
          this.produitService
            .getProduitById(id)
            .subscribe(
            produit => this.initProduit(produit),
            error => this.error(error)
            );
        } else {
          Utils.showPopup(this.router, "le produit " + id + " n'existe pas.", ["/produits"], "error");
        }
      }
    );
  }

  initProduit(produit) {
    this.produit = produit;
    this.productHistoryService.getProductHistory(produit).subscribe(
      history => {
        this.productHistory = history;
        this.loading = false
      },
      err => {
        Utils.errorOccured(err);
        this.loading = false;
      }
    );
  }

  error(error) {
    this.loading = false;
    Utils.errorOccured(error);
  }

  goBack(){
    this.router.navigateByUrl("/stock");
  }

  edit(){
    this.router.navigateByUrl("/produit/"+this.produit.id+"/edit");
  }
}
