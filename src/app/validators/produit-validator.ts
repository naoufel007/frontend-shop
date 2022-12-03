import { Produit } from "app/models/Produit.model";

export class ProduitValidator{
    public static validate(produit:Produit){
        let prefix = "Il faut remplir le champ ";
        if(!produit.name || produit.name.trim() == ""){
            throw prefix+"'nom'";
        }
        if(!produit.code || produit.code.trim() == ""){
            throw prefix+"'code'";
        }

        let boundMessage = "Il faut choisir une valeur valide pour le ";
        if(!produit.min || produit.min == 0){
            throw boundMessage+"'min'";
        }
        
        if(!produit.max || produit.max == 0){
            throw boundMessage+"'max'";
        }
    }
}