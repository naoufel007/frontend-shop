import { Agence } from "app/models/Agence.model";
import { Vente } from "app/models/Vente.model";
import { Commission } from "app/models/Commissions";
import { Pourcentage } from "app/models/Pourcentage";
import { Achat } from "app/models/Achat.model";
import { VenteWrapper } from "./VenteWrapper";

export class User{
    id:string;
    role:string;
    name:string = "";
    salaire:number;
    addresse:string  ="";
    cin:string = "";
    nombreVentes:number = 0;
    totalVentes:number = 0;
    totalCommissions:number = 0;
    totalCredits:number = 0;
    totalRetours:number = 0;
    totalService:number = 0;
    telephone:any;
    pourcentageVenteCasio:number = 0;
    pourcentageAchatCasio:number = 0;
    pourcentageService:number = 0;
    agence:Agence = {} as Agence;
    ventes:Vente[] = [];
    venteWrapper: VenteWrapper = {} as VenteWrapper;
    achats:Achat[] = [];
    commissions:Commission[] = [];
    password:string = "";
    //pourcentages:Pourcentage[] = [];

}