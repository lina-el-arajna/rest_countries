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
    }
});
document.getElementById("topNextPage").addEventListener("click", () => {
    if (numPage < numOfPages) {
        numPage++;
        topNumPageElement.innerHTML = numPage;
        bottomNumPageElement.innerHTML = numPage;
        displayCountries();
    }
});
document.getElementById("bottomPreviousPage").addEventListener("click", () => {
    if (numPage > 1) {
        numPage--;
        topNumPageElement.innerHTML = numPage;
        bottomNumPageElement.innerHTML = numPage;
        displayCountries();
    }
});
document.getElementById("bottomNextPage").addEventListener("click", () => {
    if (numPage < numOfPages) {
        numPage++;
        topNumPageElement.innerHTML = numPage;
        bottomNumPageElement.innerHTML = numPage;
        displayCountries();
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
            "Population" : country.population,
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
    }
}

displayCountries();
