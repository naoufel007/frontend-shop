import { Agence } from "app/models/Agence.model";
import { Credit } from "./Credit";
import { Vente } from "./Vente.model";

export class Client{
    id:string;
    nom:string;
    cin:string;
    credit:number;
    reste: number;
    telephone:any;
    points:number = 0;
    agences:Agence[] = [];
    credits:Credit[] = [];
    ventes:Vente[] = [];
}