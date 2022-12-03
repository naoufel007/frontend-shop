export class Charge {
    id: number;
    date: Date;
    montant: number;
    type: TypeCharge;
}


export class ChargesWrapper {
    charges: Charge[] = [];
    totalVentes: number = 0;
    totalAchats: number = 0;
    totalServices: number = 0;
    totalRetours: number = 0;
    capital: number = 0;
}

export enum TypeCharge {

    BANQUE,
    COMMISSION,
    AUTRES
}


export const typesCharge = [
    {
        itemName: "Banque",
        id: 0,
        code: TypeCharge.BANQUE
    },
    {
        itemName: "Commission",
        id: 1,
        code: TypeCharge.COMMISSION
    },
    {
        itemName: "Autres",
        id: 2,
        code: TypeCharge.AUTRES
    }
]