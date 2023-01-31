const OwmClient = function(){
    const apiKey = "c70e195b73072955aeae2c3c9135ec1c";
    
    let getCurrentWeather = async function(lon, lat){
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        let responseJson = await response.json();
        return responseJson;
    }

    return{
        GetCurrentWeather: getCurrentWeather
    }
}();