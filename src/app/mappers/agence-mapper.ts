export class AgenceMapper{
    public static map(agence){

    }

    public static mapForSelection(agence){
        return {
            id:agence.id,
            itemName:agence.name
        };
    }
}