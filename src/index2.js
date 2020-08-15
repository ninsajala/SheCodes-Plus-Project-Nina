function apiCall(city) {
let apiKey = "1be83355b3c9da70c189c0df40350020"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(getWeather);
}

apiCall("Amsterdam");

function formatDay (timestamp) {
    let date = new Date(timestamp);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
    return day
}

function formatDate (timestamp){
    let date = new Date(timestamp);
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      let month = months[date.getMonth()];
      let datum = date.getDate();
      let year = date.getFullYear();

      return `${month} ${datum}, ${year}`
}

function formatTime(timestamp){
    let date = new Date(timestamp);
    let hour = "0" + date.getHours();
    let minutes = "0" + date.getMinutes();

    return `${hour.substr(-2)}:${minutes.substr(-2)}`
}

function getWeather (response) {
    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;

    let displayDay = document.querySelector("#day");
    displayDay.innerHTML = formatDay(response.data.dt * 1000);

    let displayDate = document.querySelector("#date");
    displayDate.innerHTML = formatDate(response.data.dt * 1000);

    let displayTime = document.querySelector("#time");
    displayTime.innerHTML = formatTime(response.data.dt * 1000);

    let shownTemp = document.querySelector("#temp");
    shownTemp.innerHTML = Math.round(response.data.main.temp);
    currentCelsius = response.data.main.temp;

    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;

    let currentIcon = document.querySelector("#current-icon");
    currentIcon.src = `images/${response.data.weather[0].icon}.png`
    currentIcon.alt = `${response.data.weather[0].description}`

    let minToday = document.querySelector("#min-today");
    minToday.innerHTML = Math.round(response.data.main.temp_min);
    minTodayCel = response.data.main.temp_min;

    let maxToday = document.querySelector("#max-today");
    maxToday.innerHTML = Math.round(response.data.main.temp_max);
    maxTodayCel = response.data.main.temp_max;

    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed * 3,6);

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;

    let sunrise = document.querySelector("#sunrise");
    sunrise.innerHTML = formatTime(response.data.sys.sunrise * 1000);

    let sunset = document.querySelector("#sunset");
    sunset.innerHTML = formatTime(response.data.sys.sunset * 1000);
  }
  let currentCelsius = null;
  let minTodayCel = null;
  let maxTodayCel = null;

function searchCity(event) {
    event.preventDefault();
    let location = document.querySelector("#search-bar");
    apiCall(location.value);
}
let searchForm = document.querySelector("#search-location");
searchForm.addEventListener("submit", searchCity);

function converttoFahrenheit(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#temp")
    let currentFahr = (currentCelsius * 1.8) + 32;
    currentTemp.innerHTML = Math.round(currentFahr);

    let minToday = document.querySelector("#min-today")
    let minTodayFahr = (minTodayCel * 1.8) + 32;
    minToday.innerHTML = Math.round(minTodayFahr);

    let maxToday = document.querySelector("#max-today")
    let maxTodayFahr = (maxTodayCel * 1.8) + 32;
    maxToday.innerHTML = Math.round(maxTodayFahr);
   
}
let fahrenheitlink = document.querySelector("#fahrenheit-link")
fahrenheitlink.addEventListener("click", converttoFahrenheit)

function converttoCelsius(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#temp")
    currentTemp.innerHTML = Math.round(currentCelsius);
    let minToday = document.querySelector("#min-today")
    minToday.innerHTML = Math.round(minTodayCel);
    let maxToday = document.querySelector("max-today")
    maxToday = Math.round(maxTodayCel);
    

}
let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", converttoCelsius)

/*
LOCATION TRIES AND FAILURES

    let apiKey = "1be83355b3c9da70c189c0df40350020";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
        coordinates.lat}&lon=${coordinates.long}&appid=${apiKey}&units=metric`;
}

function getCoords(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    return [lat, long];
  }

let foo = getCoords();
console.log(foo)
  

function getLocation() {
    navigator.geolocation.getCurrentPosition(getCoords);
  }

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);*/