import { Produit } from "app/models/Produit.model";

export class ProduitMapper{
    public static mapForSelection(p:Produit){
        return {
            id:p.id,
            itemName:p.name,
            prixVente:p.prixVente
        }
    }

    public static mapFull(prod:any):Produit{
        let p = new Produit();
       p.id = prod.id;
        p.code = prod.code;
        p.name = prod.nom;
        p.remise = prod.remise;
        p.prixVenteGros = prod.prix_vente_gros
        p.agenceName = prod.agence_nom || "";
        p.casio = prod.casio || "nouveau";
        p.prixAchat = prod.prix_achat;
        p.prixAchatCasio = prod.prix_achat_casio;
        p.prixAchatP = prod.prix_achatP;
        p.prixVente = prod.prix_vente;
        p.prixVenteCasio = prod.prix_vente_casio;
        p.quantite = prod.quantite;
        p.quantiteCasio = prod.quantite_casio;
        p.min = prod.min;
        p.max = prod.max;
        p.pointsD = prod.points_d;
        p.pointsG = prod.points_g;
        p.pourcentageD = prod.pourcentage_d;
        p.pourcentageG = prod.pourcentage_g;

        p.date = new Date(prod.created_at);
       return p;
    }
}