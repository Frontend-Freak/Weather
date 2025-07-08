import { savedCity } from "./addFavorites.mjs";
import { renderFavorite } from "./renderUI.mjs";
import { saveCity } from "./addFavorites.mjs";

export function saveToLocalStorage() {
	localStorage.setItem("savedCity", JSON.stringify(savedCity));
	console.log(savedCity);
}

export function getFromLocalStorage() {
	const savedCities = localStorage.getItem("savedCity");

	if (savedCities) {
        const savedCities111 = JSON.parse(savedCities)
        savedCities111.forEach(element => {
            saveCity(element.city, element.lat, element.lon)
        })
	}
}
