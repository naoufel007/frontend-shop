import { Component, OnInit } from '@angular/core';
import { Produit } from 'app/models/Produit.model';
import { ProduitsService } from 'app/services/produits/produits.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Paginable } from '../behaviors/paginable';
import { Searchable } from '../behaviors/searchable';
import { Subject } from 'rxjs/Subject';
import { ProduitMapper } from '../mappers/produit-mapper';
declare var swal: any;
@Component({
  selector: 'stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.scss']
})
export class StockManagerComponent implements OnInit, Paginable, Searchable {

  produits: Produit[] = [];
  loadingProduits: boolean = false;
  total: number = 0;
  totalAchats: number = 0;
  totalV: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 5;
  pagedArray: Array<Produit> = [];
  searchTerm$ = new Subject<string>();
  isAdmin: boolean = false;
  constructor(private produitService: ProduitsService, private router: Router) { }
  redirect() {
    this.router.navigate(['/produit/new']);
  }
  ngOnInit() {
    this.loadingProduits = true;
    this.isAdmin = localStorage.getItem('role') === 'admin';
    this.hookSearche();
    this.searchTerm$.next("");
    this.produitService.getProducts()
      .subscribe(
        res => {
          this.initProducts(res.produits);
          this.total = res.gain
          this.totalAchats = res.totalAchats
          this.loadingProduits = false;
        },
        err => {
          swal({
            type: 'error',
            title: 'Une érreur est survenue',
          });
          this.loadingProduits = false;
        }
      );
  }
  initProducts(products) {
    this.produits = products;
  }

  pageChanged(event): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pagedArray = this.produits.slice(startItem, endItem);
  }

  hookSearche() {
    this.produitService.search(this.searchTerm$)
      .subscribe(results => {
        this.produits = results.produits.map(produit => ProduitMapper.mapFull(produit));
        this.total = results.gain
        this.pagedArray = this.produits.slice(0, this.itemsPerPage);
      });
  }
  isPaginationDisplayed(): boolean {
    return this.produits && this.produits.length != 0 && this.produits.length > this.itemsPerPage;
  }
  edit(p: Produit) {
    this.router.navigate(['/produit/', p.id, 'edit']);
  }

  show(p: Produit) {
    this.router.navigateByUrl("/detail-produit/" + p.id);
  }



}
