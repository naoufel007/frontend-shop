import { Commission } from "app/models/Commissions";

export class CommissionMapper{
    public static map(com):Commission{
        let c = new Commission();
        c.client = com.client || "-";
        c.produit = com.produit || "-";
        c.commission = com.commission;
        c.prixVente = com.prix_vente;
        c.remise = com.remise  || "-";
        c.date = new Date(com.date);
        c.quantite = com.quantite_vente_produit
        return c;
    }
}