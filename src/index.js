function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day}, ${hours}:${minutes}`;
}

let currentDate = document.querySelector("#current-date");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

function currentLocationsSearch(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = `d36264de255bf95da0a082dd213ebaf4`;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(currentLocationsSearch);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityPlace = document.querySelector("#city-place");
  let cityInput = document.querySelector("#city-input");
  cityPlace.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function searchCity(city) {
  let units = "metric";
  let apiKey = `d36264de255bf95da0a082dd213ebaf4`;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  let cityPlace = document.querySelector("#city-place");
  let cityInput = document.querySelector("#city-input");
  cityPlace.innerHTML = cityInput.value;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);

  let heading = document.querySelector("#city-temp");
  heading.innerHTML = `${temperature}°C`;
}
