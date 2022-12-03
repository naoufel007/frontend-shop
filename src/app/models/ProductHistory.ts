export class ProductHistory {

    achats: Array<AchatItem> = [];
    ventes: Array<VenteItem> = [];
}

export class AchatItem {
    quantiteAchatProduit:string = "";
    prixAchat: number;
    remise: number;
    type: string;
    date: Date;
    user: string;
    fournisseur: string
}

export class VenteItem {

    quantiteVenteProduit:number;
    prixVente: number;
    remise: number;
    type: string;
    date: Date;
    user: string;
    client: string
}