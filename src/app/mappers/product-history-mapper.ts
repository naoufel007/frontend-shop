import { ProductHistory, AchatItem, VenteItem } from "app/models/ProductHistory";

export class ProductHistoryMapper {

    public static map(data: any): ProductHistory {

        const achats = data.achats || [];
        const ventes = data.ventes || [];

        const history = new ProductHistory();
        for (const achat of achats) {
            const achatItem = new AchatItem();
            achatItem.quantiteAchatProduit = achat.quantite_achat_produit;
            achatItem.date = new Date(achat.date);
            achatItem.fournisseur = achat.fournisseur;
            achatItem.prixAchat = achat.prix_achat;
            achatItem.remise = achat.remise
            achatItem.type = achat.type;
            achatItem.user = achat.user;
            history.achats.push(achatItem);
        }
        for (const vente of ventes) {
            const venteItem = new VenteItem();
            venteItem.quantiteVenteProduit = vente.quantite_vente_produit;
            venteItem.date = new Date(vente.date);
            venteItem.client = vente.client;
            venteItem.prixVente = vente.prix_vente;
            venteItem.remise = vente.remise
            venteItem.type = vente.type;
            venteItem.user = vente.user;
            history.ventes.push(venteItem);
        }

        return history;
    }

}