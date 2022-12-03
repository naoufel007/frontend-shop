export class VenteValidator {

    public static validate(vente:any){
        let prefix = "Il faut";
        if(!vente.client_id){
            throw prefix + " choisir un client d'abord."
        }

        if(!vente.produits){
            throw prefix + " ajouter un produit au moins."
        }
        for (let line of vente.produits) {
            if (!line.id) {
              throw "Veuillez selectionner un produit.";
            }
            if ( !line.quantite) {
              throw "Veuillez remplir les champs obligatoires.";
            }
          }
    }
}