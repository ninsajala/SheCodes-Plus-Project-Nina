function apiCall(city) {
let apiKey = "1be83355b3c9da70c189c0df40350020"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(getWeather);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(getComingHours);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(getComingDays);
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


function formatShortDate (timestamp){
  let date = new Date(timestamp);
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      let month = months[date.getMonth()];
      let datum = date.getDate();

      return `${month} ${datum}`

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

    let illustration = document.querySelector("#change-illustration")
    illustration.src = `images/illustration-${response.data.weather[0].icon}.png`
    illustration.alt =  `${response.data.weather[0].description} illustration`
  }
  let currentCelsius = null;
  let minTodayCel = null;
  let maxTodayCel = null;

 function getComingHours (response){
  let comingHours = document.querySelector("#coming-hours");
  comingHours.innerHTML = null;
  let comingHour = null;  

  for (let index = 0; index < 4; index++){
    comingHour = response.data.list[index];
    comingHours.innerHTML += `<div class="col-2 comingHour">${formatTime(comingHour.dt * 1000)}<br>
    <img src="images/${comingHour.weather[0].icon}.png" alt="${comingHour.weather[0].description}" class="comHourIcon"><br>
    <span id="comingHour${index}Cel">${Math.round(comingHour.main.temp)}</span>°
    </div>
    `
  }
  comingHour0Cel = response.data.list[0].main.temp;
  comingHour1Cel = response.data.list[1].main.temp;
  comingHour2Cel = response.data.list[2].main.temp;
  comingHour3Cel = response.data.list[3].main.temp;
 }
 let comingHour0Cel = null;
 let comingHour1Cel = null;
 let comingHour2Cel = null;
 let comingHour3Cel = null;

 function getComingDays(response) {
  let comingDays = document.querySelector("#coming-days");
  comingDays.innerHTML = null;
  let comingDay =  null;
  let position = 7

  for (let index = 0; index < 5; index ++) {
  comingDay = response.data.list[position];
  comingDays.innerHTML +=
  `<li class="comingDay">${formatDay(comingDay.dt * 1000)}<br>
  ${formatShortDate(comingDay.dt * 1000)} <br>
  <img src="images/${comingDay.weather[0].icon}.png" 
  alt="${comingDay.weather[0].description}" 
  class="comDayIcon"><br>
  <strong>
  <span id="comingDay${position}Cel">
  ${Math.round(comingDay.main.temp_min)}</span>°  
  </li>`
  position = position + 8 
  }
  
  comingDay7Cel = response.data.list[7].main.temp;
  comingDay15Cel = response.data.list[15].main.temp;
  comingDay23Cel = response.data.list[23].main.temp;
  comingDay31Cel = response.data.list[31].main.temp;
  comingDay39Cel = response.data.list[39].main.temp;

}
  
  
  let comingDay7Cel = null;
  let comingDay15Cel = null;
  let comingDay23Cel = null;
  let comingDay31Cel = null;
  let comingDay39Cel = null;
  

function searchCity(event) {
    event.preventDefault();
    let location = document.querySelector("#search-bar");
    apiCall(location.value);
}
let searchForm = document.querySelector("#search-location");
searchForm.addEventListener("submit", searchCity);

function converttoFahrenheit(event) {
    event.preventDefault();
    fahrenheitlink.classList.add("active");
    celsiuslink.classList.remove("active");
    let currentTemp = document.querySelector("#temp")
    let currentFahr = (currentCelsius * 1.8) + 32;
    currentTemp.innerHTML = Math.round(currentFahr);

    let minToday = document.querySelector("#min-today")
    let minTodayFahr = (minTodayCel * 1.8) + 32;
    minToday.innerHTML = Math.round(minTodayFahr);

    let maxToday = document.querySelector("#max-today")
    let maxTodayFahr = (maxTodayCel * 1.8) + 32;
    maxToday.innerHTML = Math.round(maxTodayFahr);

    let comingHour0CelElement = document.querySelector("#comingHour0Cel")
    let comingHour0Fahr = (comingHour0Cel * 1.8) + 32;
    comingHour0CelElement.innerHTML = Math.round(comingHour0Fahr);

    let comingHour1CelElement = document.querySelector("#comingHour1Cel")
    let comingHour1Fahr = (comingHour1Cel * 1.8) + 32;
    comingHour1CelElement.innerHTML = Math.round(comingHour1Fahr);

    let comingHour2CelElement = document.querySelector("#comingHour2Cel")
    let comingHour2Fahr = (comingHour2Cel * 1.8) + 32;
    comingHour2CelElement.innerHTML = Math.round(comingHour2Fahr);

    let comingHour3CelElement = document.querySelector("#comingHour3Cel")
    let comingHour3Fahr = (comingHour3Cel * 1.8) + 32;
    comingHour3CelElement.innerHTML = Math.round(comingHour3Fahr);

    let comingDay7CelElement = document.querySelector("#comingDay7Cel")
    let comingDay7Fahr = (comingDay7Cel * 1.8) + 32;
    comingDay7CelElement.innerHTML =  Math.round(comingDay7Fahr)

    let comingDay15CelElement = document.querySelector("#comingDay15Cel")
    let comingDay15Fahr = (comingDay15Cel * 1.8) + 32;
    comingDay15CelElement.innerHTML =  Math.round(comingDay15Fahr)

    let comingDay23CelElement = document.querySelector("#comingDay23Cel")
    let comingDay23Fahr = (comingDay23Cel * 1.8) + 32;
    comingDay23CelElement.innerHTML =  Math.round(comingDay23Fahr)

    let comingDay31CelElement = document.querySelector("#comingDay31Cel")
    let comingDay31Fahr = (comingDay31Cel * 1.8) + 32;
    comingDay31CelElement.innerHTML =  Math.round(comingDay31Fahr)

    let comingDay39CelElement = document.querySelector("#comingDay39Cel")
    let comingDay39Fahr = (comingDay39Cel * 1.8) + 32;
    comingDay39CelElement.innerHTML =  Math.round(comingDay39Fahr)
  

}
let fahrenheitlink = document.querySelector("#fahrenheit-link")
fahrenheitlink.addEventListener("click", converttoFahrenheit)

function converttoCelsius(event) {
    event.preventDefault();
    celsiuslink.classList.add("active");
    fahrenheitlink.classList.remove("active");

    let currentTemp = document.querySelector("#temp")
    currentTemp.innerHTML = Math.round(currentCelsius);

    let minToday = document.querySelector("#min-today")
    minToday.innerHTML = Math.round(minTodayCel);

    let maxToday = document.querySelector("#max-today")
    maxToday.innerHTML = Math.round(maxTodayCel);

    let comingHour0CelElement = document.querySelector("#comingHour0Cel")
    comingHour0CelElement.innerHTML = Math.round(comingHour0Cel);

    let comingHour1CelElement = document.querySelector("#comingHour1Cel")
    comingHour1CelElement.innerHTML = Math.round(comingHour1Cel);

    let comingHour2CelElement = document.querySelector("#comingHour2Cel")
    comingHour2CelElement.innerHTML = Math.round(comingHour2Cel);

    let comingHour3CelElement = document.querySelector("#comingHour3Cel")
    comingHour3CelElement.innerHTML = Math.round(comingHour3Cel);

    let comingDay7CelElement = document.querySelector("#comingDay7Cel")
    comingDay7CelElement.innerHTML = Math.round(comingDay7Cel);

    let comingDay15CelElement = document.querySelector("#comingDay15Cel")
    comingDay15CelElement.innerHTML = Math.round(comingDay15Cel);

    let comingDay23CelElement = document.querySelector("#comingDay23Cel")
    comingDay23CelElement.innerHTML = Math.round(comingDay23Cel);

    let comingDay31CelElement = document.querySelector("#comingDay31Cel")
    comingDay31CelElement.innerHTML = Math.round(comingDay31Cel);

    let comingDay39CelElement = document.querySelector("#comingDay39Cel")
    comingDay39CelElement.innerHTML = Math.round(comingDay39Cel);

}
let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", converttoCelsius)

function getCoords(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    let apiKey = "1be83355b3c9da70c189c0df40350020"
    let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(geoUrl).then(getCity);
  }

  function getCity(response){
      apiCall(response.data.name);
  }

let longitude = null;
let latitude = null

  
function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCoords);
  }

let currentLocation = document.querySelector(".locLink");
currentLocation.addEventListener("click", getLocation);