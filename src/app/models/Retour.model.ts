import { Produit } from "app/models/Produit.model";
import { PQ } from "app/models/Achat.model";
import { Agence } from "app/models/Agence.model";
import { Client } from "app/models/client";

export class Retour{
    id:number;
    montant:number;
    agence:Agence;
    client:Client = new Client();
    date:Date;
    profil:string;
    commentaire?:string;
    produits:Array<PQ>;
    quantite:number;
    prix:number;
    user:string="";
    type:string;
}