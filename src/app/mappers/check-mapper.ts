import { CheckWrapper } from "app/models/CheckWrapper.model";
import { Check } from "app/models/Check.model";

export class CheckMapper {

    public static mapVentes(result: any): CheckWrapper {
        let wrapper = {...result} as CheckWrapper;
        console.log("result",result);
        wrapper.checks = [];
        result.checks.forEach(c => {
            const check = {...c} as Check;
            check.date = new Date(c.date);
            wrapper.checks.push(check);
        });
        console.log("wrap", wrapper)
        return wrapper;
    }
}