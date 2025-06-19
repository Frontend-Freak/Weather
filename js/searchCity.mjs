import { showWeatherIcon } from "./showIcon.mjs";

export const cityInput = document.getElementById("cityInput");
export const temperature = document.getElementById("temperature");
export const foundCity = document.getElementById("foundCity");
const weatherIcon = document.getElementById("weatherIcon");
export const weatherStatus = document.getElementById("weatherStatus");
export const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
export const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";

export function searchCity() {
	const cityName = cityInput.value;
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
			weatherIcon.innerHTML = "";
			showWeatherIcon(data.weather[0].icon);
		})
		.catch((error) => console.error(error));
}