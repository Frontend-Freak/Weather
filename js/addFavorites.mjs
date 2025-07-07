import { renderFavorite } from "./renderUI.mjs";
import { serverUrl } from "./searchCity.mjs";
import { apiKey } from "./searchCity.mjs";
import { foundCity } from "./searchCity.mjs";
//import { loadFavoriteCities } from "./saveInLocalStorage.mjs";
export const addFavoritesBtn = document.getElementById("addToFavoritesBtn");

export const savedCity = [];

function saveCity(city, lat, lon) {
	const weatherObject = {
		city: city,
		lat: lat,
		lon: lon,
	};
	savedCity.push(weatherObject);
	localStorage.setItem('favoriteCities', JSON.stringify(savedCity));
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
			console.log(savedCity)

			

		})
		.catch((error) => console.error(error));
}


function loadFavoriteCities() {
	const savedCities = JSON.parse(localStorage.getItem('favoriteCities'));
	if (savedCities) {
		savedCity.push(...savedCities);
	}
}

document.addEventListener('DOMContentLoaded', () => {
    loadFavoriteCities();
    renderFavorite();
});