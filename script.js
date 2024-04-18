const searchBtn = document.querySelector("#search-btn");
const countryInp = document.querySelector("#country-inp");
const mainResult = document.querySelector("#result");
const loader = document.querySelector('.spinner');

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let countryName = countryInp.value;

  if (countryName === "") {
    alert("Please enter a country name");
  } else {
    fetchCountryData(countryName);
  }
});

async function fetchCountryData(countryName) {
  mainResult.classList.add("active");
  loader.classList.add("active");
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    );
    const data = await response.json();
    renderCountryInfo(data);
    loader.classList.remove("active");
    mainResult.classList.add("active");
    
  } catch (err) {
    console.log("Error Fetching country data");
  }
}

function renderCountryInfo(data) {
  const flag = document.querySelector("#flags");
  const countryTitle = document.querySelector("#countryTitle");
  const capital = document.querySelector("#capital");
  const continent = document.querySelector("#continent");
  const population = document.querySelector("#population");
  const currency = document.querySelector("#currency");
  const langauge = document.querySelector("#langauge");
  const region = document.querySelector("#region");

  region.textContent = data[0].region;
  flag.src = data[0].flags.svg;
  countryTitle.textContent = data[0].name.common;
  capital.textContent = data[0].capital[0];
  continent.textContent = data[0].continents[0];
  population.textContent = data[0].population;
  currency.textContent =
    data[0].currencies[Object.keys(data[0].currencies)[0]].name;
  langauge.textContent = Object.values(data[0].languages)
    .toString()
    .split(",")
    .join(", ");
}
