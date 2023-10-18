var openWeatherKey = "8207e48198911fc2a0c10ea7cc2303da"
var cityName = ""
var lat = ""
var lon = ""
// grabs user input data
var cityInput = $(".city-input")
// submissions will be added to this array
var cityHistory = []
// where city list will be generated
var cityHistoryList = JSON.parse(localStorage.getItem("city")) || []
// where weather data will be generated
var weatherDisplay = $(".weather-display")



function getOpenWeather() {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + openWeatherKey + "&units=imperial";
    // variable below is "Geocoding API", says it will make lat & lon from a given city name.
    // var requestUrl= http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=" + 2 + "&appid=" + openWeatherKey;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            lat = data.coord.lat
            lon = data.coord.lon
            getForecast()
        })

}

function getForecast() {
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherKey + "&units=imperial";
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            $(".forecast").text("")
            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.includes("12:00:00")) {
                    var card = document.createElement("div")
                    card.setAttribute("class", "card col")
                    var cardBody = document.createElement("div")
                    cardBody.setAttribute("class", "card-body")
                    var date = document.createElement("p")
                    date.textContent = data.list[i].dt_txt.split(" ")[0]
                    var temp = document.createElement("p")
                    temp.textContent = "temp: " + data.list[i].main.temp + "F"

                    cardBody.append(date, temp)
                    card.append(cardBody)
                    $(".forecast").append(card)
                }
            }
        })
}
// 
{/* <div class="card col">
  <div class="card-body">
    This is some text within a card body.
  </div>
</div> */}
// function displayForecast()


// function saveCity() **NOT WORKING** addEventListener?
// "script.js:48 Uncaught TypeError: $(...).onclick is not a function"
$(".btn").on("click", function () {
    cityName = cityInput.val();
    console.log(cityName);
    // Add the city to the search history
    cityHistoryList.push(cityName);
    localStorage.setItem("city", JSON.stringify(cityHistoryList));
    // Call and display weather data
    getOpenWeather(cityName);
    // Clear the input field
    cityInput.val("");
});

// getOpenWeather();
// getForecast();