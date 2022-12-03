import { Fournisseur } from "app/models/Fournisseur.model";
import { PaimentMapper } from "./paiment-mapper";
import { AchatMapper } from "./achat-mapper";

export class FournisseurMapper{

    public static map(data:any):Fournisseur{
        let f = new Fournisseur();
       f.id = data.id;
       f.name = data.name;
       f.telephone = data.telephone;
       f.fax = data.fax;
       f.adresse = data.adresse;
       f.agences = data.agences.map(e => e.nom);
       f.achats = data.achats.map(achat => AchatMapper.mapAchatFournisseur(achat));
       f.paiments = data.paiments.map(paiment => PaimentMapper.map(paiment));
       
        return f;
    }
}