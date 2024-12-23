let countryList = document.getElementById("country-list");

for(key in Object.values(Country.all_countries)) {
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