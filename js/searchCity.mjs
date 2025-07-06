import { futureTempFetch } from "./futureWeather.mjs";
import { renderMainTemp } from "./renderUI.mjs";

export const cityInput = document.getElementById("cityInput");
export const temperature = document.getElementById("temperature");
export const foundCity = document.getElementById("foundCity");
const weatherIcon = document.getElementById("weatherIcon");
export const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
export const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";
export const addToFavoritesBtn = document.getElementById("addToFavoritesBtn");
export const feelsLike = document.getElementById("feelsLike");
export const sunrise = document.getElementById("sunrise");
export const sunset = document.getElementById("sunset");
export const futureWeather = document.getElementById('futureWeather')


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
			renderMainTemp(data)
			futureTempFetch();
		})
		.catch((error) => console.error(error));
}