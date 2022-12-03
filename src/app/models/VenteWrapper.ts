import { Vente } from "app/models/Vente.model";
export class VenteWrapper{

    ventes: Vente[] = [];
    total:number;
    currentPage:number;
    itemsPerPage:number;
    displayPagination: boolean = false;
}