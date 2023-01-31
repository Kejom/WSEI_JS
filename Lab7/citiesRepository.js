const CitiesRepository = function(){

    var cities;

    let init = async function(){
        let response = await fetch("./assets/cities.json");
        cities = await response.json();
    }

    let getAvailableCities= async function(){
        if(!cities)
            await init();

        return cities.map(c => c.name);
    }

    let getCityData = async function(cityName){
        if(!cities)
            await init();

        return cities.find(c => c.name === cityName);
    }

    return {
        GetAvailableCities: getAvailableCities,
        GetCityData: getCityData
    }
}();