import { searchCity } from "./searchCity.mjs";
import { addFavoritesBtn } from "./addFavorites.mjs";
import { addFavorites } from "./addFavorites.mjs";
import { renderFavorite } from "./renderUI.mjs";
import { cityInput } from "./searchCity.mjs";
import { saveToLocalStorage } from "./local.mjs";
import { getFromLocalStorage } from "./local.mjs";

getFromLocalStorage()
renderFavorite()


const searchForm = document.getElementById("searchString");

searchForm.addEventListener("submit", (event) => {
	event.preventDefault();
	searchCity();
	cityInput.value = "";
});

addFavoritesBtn.addEventListener("click", () => {
	addFavorites();
	renderFavorite();
});