import { renderFavorite } from "./renderUI.mjs";
import { serverUrl } from "./searchCity.mjs";
import { apiKey } from "./searchCity.mjs";
import { foundCity } from "./searchCity.mjs";
import { saveToLocalStorageFavorite } from "./local.mjs";
export const addFavoritesBtn = document.getElementById("addToFavoritesBtn");

export const savedCity = [];

export function saveCity(city) {
	const weatherObject = {
		city: city,
	};
	savedCity.push(weatherObject);
}

export async function addFavorites() {
	serverUrl;
	apiKey;
	const cityName = foundCity.textContent;
	const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			return "Страница не найдена";
		}
		const data = await response.json();
		foundCity.textContent = data.name;
		saveCity(foundCity.textContent);
		renderFavorite();
		saveToLocalStorageFavorite();
		console.log(savedCity);
	} catch (error) {
		console.error(error);
	}
}
