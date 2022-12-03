import { Login } from "../models/Login.model";

export class LoginMapper{
    public static mapLogins(input):Login[]{
        console.warn(input);
        let logins = [];
        for(let item of input){
            let login = new Login();
            login.id = item.id;
            login.username = item.username;
            login.agence = item.agence;
            login.type = item.type || "";
            login.date = new Date(item.date.date);
            logins.push(login);
        }
        return logins;
    }
}