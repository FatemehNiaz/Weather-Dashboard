// Mine=b7b48ac454a09b19bb30a881b0b84d9d
// Jacobs=b9b6473a9278d7b2a79b1934480d6bb0
const inputEl = document.getElementById("city-input");
const searchEl = document.getElementById("search-button");
const clearEl = document.getElementById("clear-history");
const nameEl = document.getElementById("city-name");
const currentPicEl = document.getElementById("current-pic");
("");
const currentTempEl = document.getElementById("temperature");
const currentHumidityEl = document.getElementById("humidity");
const currentWindEl = document.getElementById("wind-speed");
const historyEl = document.getElementById("history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var apiKey = "b9b6473a9278d7b2a79b1934480d6bb0";

function getWeather(cityName) {
  var query =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=imperial";
  fetch(query)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      nameEl.innerHTML =
        data.name + " (" + month + "/" + day + "/" + year + ")";
      currentTempEl.innerHTML = "Temperature: " + data.main.temp + " &#176F";
      currentHumidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";
      currentWindEl.innerHTML = "Wind: " + data.wind.speed + " mph";
      var weatherIcon = data.weather[0].icon;
      currentPicEl.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      );
      currentPicEl.setAttribute("alt", data.weather[0].description);
      var cityId = data.id;
      var forecastUrl =
        "https://api.openweathermap.org/data/2.5/forecast?id=" +
        cityId +
        "&appid=" +
        apiKey + "&units=imperial";
      fetch(forecastUrl)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          var forecastEl = document.querySelectorAll(".forecast");
          for (let i = 0; i < forecastEl.length; i++) {
            forecastEl[i].innerHTML = "";
            var forecastIndex = i * 8 + 4;
            var date = new Date(data.list[forecastIndex].dt * 1000);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var forecastDateEl = document.createElement("p")
            forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date")
            forecastDateEl.innerHTML = " (" + month + "/" + day + "/" + year + ")";
            forecastEl[i].append(forecastDateEl)
            var forecastImg = document.createElement("img")
            forecastImg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[forecastIndex].weather[0].icon + "@2x.png")
            forecastImg.setAttribute("alt", data.list[forecastIndex].weather[0].description)
            forecastEl[i].append(forecastImg)
            var forecastTemp = document.createElement('p')
            forecastTemp.innerHTML = "Temp: " + data.list[forecastIndex].main.temp + " &#176F";
            forecastEl[i].append(forecastTemp)
            var forecastHumidity = document.createElement("p")
            forecastHumidity.innerHTML = "Humidity: " + data.list[forecastIndex].main.humidity + "%"
            forecastEl[i].append(forecastHumidity)
            var forecastWind = document.createElement('p')
            forecastWind.innerHTML = "Wind: " + data.list[forecastIndex].wind.speed + " mph"
            forecastEl[i].append(forecastWind)
          }
        });
    });
}

searchEl.addEventListener("click", function () {
  const cityName = inputEl.value;
  getWeather(cityName);
});

clearEl.addEventListener("click", function() {
  searchHistory = []
})
