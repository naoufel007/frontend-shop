import { User } from "app/models/Employee.model";
import { Vente } from "app/models/Vente.model";
import { Achat } from "app/models/Achat.model";

export class Agence{
    id:number;
    name:string = "";
    users:Array<User> = [];
    ventes:Array<Vente> = [];
    achats:Array<Achat> = [];
    totalCredit:number = 0;
    totalRetours:number = 0;
    totalServices:number = 0;
    loading:boolean = true;
    gain: number = 0;
}