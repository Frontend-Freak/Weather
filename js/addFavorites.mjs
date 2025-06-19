export const addFavoritesBtn = document.getElementById("addToFavoritesBtn");
import { renderFavorite } from "./renderUI.mjs";
import { serverUrl } from "./searchCity.mjs";
import { apiKey } from "./searchCity.mjs";
import { foundCity } from "./searchCity.mjs";
import { temperature } from "./searchCity.mjs";
import { weatherStatus } from "./searchCity.mjs";

export const savedCity = [];

function saveCity(city, temp, desc) {
	const weatherObject = {
		city: city,
		temperature: temp,
		description: desc,
	};

	savedCity.push(weatherObject);
	console.log(savedCity);
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
			const kelvinTemperature = data.main.temp;
			const celsiusTemperature = kelvinTemperature - 273.15;
			temperature.textContent = Math.floor(celsiusTemperature) + "°C";
			foundCity.textContent = data.name;
			weatherStatus.textContent = data.weather[0].description;

			saveCity(
				foundCity.textContent,
				temperature.textContent,
				weatherStatus.textContent
			);
			renderFavorite();
		})
		.catch((error) => console.error(error))
}
