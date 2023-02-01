const cityInput = document.getElementById("city-input");
const addCardButton = document.getElementById("add");
const cardContainer = document.getElementById("card-container");
const maxCards = 10;
var cityNames = [];
var cityData = [];
var refreshInterval;

async function init(){
    cityData = StorageManager.GetData();
    cityNames = await CitiesRepository.GetAvailableCities();
    autocomplete(cityInput, cityNames);
    addCardButton.addEventListener("click", onAddButtonClick);
    renderCityCards();
    await refresh();
    startRefreshInterval();
}

function onAddButtonClick(){
    let cityName = cityInput.value;
    addCity(cityName);
}

async function addCity(cityName){
    if(cityData.length >= maxCards)
        return alert("Maksymalna ilość kart(10) przekroczona, usuń jedną z kart przed dodaniem nowej");

    if(cityData.find(c => c.name === cityName))
        return;
    
    let weather = await getCityWeather(cityName);
    if(!weather)
        return;
    
    let city = {id: "c" + Date.now() ,name: cityName, data: weather};

    cityData.push(city);
    StorageManager.SaveData(cityData);
    renderCityCard(city);
}

function removeCity(id){
    cityData = cityData.filter(c => c.id !== id)
    StorageManager.SaveData(cityData);
    renderCityCards();
}

function renderCityCards(){
    if(!cityData)
        return;

    clearCardContainer();
    cityData.forEach(city => renderCityCard(city));
}

function clearCardContainer(){
    cardContainer.innerHTML = "";
}

function renderCityCard(cityData){
    let cityCard = ElementsFactory.CreateCityCard(cityData);
    cityCard.id = cityData.id;
    cardContainer.appendChild(cityCard);

    let deleteButton = document.querySelector(`#${cityData.id} span`);

    deleteButton.addEventListener("click", () => {removeCity(cityData.id)});
}

async function refresh(){
    await updateCityData();
    renderCityCards();
}

function startRefreshInterval(){
    if(refreshInterval)
        refreshInterval = clearInterval(refreshInterval);
    
    refreshInterval = setInterval(refresh, 600000);
}

async function updateCityData(){
    for (let i = 0; i < cityData.length; i++) {

        let newData = await getCityWeather(cityData[i].name);

        if(newData)
            cityData[i].data = newData;
    }
    StorageManager.SaveData(cityData);
}

async function getCityWeather(cityName){
    let city = await CitiesRepository.GetCityData(cityName);
    if(!city)
        return;

    let weather = await OwmClient.GetCurrentWeather(city.lng, city.lat);

    return weather;
}

document.addEventListener("DOMContentLoaded", init);