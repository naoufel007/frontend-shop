import { Credit } from "app/models/Credit";
import { PaimentCredit } from "app/models/PaimentCredit";

export class CreditMapper {
    public static map(credits: any): Credit[] {

        let newCredits:Array<Credit> = [];
         for (let credit of credits) {
             let newCredit = new Credit();
             newCredit.id = credit.id;
             newCredit.agence = credit.agence.nom;
             newCredit.date = new Date(credit.created_at);
             newCredit.user = credit.user.name;
             newCredit.montant = credit.montant;
             newCredit.reste = credit.reste;
             newCredit.status = credit.statut;
             newCredits.push(newCredit);
         }
        return newCredits;
    }

    public static mapPaiments(credit):PaimentCredit[]{
        let newPaiments = [];
        let paiments = credit.paiments;
        if(!paiments){
            return [];
        }
        for(let paiment of paiments){
            let newPaiment = new PaimentCredit();
            newPaiment.id = paiment.id;
            newPaiment.montant = paiment.montant;
            newPaiment.date = new Date(paiment.created_at);
            newPaiment.user = paiment.user.name
            newPaiment.creditId = credit.id;
            newPaiment.type = credit.type;
            newPaiment.checkNumber = credit.checknumber;
            newPaiments.push(newPaiment);
        }
        return newPaiments;
    }
}