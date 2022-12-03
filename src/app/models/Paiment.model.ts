export class Paiment{
    id:string;
    fournisseur_id:number;
    user:string;
    montant:number;
    commentaire?:string;
    type:string;
    date:Date;
}

export enum PaimentEnum{
    AVANCE,PAIMENT
}