import { renderFavorite } from "./renderUI.mjs";
import { serverUrl } from "./searchCity.mjs";
import { apiKey } from "./searchCity.mjs";
import { foundCity } from "./searchCity.mjs";
import { saveToLocalStorageFavorite } from "./local.mjs";
export const addFavoritesBtn = document.getElementById("addToFavoritesBtn");

export const savedCity = [];

export function saveCity(city, lat, lon) {
	const weatherObject = {
		city: city,
		lat: lat,
		lon: lon,
	};
	savedCity.push(weatherObject);
}

export function addFavorites() {
	serverUrl;
	apiKey;
	const cityName = foundCity.textContent;
	const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
	fetch(url)
		.then((response) => {
			if (response.status === 404) {
				throw new Error("Запись не найдена");
			}
			return response.json();
		})
		.then((data) => {
			foundCity.textContent = data.name;
			saveCity(foundCity.textContent, data.coord.lat, data.coord.lon);
			renderFavorite();
			saveToLocalStorageFavorite();
		})
		.catch((error) => console.error(error));
}