import { Achat } from "app/models/Achat.model";
import { Fournisseur } from "app/models/Fournisseur.model";
import { Agence } from "app/models/Agence.model";

export class AchatMapper{
    public static map(a:any):Achat{
        let achat = new Achat();
        achat.id = a.id;
        achat.fournisseur.name = a.fournisseur
        achat.montant = a.montant;
        achat.date = new Date(a.date.date);
        return achat;
    }

    public static mapAchatFournisseur(data: any):Achat{
        let achat = new Achat();
        achat.id = data.id;
        achat.date = new Date(data.created_at);
        achat.montant = data.montant;
        let agence = new Agence();
        agence.name = data.agence.nom;
        achat.agence = agence;
        achat.user = data.user.name;
        return achat;
    }


}