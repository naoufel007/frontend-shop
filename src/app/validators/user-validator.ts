import { User } from "app/models/Employee.model";

export class UserValidator{
    public static validate(user:User){
        let prefix = "Il faut remplir le champ ";
        if(!user.name || user.name.trim() == ""){
            throw prefix+"'nom'";
        }

        if(!user.cin || user.cin.trim() == ""){
            throw prefix+"'CIN'";
        }

        if(!user.telephone || user.telephone.trim() == ""){
            throw prefix+"'Téléphone'";
        }

        if(!user.agence || !user.agence.id){
            throw "Il faut choisir une agence";
        }

        if(user.pourcentageAchatCasio > 100){
            throw "La valeur du pourcentage d'achat casio doit être inférieure ou égale 100";
        }
        if(user.pourcentageVenteCasio > 100){
            throw "La valeur du pourcentage d'achat casio doit être inférieure ou égale 100";
        }
        if(user.pourcentageService > 100){
            throw "La valeur du pourcentage du service doit être inférieure ou égale 100";
        }
    }
}