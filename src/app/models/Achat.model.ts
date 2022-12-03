import { Produit } from "./Produit.model";
import { Fournisseur } from "app/models/Fournisseur.model";
import { Agence } from "app/models/Agence.model";
import { AchatPayment } from "./AchatPayment";

export class Achat{
    id:string;
    montant:number;
    fournisseur:Fournisseur = new Fournisseur();
    payments:Array<AchatPayment> = [];
    date:Date;
    user:string;
    commentaire?:string;
    produit:Array<PQ>;
    quantite:number;
    agence:Agence;
    total:number = 0;
}

export class PQ{
    produit:Produit;
    quantite:number;
    prix:number;
    remise:number;
    type:string="nouveau"
}