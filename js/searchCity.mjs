import { futureTempFetch } from "./futureWeather.mjs";
import { renderMainTemp } from "./renderUI.mjs";

export const cityInput = document.getElementById("cityInput");
export const temperature = document.getElementById("temperature");
export const foundCity = document.getElementById("foundCity");
export const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
export const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";
export const addToFavoritesBtn = document.getElementById("addToFavoritesBtn");
export const feelsLike = document.getElementById("feelsLike");
export const sunrise = document.getElementById("sunrise");
export const sunset = document.getElementById("sunset");
export const futureWeather = document.getElementById('futureWeather')

/* function saveCityToLocal(city) {
	localStorage.setItem('lastSearchedCity', city);
} */

export function searchCity() {
	const cityName = cityInput.value;
	const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

	fetch(url)
		.then((response) => {
			if (response.status === 404) {
				throw new Error("Запись не найдена");
			}
			return response.json();
		})
		.then((data) => {
			renderMainTemp(data);
			//saveCityToLocal(data.name); 
			futureTempFetch();

		})
		.catch((error) => console.error(error));
}

/* function loadLastSearchedCity() {
	const lastSearchedCity = localStorage.getItem('lastSearchedCity');
	if (lastSearchedCity) {
		cityInput.value = lastSearchedCity;
		searchCity();
	}
}

document.addEventListener('DOMContentLoaded', loadLastSearchedCity); */