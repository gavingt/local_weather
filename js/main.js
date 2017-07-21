var tempFahrenheit, tempCelsius;

$(document).ready(function() {
    getLocation();
});


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getForecast); //call getForecast as an async success function. getCurrentPosition requires as an input a function that itself has an input representing the current position

    } else {
        weatherText.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function getForecast(position) {
    $.ajax( {
        type: "POST",
        dataType: 'jsonp',
        url: 'https://api.darksky.net/forecast/44b1a52501d19f076cdd704b05cbfadc/' + position.coords.latitude + "," + position.coords.longitude,
        success: function(data) {

            tempFahrenheit = data.currently.temperature.toFixed(1);
            tempCelsius = (tempFahrenheit - 32)*(5/9);
            tempCelsius = tempCelsius.toFixed(1);

            document.getElementById("weatherNumber").innerHTML = data.currently.summary.toLowerCase();
            document.getElementById("temperatureNumber").innerHTML =  tempFahrenheit + "°F";
            document.getElementById("humidityNumber").innerHTML = data.currently.humidity * 100 + "%";

            document.getElementById("weather-icon").src = "img/" + data.currently.icon + ".png";
        },
        cache: false
    });
}


$("#checkbox").click(function() {
    var temperatureNumber = document.getElementById("temperatureNumber");
    if (document.getElementById("checkbox").checked) {
        temperatureNumber.innerHTML = tempFahrenheit + "°F";
    }
    else {
        temperatureNumber.innerHTML = tempCelsius + "°C";
    }
});



