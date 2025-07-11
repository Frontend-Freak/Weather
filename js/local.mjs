import { savedCity } from "./addFavorites.mjs";
import { saveCity } from "./addFavorites.mjs";
import { cityInput } from "./searchCity.mjs";

export function saveToLocalStorageFavorite() {
	localStorage.setItem("savedCity", JSON.stringify(savedCity));
}

export function getFromLocalStorageFavorite() {
	const savedFavoriteCities = localStorage.getItem("savedCity");
	if (savedFavoriteCities) {
        const savedCities = JSON.parse(savedFavoriteCities)
        savedCities.forEach(element => {
            saveCity(element.city)
        })
	}
}

export function saveToLocalStorageCurrent(){
    const foundCity = cityInput.value;
    localStorage.setItem('lastFoundedCity', foundCity)
}

export function getFromLocalStorageCurrent(){
    const savedCurrentCity = localStorage.getItem('lastFoundedCity')
    if(savedCurrentCity){
        return savedCurrentCity
    } else {
        return ''
    }
}