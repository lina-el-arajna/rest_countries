// GETTING ALL ELEMENTS ===========================================================================

// Main Country List
let countryList = document.getElementById("country-list");

// Number of pages
let topNumPageElement = document.getElementById("topNumPage");
let bottomNumPageElement = document.getElementById("bottomNumPage");

// Grey filter displayed for detail and flag
let greyFilter = document.getElementById("greyFilter");

// All detail elements
let countryDetailContainer = document.getElementById("countryDetailContainer");
let countryDetailClose = document.getElementById("countryDetailClose");
let countryDetailMain = document.getElementById("countryDetailMain");
let countryDetailName = document.getElementById("countryDetailName");
let countryDetailMainLeft = document.getElementById("countryDetailMainLeft");
let countryDetailLanguageList = document.getElementById("countryDetailLanguageList");
let countryDetailBorderList = document.getElementById("countryDetailBorderList");

// All filter elements
let filterContinentInput = document.getElementById("filterContinent");
let filterLanguageInput = document.getElementById("filterLanguage");
let filterCountryInput = document.getElementById("filterCountry");
let filterReset = document.getElementById("filterReset");

// Pagination buttons
let topNextPage = document.getElementById("topNextPage");
let topPreviousPage = document.getElementById("topPreviousPage");
let bottomNextPage = document.getElementById("bottomNextPage");
let bottomPreviousPage = document.getElementById("bottomPreviousPage");

// All sort elements
let sortNameInput = document.getElementById("sortNameInput");
let sortPopulationInput = document.getElementById("sortPopulationInput");
let sortAreaInput = document.getElementById("sortAreaInput");
let sortDensityInput = document.getElementById("sortDensityInput");
let sortRegionInput = document.getElementById("sortRegionInput");
let sortReset = document.getElementById("sortReset");

// CONSTANTS ======================================================================================

const CARD_PER_PAGE = 25;

// SORTING DEFAULT ================================================================================

let sortBy = "name";

// COUNTRIES TO DISPLAY INITIALISATION ============================================================

// The countries to display are declared globally
// Functions will change this array, which is not taking into account the pagination
// Based on the countries filtered and sorted
let countriesToDisplay = Object.values(Country.all_countries);

// INITIALISATION FOR PAGINATION ==================================================================

let numPage = 1;

topNumPageElement.innerHTML = numPage;
bottomNumPageElement.innerHTML = numPage;

// Initial lenght of countries (needed globally for the numOfPages)
let countriesLength = countriesToDisplay.length;

// numOfPages needs to be global because it is needed in multiple different functions
let numOfPages = Math.ceil(countriesLength/CARD_PER_PAGE);

// SWITCH PAGES FUNCTION ==========================================================================

function switchPagesNext() {
    if (numPage < numOfPages) {
        // Changes global variable "numPage"
        numPage++;

        // Changes the text displayed
        topNumPageElement.innerHTML = numPage;
        bottomNumPageElement.innerHTML = numPage;

        displayCountries();
    }
}

function switchPagesPrevious() {
    if (numPage > 1) {
        // Changes global variable "numPage"
        numPage--;

        // Changes the text displayed
        topNumPageElement.innerHTML = numPage;
        bottomNumPageElement.innerHTML = numPage;

        displayCountries();
    }
}

function switchAbsolute(newNumPage) {
    // Changes global variable "numPage"
    numPage = newNumPage;

    // Changes the text displayed
    topNumPageElement.innerHTML = numPage;
    bottomNumPageElement.innerHTML = numPage;

    displayCountries();
}

// DISPLAY AND HIDE DETAILS FUNCTIONs =============================================================

// Show detaim
function displayCountryDetail(alphacode) {
    // Fetch country
    var country = Country.all_countries[alphacode];

    // Set name
    countryDetailName.innerHTML = country.name;
    
    // Define the left informations
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

    // Initialise the left informations
    countryDetailMainLeft.innerHTML = "";

    // Generates the left informations
    Object.keys(countryDetailLeftArray).forEach(infoKey => {
        // Creates the title of each line
        var newLine = document.createElement("p");
        var strong = document.createElement("strong");
        strong.innerHTML = infoKey + " : ";
        newLine.appendChild(strong);

        // Set the content of each line
        newLine.innerHTML += 
        ((countryDetailLeftArray[infoKey] === "" || countryDetailLeftArray[infoKey] === [])
            ? "Aucune"
            : countryDetailLeftArray[infoKey]);

        newLine.classList.add("country-detail-line");
        countryDetailMainLeft.appendChild(newLine);
    });

    // Initialize the borders and the languages
    countryDetailLanguageList.innerHTML = "";
    // If it exists
    countryDetailLanguageList.classList.remove("empty-list");

    countryDetailBorderList.innerHTML = "";
    // If it exists
    countryDetailBorderList.classList.remove("empty-list");

    // Fetch languages
    let languages = country.getLanguages().map(language => language.name);
    
    // If there is at least one language
    if (languages.length > 0) {
        languages.forEach((name => {
            var newLine = document.createElement("li");
            newLine.appendChild(document.createTextNode(name));
            newLine.classList.add("country-detail-li");
            countryDetailLanguageList.appendChild(newLine);
        }));
    // If there's none
    } else {
        var newLine = document.createElement("li");
        newLine.appendChild(document.createTextNode("Aucune"));
        newLine.classList.add("country-detail-li-empty");
        countryDetailLanguageList.appendChild(newLine);
        countryDetailLanguageList.classList.add("empty-list");
    }
    
    // Fetch borders
    let borders = country.getBorders().map(border => border.name);

    // If there is at least one border
    if (borders.length > 0) {
        borders.forEach((name => {
            var newLine = document.createElement("li");
            newLine.appendChild(document.createTextNode(name));
            newLine.classList.add("country-detail-li");
            countryDetailBorderList.appendChild(newLine);
        }));
        // If there's none
    } else {
        var newLine = document.createElement("li");
        newLine.appendChild(document.createTextNode("Aucun"));
        newLine.classList.add("country-detail-li-empty");
        countryDetailBorderList.appendChild(newLine);
        countryDetailBorderList.classList.add("empty-list");
    }

    // Display the grey filter, the main div and the return button
    greyFilter.classList.remove("hidden");
    countryDetailContainer.classList.remove("hidden");
    countryDetailClose.classList.remove("hidden");
}

// Hide detail
function hideCountryDetail() {
    greyFilter.classList.add("hidden");
    countryDetailContainer.classList.add("hidden");
    countryDetailClose.classList.add("hidden");
}

// DISPLAY AND HIDE FLAG ==========================================================================

// Display flag
function displayFlagDetail(name, link) {
    flagDetail.src = link;
    flagDetail.alt = "Drapeau Complet " + name; 

    greyFilter.classList.remove("hidden");
    flagDetail.classList.remove("hidden");
}


// Hide flag
function hideFlagDetail() {
    flagDetail.src = "";
    flagDetail.alt = ""; 

    greyFilter.classList.add("hidden");
    flagDetail.classList.add("hidden");
}

// GENERATES THE OPTIONS IN THE FILTERS ===========================================================

let allContinents = [...new Set(Object.values(Country.all_countries).map(country => country.region).sort())];

allContinents.forEach(continent => {
    var newOption = document.createElement("option");
    newOption.value = continent;
    newOption.appendChild(document.createTextNode(continent));
    filterContinentInput.appendChild(newOption);
});

let allLanguages = [...new Set(Object.values(Language.all_languages).map(language => language.name).sort())];

allLanguages.forEach(language => {
    var newOption = document.createElement("option");
    newOption.value = language;
    newOption.appendChild(document.createTextNode(language));
    filterLanguageInput.appendChild(newOption);
});

// BUILD THE COUNTRIES TO DISPLAY =================================================================

// Display countries per page

// No parameters, numPage and countriesToDisplay are global
function displayCountries() {
    // Refresh the main list
    countryList.innerHTML = "";

    // First sorting by names, so if it's equals it will stay in the same order
    countriesToDisplay.sort((a, b) => a.names["fr"].localeCompare(b.names["fr"]));

    // Sorting the countries
    switch (sortBy) {
        case "name":
            countriesToDisplay.sort((a, b) => a.names["fr"].localeCompare(b.names["fr"]));
            break;
        case "population":
            countriesToDisplay.sort((a, b) => a.population - b.population);
            break;
        case "area":
            countriesToDisplay.sort((a, b) => a.area - b.area);
            break;
        case "density":
            countriesToDisplay.sort((a, b) => a.getPopDensity() - b.getPopDensity());
            break;
        case "region":
            countriesToDisplay.sort((a, b) => (a.region).localeCompare(b.region));
            break;
    }
        
    // Updates the number of total countries to display
    countriesLength = countriesToDisplay.length;

    // Updates the number of pages
    numOfPages = Math.ceil(countriesLength/CARD_PER_PAGE);

    // Defines the number of the first and last card to display (pagination)
    let firstCard = CARD_PER_PAGE*(numPage-1);
    let lastCard = (numPage !== numOfPages)
        ? firstCard + CARD_PER_PAGE
        : firstCard + (countriesLength - firstCard);
    
    // For each card
    for(key = firstCard; key<lastCard; key++) {
        // Fetch country
        let country = countriesToDisplay[key];
        
        // Generating country main div
        var countryCard = document.createElement("div");
        countryCard.classList.add("country");
    
        // Generating country flag
        var countryFlag = document.createElement("img");
        countryFlag.classList.add("country-flag");
        countryFlag.src = country.flag;
        countryFlag.alt = "Drapeau " + country.name;
    
        countryCard.appendChild(countryFlag);
    
        // Generating country content div
        var countryContent = document.createElement("div");
        countryContent.classList.add("country-content");
    
        // Generating country name
        var countryName = document.createElement("p");
        countryName.classList.add("country-name");
        countryName.classList.add("overflowing");
        countryNameText = document.createTextNode(country.name);
        countryName.appendChild(countryNameText);
    
        countryContent.appendChild(countryName);
    
        // Defining country informations
        var countryInfoArray = {
            "Population" : country.population + " hab",
            "Surface" : country.area + " km²",
            "Densité" : country.getPopDensity() + " hab/km²",
            "Continent" : country.region
        };
    
        // Generating country informations
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
    
    scroll(0,0);
}

// FUNCTION WHICH FILTER THE COUNTRIES ============================================================

function filterCountries() {
    countriesToDisplay = Object.values(Country.all_countries);

    if (filterContinentInput.value !== "empty") {
        countriesToDisplay = countriesToDisplay.filter(
            country => country.region === filterContinentInput.value
        );
    }

    if (filterLanguageInput.value !== "empty") {
        countriesToDisplay = countriesToDisplay.filter(
            country => country.getLanguages().map(language => language.name)
                .includes(filterLanguageInput.value)
        );
    }

    if (filterCountryInput.value.length > 0) {
        countriesToDisplay = countriesToDisplay.filter(
            country => (country.names["en"].toLowerCase().includes(filterCountryInput.value.toLowerCase()) ||
            country.names["fr"].toLowerCase().includes(filterCountryInput.value.toLowerCase()))
        );
    }
}

// FIRST DISPLAY OF COUNTRIES =====================================================================

displayCountries();

// EVENT LISTENERS ================================================================================

// Detail closure
countryDetailClose.addEventListener("click", () => {
    hideCountryDetail();
});

// Flag closure
flagDetail.addEventListener("click", () => {
    hideFlagDetail();
});

// Grey filter interaction
greyFilter.addEventListener("click", () => {
    if (!countryDetailContainer.classList.contains("hidden")) {
        hideCountryDetail();
    } else if (!flagDetail.classList.contains("hidden")) {
        hideFlagDetail();
    }
});

// Filter update on continent
filterContinentInput.addEventListener("change", () => {
    filterCountries();
    switchAbsolute(1);
});

// Filter update on language
filterLanguageInput.addEventListener("change", () => {
    filterCountries();
    switchAbsolute(1);
});

// Filter update on country name
filterCountryInput.addEventListener("input", () => {
    filterCountries();
    switchAbsolute(1);
});

// Filter reset on button press
filterReset.addEventListener("click", () => {
    filterContinentInput.value = "empty";
    filterLanguageInput.value = "empty";
    filterCountryInput.value = "";
    filterCountries();
    switchAbsolute(1);
});

// Pagination
topPreviousPage.addEventListener("click", () => switchPagesPrevious());
topNextPage.addEventListener("click", () => switchPagesNext());
bottomPreviousPage.addEventListener("click", () => switchPagesPrevious());
bottomNextPage.addEventListener("click", () => switchPagesNext());

// Sort
sortNameInput.addEventListener("change", () => {
    sortBy = "name";
    switchAbsolute(1);
});
sortPopulationInput.addEventListener("change", () => {
    sortBy = "population";
    switchAbsolute(1);

});
sortAreaInput.addEventListener("change", () => {
    sortBy = "area";
    switchAbsolute(1);
});
sortDensityInput.addEventListener("change", () => {
    sortBy = "density";
    switchAbsolute(1);
});
sortRegionInput.addEventListener("change", () => {
    sortBy = "region";
    switchAbsolute(1);
});

// Sort reset
sortReset.addEventListener("click", () => {
    sortBy = "name";
    sortNameInput.checked = true;
    switchAbsolute(1);
});
