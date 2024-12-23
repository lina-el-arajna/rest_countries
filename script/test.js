function outsideTheContinent() {
    // Return every countries which
    return Object.values(Country.all_countries).filter(
        // Will have at least a border matching
        country => Object.values(country.getBorders()).some(
            // Border matching when region is different
            border => border.region !== country.region
        )
    ).map(
        country => country.name
    );
}

function moreNeighbors() {
    // Return all the countries which 
    return Object.values(Country.all_countries).filter(
        // Has the same number of borders than the max number of borders among all countries
        country => country.getBorders().length === Math.max(
            // Returns all the numbers of borders to get the max among them
            ...Object.values(Country.all_countries).map(country2 => country2.getBorders().length)
        )
    ).map(
        country => country.name + " : " + country.borders.length
    );
}

function neighborless() {
    // Return every countries which
    return Object.values(Country.all_countries).filter(
        // Has no borders
        country => country.getBorders().length === 0
    ).map(
        country => country.name
    );
}

function moreLanguages() {
    // Filter every country which
    return Object.values(Country.all_countries).filter(
        // Has a number of languages equals to the max of languages
        country => country.getLanguages().length === Math.max(
            // Returns all the numbers of languages to get the max among them
            ...Object.values(Country.all_countries).map(country2 => country2.getLanguages().length)
        )
    // Returns an array with
    ).map(
        // Country => List of Languages names
        country => country.name + ' : ' + country.getLanguages().map(
            language => language.name
        ).join(', ')
    );
}

function withCommonLanguage() {
    // Filter every country which
    return Object.values(Country.all_countries).filter(
        // Has at least a border which will match
        country => Object.values(country.getBorders()).some(
            // Border math when at least a language
            border => Object.values(country.getLanguages()).some(
                // Is shared with the country
                language => Object.values(border.getLanguages()).includes(language)
            )
        )
    // Construct result displayed
    ).map(
        // Country + selected languages
        country => country.name + " : " + Object.values(country.getLanguages()).filter(
            language => Object.values(country.getBorders()).some(
                border => Object.values(border.getLanguages()).includes(language)
            )
        // Languages and borders displayed
        ).map(
            language => language.name + " (" + Object.values(country.getBorders()).filter(
                border => Object.values(border.getLanguages()).includes(language)
            ).map(
                border => border.name
            ).join(', ') + ")"
        ).join(', ')
    );
}

function withoutCommonCurrency() {
    // Return every countries which
    return Object.values(Country.all_countries).filter(
        // Has every borders matching
        country => Object.values(country.getBorders()).every(
            // Border matching when every currencies are matching
            border => border.currencies.every(
                // Currency is matching when the original country does not includes the currency
                currency => !country.currencies.includes(currency)
            )
        )
    ).map(
        country => country.name
    );
}

function sortingDecreasingDensity() {
    // Return every countries sorted by
    return Object.values(Country.all_countries).sort(
        // Their population density with the highest in first
        (countryA, countryB) => countryB.getPopDensity() - countryA.getPopDensity() 
    ).map(
        country => country.name + " : " + country.getPopDensity()
    );
}

function moreTopLevelDomains() {
    // Return every country which
    return Object.values(Country.all_countries).filter(
        // Has more than one Top Level Domain
        country => country.topLevelDomain.length > 1
    ).map(
        country => country.name + " : " + country.topLevelDomain.join(', ')
    );
}

function veryLongTrip(nom_pays, visited = []) {
    let country = Country.all_countries[nom_pays];

    // Prevent the that a country calls all its borders, and one of them calls one of the borders of the precedent country, so the border will be called 2 times
    if (!visited.includes(country.name)) {
        visited.push(country.name)

        let borders = country.getBorders().map(border => border.name);
        
        if (!borders.every(border => visited.includes(border))) {
            let bordersNotInVisited = country.borders.filter(
                border => !visited.includes(Country.all_countries[border].name)
            );

            for(border in bordersNotInVisited) {
                // Recursive call
                visited = veryLongTrip(bordersNotInVisited[border], visited);
            }
        }
    }

    return visited;
}