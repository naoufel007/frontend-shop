import { User } from "app/models/Employee.model";
import { Agence } from "app/models/Agence.model";
import { Pourcentage } from "app/models/Pourcentage";

export class UserMapper{
    public static map(e:any):User{
        let user = new User();
        user.id = e.id;
        user.name = e.name;
        user.salaire = e.salaire;
        user.addresse = e.addresse;
        user.telephone = e.telephone;
        user.password = e.pass;
        user.cin = e.cin;
        user.totalCommissions = e.commission_sum.length != 0 ? e.commission_sum[0].commission: 0;
        let a = new Agence();
        a.name = e.agence.nom;
        a.id = e.agence.id;
        user.agence = a;
        return user;
    }

    public static mapSingleUser(u):User{
        let user = new User();
        user.id = u.id;
        user.name = u.name;
        user.password = u.pass;
        user.salaire = u.salaire;
        user.addresse = u.addresse;
        user.cin = u.cin;
        user.telephone = u.telephone;
        user.pourcentageAchatCasio = u.p_casio_achat;
        user.pourcentageVenteCasio = u.p_casio_vente;
        user.pourcentageService = u.p_service;
        let a = new Agence();
        a.name = u.agence.nom;
        a.id = u.agence.id;
        user.agence = a;
        return user;
    }
}