class Country {
    static defaultName = "fr";
    static all_countries = [];
    
    constructor(
        alpha3code,
        area,
        borders,
        capital,
        region,
        demonym,
        flag,
        names,
        population,
        topLevelDomain,
        currencies,
        languages
    ){
        this.alpha3code = alpha3code;
        this.area = area;
        this.borders = borders;
        this.capital = capital;
        this.region = region;
        this.demonym = demonym;
        this.flag = flag;
        this.names = names;
        this.name = this.names[Country.defaultName];
        this.population = population;
        this.topLevelDomain = topLevelDomain;
        this.currencies = currencies;
        this.languages = languages;

    }

    toString() {
        return "Country : "+ this.name+ "\nAlpha3code : "+ this.alpha3code;
    }

    getPopDensity() {
        return (this.area !== 0) ? Math.round((this.population/this.area)*10)/10 : 0;
    }

    getBorders() {
        var returnBorders = [];

        for(var i = 0 ; i < this.borders.length ; i++) {
            returnBorders.push(Country.all_countries[this.borders[i]]);
        }

        return returnBorders;
    }

    getCurrencies() {
        var returnCurrencies = [];

        for(var i = 0 ; i < this.currencies.length ; i++) {
            returnCurrencies.push(Currency.all_currencies[this.currencies[i]]);
        }

        return returnCurrencies;
    }

    getLanguages() {
        var returnLanguages = [];

        for(var i = 0 ; i < this.languages.length ; i++) {
            returnLanguages.push(Language.all_languages[this.languages[i]]);
        }

        return returnLanguages;
    }
}