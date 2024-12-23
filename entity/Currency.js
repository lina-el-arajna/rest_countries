class Currency{
    static all_currencies = [];
    
    constructor (
        code,
        name,
        symbol
    ){
        this.code = code;
        this.name = name;
        this.symbol = symbol;
        
    }

    toString() {
        return "Code : " + this.code + "\nNom : " + this.name + "\nSymbol : " + this.symbol;
    }

}