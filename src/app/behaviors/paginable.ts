export interface Paginable{
    currentPage:number;
    itemsPerPage:number;
    pagedArray:Array<any>;
    maxSize:number;
    pageChanged(event): void ;
    isPaginationDisplayed():boolean;

}