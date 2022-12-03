import { Component, OnInit, Input, Output } from '@angular/core';
import { Produit } from 'app/models/Produit.model';

@Component({
  selector: 'achat-line',
  templateUrl: './achat-line.component.html',
  styleUrls: ['./achat-line.component.scss']
})
export class AchatLineComponent implements OnInit {
  @Input()
  produits = [];
  @Input()
  lines = [];

  @Input()
  edit: boolean = false;

  selectedProduit;

  dropdownSettings = {};
  constructor() { }

  ngOnInit() {
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
    console.log(this.lines);
  }

  selectionActionPerformed(prod, line) {
    const p = prod as Produit;
    if (p.prixAchatP && p.prixAchatP != 0 && line.produit[0].casio == "nouveau") {
      line.price = p.prixAchatP;
    } else {
      line.price = p.prixAchat;
    }
  }
  removeLine(index) {
    this.lines.splice(index, 1);
  }
  addLine() {
    this.lines.push([
      {
        produit: {
          itemName: "Nouveau produit",
          id: null,
          casio: "nouveau"
        },
        quantite: 1,
        price: 0,
        remise: 7
      }
    ]);
  }

  setTypeProduit(index, $type) {
    this.lines[index].produit[0].casio = $type;
    const p = this.lines[index].produit[0] as Produit;
    const line = this.lines[index];

    if (p.prixAchatP && p.prixAchatP != 0 && line.produit[0].casio == "nouveau") {
      line.price = p.prixAchatP;
    } else if (line.produit[0].casio == "casio") {
      line.price = p.prixAchatCasio;
    } else
      line.price = p.prixAchat;
  }

}

