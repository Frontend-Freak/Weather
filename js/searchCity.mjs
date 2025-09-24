import { futureTempFetch } from "./futureWeather.mjs";
import { renderMainTemp } from "./renderUI.mjs";
import { getFromLocalStorageCurrent } from "./local.mjs";

export const cityInput = document.getElementById("cityInput");
export const temperature = document.getElementById("temperature");
export const foundCity = document.getElementById("foundCity");
export const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
export const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";
export const addToFavoritesBtn = document.getElementById("addToFavoritesBtn");
export const feelsLike = document.getElementById("feelsLike");
export const sunrise = document.getElementById("sunrise");
export const sunset = document.getElementById("sunset");
export const futureWeather = document.getElementById("futureWeather");

export async function searchCity() {
	const cityName = cityInput.value;
	const citySavedName = getFromLocalStorageCurrent();
	const url = `${serverUrl}?q=${citySavedName || cityName}&appid=${apiKey}&units=metric`;
	try {
		const response = await fetch(url);
		if (!response) {
			return "Страница не найдена";
		}
		const data = await response.json();
		renderMainTemp(data);
		futureTempFetch();
	} catch (error) {
		console.error(error);
	}
}
