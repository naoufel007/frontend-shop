import { Check } from "app/models/Check.model";
export class CheckWrapper{
    checks: Check[] = [];
    total:number;
    currentPage:number;
    itemsPerPage:number;
    displayPagination: boolean = false;
}