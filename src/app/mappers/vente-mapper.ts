import { Vente } from "app/models/Vente.model";
import { PQ } from "app/models/Achat.model";
import { Produit } from "app/models/Produit.model";
import { Agence } from "app/models/Agence.model";
import { VenteWrapper } from "app/models/VenteWrapper";
import { PaimentMapper } from "./paiment-mapper";

export class VenteMapper {

    public static mapPaginatedVentes(data) : VenteWrapper{

        const wrapper = new VenteWrapper();

        wrapper.ventes = data.ventes.map(VenteMapper.getVente)
        wrapper.currentPage = data.currentPage;
        wrapper.total = data.total;
        wrapper.itemsPerPage = data.itemsPerPage;
        wrapper.displayPagination = data.displayPagination;
        return wrapper;
    }
    
    public static mapLightVente(data): VenteWrapper{
        const wrapper = new VenteWrapper();

        wrapper.ventes = data.ventes.map(VenteMapper.map)
        wrapper.currentPage = data.currentPage;
        wrapper.total = data.total;
        wrapper.itemsPerPage = data.itemsPerPage;
        wrapper.displayPagination = data.displayPagination;
        return wrapper;
    }
    public static getVente(v: any): Vente {
        let vente = new Vente();
        vente.montant = v.montant;
        vente.agence = v.agence;
        vente.client = v.client;
        vente.date = new Date(v.date);
        vente.gain = v.gain
        vente.total = v.montant;
        vente.user = v.user? v.user.name : "";
        vente.id = v.id;
        vente.type = v.type_vente == 0 ? "D" : "G";
        let products = [];
        for (let p of v.produits) {
            let pq = new PQ();
            pq.prix = p.prix;
            pq.quantite = p.quantite;
            let prod = new Produit();
            prod.id = p.id;
            prod.quantite = p.quantite_produit;
            prod.prixVente = p.prix;
            prod.prixVenteCasio = p.prixCasio;
            prod.name = p.nom;
            prod.min = p.min;
            pq.produit = prod;
            pq.remise = p.remise;
            pq.type = p.type;
            products.push(pq);
        }

        vente.produits = products;
        vente.paiments = PaimentMapper.mapVentePaiments(v.paiments);
        return vente;
    }

    public static map(v: any): Vente {
        let vente = new Vente();
        vente.id = v.id;
        vente.gain = v.gain
        vente.client.nom = v.client;
        vente.montant = v.montant;

        vente.date = new Date(v.date);
        return vente;
    }

    public static mapVentes(ventes): Vente[] {
        let listVentes = [];

        for (let vente of ventes) {
            let newVente = new Vente();
            newVente.id = vente.id;
            newVente.user = vente.user.name;
            let a = new Agence();
            a.name = vente.agence.nom;
            a.id = vente.agence.id;
            newVente.agence = a;
            newVente.montant = vente.montant;
            newVente.date = new Date(vente.created_at);
            listVentes.push(newVente);
        }
        return listVentes;
    }
}