import { PaimentEnum } from "app/models/Paiment.model";
declare var swal: any;

export class Utils {

    public static paimentTypesMap = {
        C:"Crédit",
        E:"Espèces",
        P:"Points",
        H:"Chèque"
      }

    public static computeDateQuery(date: Date): String {
        return date ? date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() : null;
      }
    public static buildUrl(url, parameters){
        var qs = "";
        for(var key in parameters) {
          if(parameters[key]){
            var value = parameters[key];
            qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
          }
        }
        if (qs.length > 0){
          qs = qs.substring(0, qs.length-1); //chop off last "&"
          url = url + "?" + qs;
        }
        return url;
      }
    public static months = [
        { nom: "Janvier", code: 1 },
        { nom: "Février", code: 2 },
        { nom: "Mars", code: 3 },
        { nom: "Avril", code: 4 },
        { nom: "Mai", code: 5 },
        { nom: "Juin", code: 6 },
        { nom: "Juillet", code: 7 },
        { nom: "Aout", code: 8 },
        { nom: "Septembre", code: 9 },
        { nom: "Octobre", code: 10 },
        { nom: "Novembre", code: 11 },
        { nom: "Decembre", code: 12 },
    ];

    public static randomDate(): Date {
        return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))
    }

    public static randomInt(): number {
        return Math.ceil(Math.random() * 1000);
    }

    public static randomString(): string {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    public static getRandomPaimentType(): PaimentEnum {
        if (Math.floor(Math.random() * 10) > 5) {
            return PaimentEnum.AVANCE;
        }

        return PaimentEnum.PAIMENT;
    }

    public static error(message?) {
        message = message || "Une erreur est survenue."
        swal({
            type: 'error',
            title: message,
        });
    }
    public static showPopup(router, message, route, type?) {
        type = type || "warning";
        swal({
            title: message,
            type: type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
        }).then(result => {
            if (result.value) {
                router.navigate(route);
            }
        });
    }
    public static cancel(router, route) {
        swal({
            title: 'Êtes-vous sûr de vouloir annuler?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
        }).then((result) => {
            if (result.value) {
                router.navigate(route);
            }
        })
    }

    public static success(router, route, message) {
        swal({
            type: 'success',
            title: message
        }).then(() => {
            router.navigate(route)
        })
    }

    public static errorOccured(error) {
        console.error(error)
        let message = "";
        try {
            error = JSON.parse(error._body).message;
            if (error) {
                message = error
            } else {
                message = 'Une érreur est survenue';
            }
        } catch (e) {
            message = 'Une érreur est survenue';
        }
        swal({
            type: 'error',
            title: message,
        });
    }

}