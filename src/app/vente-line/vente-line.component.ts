import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'vente-line',
  templateUrl: './vente-line.component.html',
  styleUrls: ['./vente-line.component.scss']
})
export class VenteLineComponent implements OnInit, OnChanges {
  @Input()
  produits = [];
  @Input()
  lines = [];
  @Input()
  edit: boolean = false;

  @Input()
  typeVente: string;

  selectedProduit;
  dropdownSettings = {};
  total: String;
  @Output()
  onTotal = new EventEmitter<String>();
  isAdmin = false;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const typeVenteChange: SimpleChange = changes.typeVente;
    if (typeVenteChange) {
      for (const line of this.lines) {
        line.remise = typeVenteChange.currentValue == "G" ? line.produit[0].remise : 0;
        line.price = (typeVenteChange.currentValue != "G") ? line.produit[0].prixVente : line.produit[0].prixVenteGros;
      }
    }
    this.updateTotals();
  }
  ngOnInit() {
    this.isAdmin = localStorage.getItem('role') === 'admin';
    this.dropdownSettings = {
      singleSelection: true,
      text: "Selectionner un produit",
      noDataLabel: "Aucun produit trouvé",
      searchPlaceholderText: "Recherche",
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    if (!this.edit) {
      this.addLine();
    }
  }

  selectionActionPerformed(prod, line) {
    line.price = this.typeVente == "G" ? line.produit[0].prixVenteGros : line.produit[0].prixVente;
    line.remise = this.typeVente == "G" ? line.produit[0].remise : 0;
    line.prixVente = 0;
  }
  removeLine(index) {
    this.lines.splice(index, 1);
    this.updateTotals();
  }
  addLine() {
    this.lines.push([
      {
        produit: {
          itemName: "Nouveau produit",
          id: null,
          casio: "nouveau"
        },
        quantite: 0,
        price: 0,
        remise: 0
      }
    ]);
  }

  setTypeProduit(index, $type) {
    this.lines[index].produit[0].casio = $type;
    if ($type == "casio") {
      this.lines[index].produit[0].prixRecommende = this.lines[index].produit[0].prixVenteCasio;
      if (!this.isAdmin) {
        this.lines[index].produit[0].prixAchat = this.lines[index].produit[0].prixVenteCasio
        this.lines[index].price = this.lines[index].produit[0].prixVenteCasio
      }
    } else {
      this.lines[index].produit[0].prixRecommende = this.lines[index].produit[0].prixVente;
      if (!this.isAdmin) {
        this.lines[index].produit[0].prixAchat = this.lines[index].produit[0].prixVente
        this.lines[index].price = this.lines[index].produit[0].prixVente
      }
    }


  }

  updateTotals() {
    let total = 0;
    let index = 0;
    for (let line of this.lines) {

      let qte = line.quantite || 0;
      let price = line.price || 0;
      let remise = line.remise || 0;
      total += qte * price * (1 - (remise) / 100);
      this.total = total.toFixed(2);
    }
    this.onTotal.emit(this.total);
  }

  getLineTotal(i: number) {
    let price = (this.lines[i].price) || 0;
    
    return this.lines[i].quantite * price * (1 - (this.lines[i].remise || 0) / 100);
  }


  getPrice(index: number) {
    
    console.log(this.lines[index]);
    if (this.typeVente == "G") {
      return this.lines[index].produit[0].prixVenteGros || this.lines[index].produit[0].prixVente;
    }
    return this.lines[index].produit[0].prixRecommende || this.lines[index].produit[0].prixVente;
  }
}

