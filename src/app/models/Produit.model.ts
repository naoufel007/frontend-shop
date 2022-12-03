import { Fournisseur } from "app/models/Fournisseur.model";

export class Produit{  
    id:number;
    code:string = "";
    name:string = "";
    agenceName:string = "";
    prixVente:number;
    remise:number;
    prixVenteCasio:number;
    prixVenteGros: number;
    prixAchat:number;
    prixAchatP:number;
    prixAchatCasio:number;
    quantite:number;
    quantiteCasio:number;
    min:number = 0;
    max:number = 0;
    pointsD:number = 0;// points details
    pointsG:number = 0;// points gros
    pourcentageD:number = 0;// pourcentage detail
    pourcentageG:number = 0;// pourcentage gros
    date:Date;
    fournisseur:Fournisseur = new Fournisseur();
    fournisseurId:number;
    casio:boolean = false;
}