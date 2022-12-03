import { Produit } from "app/models/Produit.model";
import { PQ } from "app/models/Achat.model";
import { Agence } from "app/models/Agence.model";
import { Client } from "app/models/client";
import { VentePaiment } from "./VentePaiment";

export class Vente{
    id:number;
    montant:number;
    gain:number;
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
    total:number = 0;
    paiments:Array<VentePaiment> = [];
}