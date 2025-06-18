import { showWeatherIcon } from "./showIcon.mjs";


const cityInput = document.getElementById("cityInput");
const temperature = document.getElementById("temperature");
const foundCity = document.getElementById("foundCity");
const weatherIcon = document.getElementById('weatherIcon')
const weatherStatus = document.getElementById("weatherStatus");

export function searchCity() {
    const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
    const cityName = cityInput.value;
    const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

    fetch(url)
        .then((response) => {
            if (response.status === 404) {
                throw new Error("Запись не найдена");
            }
            return response.json();
        })
        .then((data) => {
            const kelvinTemperature = data.main.temp;
            const celsiusTemperature = kelvinTemperature - 273.15;
            temperature.textContent = Math.floor(celsiusTemperature) + "°C";
            foundCity.textContent = data.name;
            weatherStatus.textContent = data.weather[0].description;
            weatherIcon.innerHTML = ''
            showWeatherIcon(data.weather[0].icon)
        })
        .catch((error) => console.error(error));
}