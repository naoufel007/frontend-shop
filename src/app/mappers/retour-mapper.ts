import { Vente } from "app/models/Vente.model";
import { PQ } from "app/models/Achat.model";
import { Produit } from "app/models/Produit.model";
import { Agence } from "app/models/Agence.model";
import { Retour } from "app/models/Retour.model";

export class RetourMapper {
    public static getRetour(v: any): Retour {
        let retour = new Retour();
        retour.montant = v.montant;
        retour.agence = v.agence;
        retour.client = v.client;
        retour.date = new Date(v.date.date);
        retour.id = v.id;
        retour.user = v.user ? v.user.name : "";
        retour.type = v.type_vente == 0 ? "D": "G";
        let products = [];
        for (let p of v.produits) {
            let pq = new PQ();
            pq.prix = p.prix;
            pq.quantite = p.quantite;
            let prod = new Produit();
            prod.id = p.id;
            prod.quantite = p.quantite_produit;
            prod.prixVente = p.prix;
            prod.name = p.nom;
            prod.min = p.min;
            pq.produit = prod;
            pq.remise = p.remise;
            pq.type = p.type;
            products.push(pq);
        }

        retour.produits = products;
        return retour;
    }

    public static map(v:any):Retour{
        let retour = new Retour();
        retour.id = v.id;
        retour.client.nom = v.client;
        retour.montant = v.montant;
        retour.date = new Date(v.date.date);
        let agence = new Agence()
        agence.id = v.agence.id,
        agence.name = v.agence.nom;
        retour.agence = agence;
        return retour;
    }
}