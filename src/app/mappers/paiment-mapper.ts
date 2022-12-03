import { Paiment } from "app/models/Paiment.model";
import { VentePaiment } from "app/models/VentePaiment";

export class PaimentMapper{

    public static map(data:any):Paiment{
        let paiment = new Paiment();
        paiment.id = data.id;
        paiment.montant = data.montant;
        paiment.date = new Date(data.created_at);
        paiment.user = data.user.name;
        paiment.type = data.type;
        return paiment;
    }

    public static mapVentePaiments(paiments):VentePaiment[]{
        let vps = [];
        if(!paiments){
            return vps;
        }
        for(let paiment of paiments){
            let vp = new VentePaiment();
            vp.id = paiment.id;
            vp.montant = paiment.montant;
            vp.type = paiment.type;
            vp.date = new Date(paiment.created_at);
            vp.user = paiment.user ? paiment.user.name: "";
            vp.checkNumber = paiment.numero_cheque;
            vps.push(vp);
        }
        return vps;
    }
}