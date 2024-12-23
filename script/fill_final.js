function fill_db(countries) {
    for(var i = 0 ; i < countries.length ; i++) {
        var names = countries[i]["translations"];
        names["en"] = countries[i]["name"];

        Country.all_countries[countries[i]["alpha3Code"]] = new Country(
            countries[i]["alpha3Code"],
            (countries[i]["area"] !== undefined) ? countries[i]["area"] : 0,
            (countries[i]["borders"] !== undefined) ? countries[i]["borders"] : [],
            (countries[i]["capital"] !== undefined) ? countries[i]["capital"] : "",
            countries[i]["region"],
            countries[i]["demonym"],
            countries[i]["flags"]["svg"],
            names,
            countries[i]["population"],
            countries[i]["topLevelDomain"],
            (countries[i]["currencies"] !== undefined) ? countries[i]["currencies"].map(currency => currency["code"]) : [],
            countries[i]["languages"].map(language => language["iso639_2"])
        );

        if (countries[i]["currencies"] !== undefined) {
            for(var j = 0 ; j < countries[i]["currencies"].length ; j++) {
                if(Currency.all_currencies[countries[i]["currencies"][j]["code"]] === undefined) {
                    Currency.all_currencies[countries[i]["currencies"][j]["code"]] = new Currency(
                        countries[i]["currencies"][j]["code"],
                        countries[i]["currencies"][j]["name"],
                        countries[i]["currencies"][j]["symbol"]
                    );
                }
            }
        }
        Currency
        if (countries[i]["languages"] !== undefined) {
            for(var j = 0 ; j < countries[i]["languages"].length ; j++) {
                if(Language.all_languages[countries[i]["languages"][j]["iso639_2"]] === undefined) {
                    Language.all_languages[countries[i]["languages"][j]["iso639_2"]] = new Language(
                        countries[i]["languages"][j]["iso639_2"],
                        countries[i]["languages"][j]["name"]
                    );
                }
            }
        }
    }

    console.log(Country.all_countries);
    console.log(Currency.all_currencies);
    console.log(Language.all_languages);
}

function handleResponse() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            const countries = JSON.parse(httpRequest.responseText);
            
            fill_db(countries);    
        } else {
            alert("Une erreur est survenue lors de la récupération des données");
        }
    }
}

const httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = handleResponse;

httpRequest.open("GET", "http://localhost:6789/gateway_to_restcountries.php", false);
httpRequest.send();