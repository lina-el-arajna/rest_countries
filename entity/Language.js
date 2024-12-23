class Language{
    static all_languages = [];
    
    constructor (
        iso639_2,
        name
    ){
        this.iso639_2 = iso639_2;
        this.name = name;        
    }

    toString() {
        return "iso639_2 : " + this.iso639_2 + "\nNom : " + this.name;
    }

}