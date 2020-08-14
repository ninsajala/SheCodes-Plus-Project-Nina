function showTime() {
    let date = new Date();
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
    let hour = "0" + date.getHours();
    let minutes = "0" + date.getMinutes();
    let displayDate = document.querySelector("#date");
    displayDate.innerHTML = `${day} <br> ${month} ${datum}, ${year}<br>${hour.substr(-2)}:${minutes.substr(-2)}`;
    
  }
  showTime();




  function defaultLocation() {
    let apiKey = "1be83355b3c9da70c189c0df40350020";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=${apiKey}&units=metric`;
    function getWeather(response) {
      let city = document.querySelector(".city");
      city.innerHTML = response.data.name;
      let shownTemp = document.querySelector("#temp");
      shownTemp.innerHTML = Math.round(response.data.main.temp);
      let minToday = document.querySelector("#min-today");
      minToday.innerHTML = Math.round(response.data.main.temp_min);
      let maxToday = document.querySelector("#max-today");
      maxToday.innerHTML = Math.round(response.data.main.temp_max);
      let windSpeed = document.querySelector("#wind-speed");
      windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = response.data.main.humidity;
      let riseStamp = response.data.sys.sunrise;
      let riseDate = new Date(riseStamp * 1000);
      let riseHours = "0" + riseDate.getHours();
      let riseMinutes = "0" + riseDate.getMinutes();
      let sunrise = document.querySelector("#sunrise");
      sunrise.innerHTML = riseHours.substr(-2) + ':' + riseMinutes.substr(-2);
      let setStamp = response.data.sys.sunset;
      let setDate = new Date(setStamp * 1000);
      let setHours = "0" + setDate.getHours();
      let setMinutes = "0" + setDate.getMinutes();
      let sunset = document.querySelector("#sunset");
      sunset.innerHTML = setHours.substr(-2) + ':' + setMinutes.substr(-2);
      let description = document.querySelector("#description");
      description.innerHTML = response.data.weather[0].description;
      let currentIconId = response.data.weather[0].icon
      let currentIcon = document.querySelector("#current-icon");
      currentIcon.src = `images/${currentIconId}.png`
    }
    axios.get(apiUrl).then(getWeather);
    
  }
  defaultLocation()

  function switchCity(event) {
    event.preventDefault();
    let location = document.querySelector("#search-bar");
    let city = document.querySelector("#city");
    city.innerHTML = `${location.value}`;
  
    let apiKey = "1be83355b3c9da70c189c0df40350020";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${
      location.value
    }&appid=${apiKey}&units=metric`;
  
    function getWeather(response) {
        let shownTemp = document.querySelector("#temp");
        shownTemp.innerHTML = Math.round(response.data.main.temp);
        let minToday = document.querySelector("#min-today");
        minToday.innerHTML = Math.round(response.data.main.temp_min);
        let maxToday = document.querySelector("#max-today");
        maxToday.innerHTML = Math.round(response.data.main.temp_max);
        let windSpeed = document.querySelector("#wind-speed");
        windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
        let humidity = document.querySelector("#humidity");
        humidity.innerHTML = response.data.main.humidity;
        let riseStamp = response.data.sys.sunrise;
        let riseDate = new Date(riseStamp * 1000);
        let riseHours = "0" + riseDate.getHours();
        let riseMinutes = "0" + riseDate.getMinutes();
        let sunrise = document.querySelector("#sunrise");
        sunrise.innerHTML = riseHours.substr(-2) + ':' + riseMinutes.substr(-2);
        let setStamp = response.data.sys.sunset;
        let setDate = new Date(setStamp * 1000);
        let setHours = "0" + setDate.getHours();
        let setMinutes = "0" + setDate.getMinutes();
        let sunset = document.querySelector("#sunset");
        sunset.innerHTML = setHours.substr(-2) + ':' + setMinutes.substr(-2);
        let description = document.querySelector("#description");
        description.innerHTML = response.data.weather[0].description;
        let currentIconId = response.data.weather[0].icon
        let currentIcon = document.querySelector("#current-icon");
        currentIcon.src = `http://openweathermap.org/img/wn/${currentIconId}@2x.png`
    }
    axios.get(apiURL).then(getWeather);
  }
  let searchForm = document.querySelector("#search-location");
  searchForm.addEventListener("submit", switchCity);

  function toCurrentLocation(event) {
    navigator.geolocation.getCurrentPosition(getCoords);
    function getCoords(position) {
      let apiKey = "1be83355b3c9da70c189c0df40350020";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
        position.coords.latitude
      }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
      function getWeather(response) {
        let city = document.querySelector(".city");
        city.innerHTML = response.data.name;
        let shownTemp = document.querySelector("#temp");
        shownTemp.innerHTML = Math.round(response.data.main.temp);
        let minToday = document.querySelector("#min-today");
        minToday.innerHTML = Math.round(response.data.main.temp_min);
        let maxToday = document.querySelector("#max-today");
        maxToday.innerHTML = Math.round(response.data.main.temp_max);
        let windSpeed = document.querySelector("#wind-speed");
        windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
        let humidity = document.querySelector("#humidity");
        humidity.innerHTML = response.data.main.humidity;
        let riseStamp = response.data.sys.sunrise;
        let riseDate = new Date(riseStamp * 1000);
        let riseHours = "0" + riseDate.getHours();
        let riseMinutes = "0" + riseDate.getMinutes();
        let sunrise = document.querySelector("#sunrise");
        sunrise.innerHTML = riseHours.substr(-2) + ':' + riseMinutes.substr(-2);
        let setStamp = response.data.sys.sunset;
        let setDate = new Date(setStamp * 1000);
        let setHours = "0" + setDate.getHours();
        let setMinutes = "0" + setDate.getMinutes();
        let sunset = document.querySelector("#sunset");
        sunset.innerHTML = setHours.substr(-2) + ':' + setMinutes.substr(-2);
        let description = document.querySelector("#description");
        description.innerHTML = response.data.weather[0].description;
        let currentIconId = response.data.weather[0].icon
        let currentIcon = document.querySelector("#current-icon");
        currentIcon.src = `http://openweathermap.org/img/wn/${currentIconId}@2x.png`
      }
  
      axios.get(apiUrl).then(getWeather);
    }
  }
  let currentLocation = document.querySelector("#current-location");
  currentLocation.addEventListener("click", toCurrentLocation);