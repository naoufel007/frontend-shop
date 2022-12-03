import { Subject } from "rxjs/Subject";

export interface Searchable{
    searchTerm$: Subject<string>;
    hookSearche();
}