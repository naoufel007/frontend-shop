import { Achat } from "app/models/Achat.model";
import { Paiment } from "app/models/Paiment.model";
import { Produit } from "app/models/Produit.model";
import { Agence } from "app/models/Agence.model";

export class Fournisseur{
    id:string;
    name:string;
    telephone:string;
    reste:number;
    fax:string;
    adresse:string;
    created_at?:Date;
    agences:Array<any>=[];
    achats?:Array<Achat>;
    paiments?:Array<Paiment>;
    produits:Array<Produit>;
}