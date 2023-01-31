const ElementsFactory = function(){
    let createCityCard = function(city){
        let cityCardDiv = document.createElement("div");
        cityCardDiv.classList.add("card");

        let cardHeader = document.createElement("h1");
        cardHeader.innerHTML = city.name;
        cityCardDiv.appendChild(cardHeader);

        let weatherImg = document.createElement("img");
        weatherImg.src = `http://openweathermap.org/img/wn/${city.data.weather[0].icon}@2x.png`;
        weatherImg.alt = city.data.weather.description;
        cityCardDiv.appendChild(weatherImg);
        
        let currentTemp = document.createElement("p");
        currentTemp.innerHTML = `Aktualna Temperatura: ${getTempString(city.data.main.temp)}`;
        cityCardDiv.appendChild(currentTemp);

        let feelsLikeTemp = document.createElement("p");
        feelsLikeTemp.innerHTML = `Odczuwalna Temperatura: ${getTempString(city.data.main.feels_like)}`;
        cityCardDiv.appendChild(feelsLikeTemp);

        let minMaxTemp = document.createElement("p");
        minMaxTemp.innerHTML = `Min: ${getTempString(city.data.main.temp_min)} Max: ${getTempString(city.data.main.temp_max)}`;
        cityCardDiv.appendChild(minMaxTemp);

        let pressure = document.createElement("p")
        pressure.innerHTML = `Ciśnienie: ${city.data.main.pressure}hPa`;
        cityCardDiv.appendChild(pressure);

        let humidity = document.createElement("p");
        humidity.innerHTML = `Wilgotność Powietrza: ${city.data.main.humidity}%`;
        cityCardDiv.appendChild(humidity);

        let deleteButton = document.createElement("span");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = "&times";
        cityCardDiv.appendChild(deleteButton);

        return cityCardDiv;
    }

    let getTempString= function(temp){
        return temp + "2&#8451"
    }

    return {
        CreateCityCard: createCityCard
    }
}();