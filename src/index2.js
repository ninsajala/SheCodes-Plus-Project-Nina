let apiKey = "1be83355b3c9da70c189c0df40350020"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=${apiKey}&units=metric`

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

    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;

    let currentIcon = document.querySelector("#current-icon");
    currentIcon.src = `images/${response.data.weather[0].icon}.png`
    currentIcon.alt = `${response.data.weather[0].description}`

    let minToday = document.querySelector("#min-today");
    minToday.innerHTML = Math.round(response.data.main.temp_min);

    let maxToday = document.querySelector("#max-today");
    maxToday.innerHTML = Math.round(response.data.main.temp_max);

    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed * 3,6);

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;

    let sunrise = document.querySelector("#sunrise");
    sunrise.innerHTML = formatTime(response.data.sys.sunrise * 1000);

    let sunset = document.querySelector("#sunset");
    sunset.innerHTML = formatTime(response.data.sys.sunset * 1000);
  }

  axios.get(apiUrl).then(getWeather);