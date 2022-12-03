export class AchatPayment{
    id:number;
    montant:number;
    date:Date;
    achatId:number;
    type:string;
    user:string;
    checkNumber?:string;
}