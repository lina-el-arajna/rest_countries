// INITIALISATION =================================================
let countryList = document.getElementById("country-list");

let topNumPageElement = document.getElementById("topNumPage");
let bottomNumPageElement = document.getElementById("bottomNumPage");

let numPage = 1;
const CARD_PER_PAGE = 25;
const COUNTRIES_LENGTH = Object.keys(Country.all_countries).length;
let numOfPages = Math.ceil(COUNTRIES_LENGTH/CARD_PER_PAGE);

topNumPageElement.innerHTML = numPage;
bottomNumPageElement.innerHTML = numPage;

// FIRST CALL OF DISPLAYCOUNTRIES AT THE END OF THE SCRIPT

// PAGINATION =====================================================

document.getElementById("topPreviousPage").addEventListener("click", () => {
    if (numPage > 1) {
        numPage--;
        topNumPageElement.innerHTML = numPage;
        bottomNumPageElement.innerHTML = numPage;
        displayCountries();
        scroll(0,0);
    }
});
document.getElementById("topNextPage").addEventListener("click", () => {
    if (numPage < numOfPages) {
        numPage++;
        topNumPageElement.innerHTML = numPage;
        bottomNumPageElement.innerHTML = numPage;
        displayCountries();
        scroll(0,0);
    }
});
document.getElementById("bottomPreviousPage").addEventListener("click", () => {
    if (numPage > 1) {
        numPage--;
        topNumPageElement.innerHTML = numPage;
        bottomNumPageElement.innerHTML = numPage;
        displayCountries();
        scroll(0,0);
    }
});
document.getElementById("bottomNextPage").addEventListener("click", () => {
    if (numPage < numOfPages) {
        numPage++;
        topNumPageElement.innerHTML = numPage;
        bottomNumPageElement.innerHTML = numPage;
        displayCountries();
        scroll(0,0);
    }
});

// COUNTRY DETAIL =================================================

let greyFilter = document.getElementById("greyFilter");
let countryDetailContainer = document.getElementById("countryDetailContainer");
let countryDetailClose = document.getElementById("countryDetailClose");
let countryDetailMain = document.getElementById("countryDetailMain");
let countryDetailName = document.getElementById("countryDetailName");

function displayCountryDetail(alphacode) {
    var country = Country.all_countries[alphacode];

    countryDetailName.innerHTML = country.name;
    
    let countryDetailLeftArray = {
        "Code alpha3" : country.alpha3code,
        "Population" : country.population + " hab",
        "Capitale" : country.capital,
        "Continent" : country.region,
        "Superficie" : country.area + " km²",
        "Densité" : country.getPopDensity() + " hab/km²",
        "Monnaie(s)" : country.getCurrencies().map(currency => currency.name).join(", "),
        "Habitants" : country.demonym,
        "Extension(s)" : country.topLevelDomain.join(", ")
    }

    let countryDetailMainLeft = document.getElementById("countryDetailMainLeft");
    countryDetailMainLeft.innerHTML = "";

    Object.keys(countryDetailLeftArray).forEach(infoKey => {
        var newLine = document.createElement("p");

        var strong = document.createElement("strong");
        strong.innerHTML = infoKey + " : ";

        newLine.appendChild(strong);

        newLine.innerHTML += 
        ((countryDetailLeftArray[infoKey] === "" || countryDetailLeftArray[infoKey] === [])
            ? "Aucune"
            : countryDetailLeftArray[infoKey]);

        newLine.classList.add("country-detail-line");
        countryDetailMainLeft.appendChild(newLine);
    });

    let countryDetailLanguageList = document.getElementById("countryDetailLanguageList");
    countryDetailLanguageList.innerHTML = "";
    let countryDetailBorderList = document.getElementById("countryDetailBorderList");
    countryDetailBorderList.innerHTML = "";

    let languages = country.getLanguages().map(language => language.name);
    
    if (languages.length !== 0) {
        languages.forEach((name => {
            var newLine = document.createElement("li");
            newLine.appendChild(document.createTextNode(name));
            newLine.classList.add("country-detail-li");
            countryDetailLanguageList.appendChild(newLine);
        }));
    } else {
        var newLine = document.createElement("li");
        newLine.appendChild(document.createTextNode("Aucun(e)"));
        newLine.classList.add("country-detail-li-empty");
        countryDetailLanguageList.appendChild(newLine);
    }
    
    let borders = country.getBorders().map(border => border.name);

    if (borders.length !== 0) {
        borders.forEach((name => {
            var newLine = document.createElement("li");
            newLine.appendChild(document.createTextNode(name));
            newLine.classList.add("country-detail-li");
            countryDetailBorderList.appendChild(newLine);
        }));
    } else {
        var newLine = document.createElement("li");
        newLine.appendChild(document.createTextNode("Aucun(e)"));
        newLine.classList.add("country-detail-li-empty");
        countryDetailBorderList.appendChild(newLine);
    }

    
    greyFilter.classList.remove("hidden");
    countryDetailContainer.classList.remove("hidden");
    countryDetailClose.classList.remove("hidden");
}

function hideCountryDetail() {
    greyFilter.classList.add("hidden");
    countryDetailContainer.classList.add("hidden");
    countryDetailClose.classList.add("hidden");
}

countryDetailClose.addEventListener("click", () => {
    hideCountryDetail();
});

// FLAG DETAIL ====================================================

let flagDetail = document.getElementById("flagDetail");

function displayFlagDetail(name, link) {
    flagDetail.src = link;
    flagDetail.alt += name; 

    greyFilter.classList.remove("hidden");
    flagDetail.classList.remove("hidden");
}

function hideFlagDetail() {
    flagDetail.src = "";
    flagDetail.alt = "Drapeau Complet "; 

    greyFilter.classList.add("hidden");
    flagDetail.classList.add("hidden");
}

flagDetail.addEventListener("click", () => {
    hideFlagDetail();
});

// GREY FILTER ====================================================

greyFilter.addEventListener("click", () => {
    if (!countryDetailContainer.classList.contains("hidden")) {
        hideCountryDetail();
    } else if (!flagDetail.classList.contains("hidden")) {
        hideFlagDetail();
    }
});

// IMPORTATION ====================================================

function displayCountries() {
    countryList.innerHTML = "";

    let firstCard = CARD_PER_PAGE*(numPage-1);
    let lastCard = (numPage !== numOfPages)
        ? firstCard + CARD_PER_PAGE
        : firstCard + (COUNTRIES_LENGTH - firstCard);

    for(key = firstCard; key<lastCard; key++) {
        let country = Object.values(Country.all_countries)[key];
    
        // Generating country main div
        let countryCard = document.createElement("div");
        countryCard.classList.add("country");
    
        // Generating country flag
        let countryFlag = document.createElement("img");
        countryFlag.classList.add("country-flag");
        countryFlag.src = country.flag;
        countryFlag.alt = "Drapeau " + country.name;
    
        countryCard.appendChild(countryFlag);
    
        // Generating country content div
        let countryContent = document.createElement("div");
        countryContent.classList.add("country-content");
    
        // Generating country name
        let countryName = document.createElement("p");
        countryName.classList.add("country-name");
        countryName.classList.add("overflowing");
        countryNameText = document.createTextNode(country.name);
        countryName.appendChild(countryNameText);
    
        countryContent.appendChild(countryName);
    
        // Generating country informations
        let countryInfoArray = {
            "Population" : country.population + " hab",
            "Surface" : country.area + " km²",
            "Densité" : country.getPopDensity() + " hab/km²",
            "Continent" : country.region
        };
    
        Object.keys(countryInfoArray).forEach(infoKey => {
            var countryInfo = document.createElement("p");
            countryInfo.classList.add("country-info");
            countryInfo.classList.add("overflowing");
    
            countryInfo.appendChild(document.createTextNode(
                infoKey + " : " + countryInfoArray[infoKey]
            ));
    
            countryContent.appendChild(countryInfo);
        });
    
        // Nesting elements
        countryCard.appendChild(countryContent);
        countryList.appendChild(countryCard);

        // Adding click event listener
        countryFlag.addEventListener("click", () => {
            displayFlagDetail(country.name, country.flag);
        });
        countryContent.addEventListener("click", () => {
            displayCountryDetail(country.alpha3code);
        });
    }
}

displayCountries();
