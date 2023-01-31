const cityInput = document.getElementById("city-input");
const addCardButton = document.getElementById("add");
var cities = [];

async function Init(){
    cities = await CitiesRepository.GetAvailableCities();
    autocomplete(cityInput, cities);
}

document.addEventListener("DOMContentLoaded", Init);