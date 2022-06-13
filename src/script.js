let now = new Date();
let h3 = document.querySelector(`h3`);
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[now.getDay()];
h3.innerHTML = `${day}, ${hours}:${minutes}`;

function convertToFahrenheit(event) {
  event.preventDefault();
  let farhElement = document.querySelector(`#temperature`);
  farhElement.innerHTML = `77º`;
}
let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener(`click`, convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let celsElement = document.querySelector(`#temperature`);
  celsElement.innerHTML = `25º`;
}
let celsiusLink = document.querySelector(`#celsius-link`);
celsiusLink.addEventListener(`click`, convertToCelsius);

function showTemperature(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temp-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function searchCity(city) {
  let apiKey = `ec906dafd44a254d26b9dd410c431070`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector(`#search-form`);
form.addEventListener(`submit`, callSubmit);

function callSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(`#search-input`).value;
  searchCity(city);
}
