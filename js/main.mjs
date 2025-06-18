const searchForm = document.getElementById("searchString");



import { searchCity } from "./searchCity.mjs";
import { addFavoritesBtn } from "./addFavorites.mjs";
import { addFavorites } from "./addFavorites.mjs";



searchForm.addEventListener("submit", (event) => {
	event.preventDefault();
	searchCity();
});

addFavoritesBtn.addEventListener("click", addFavorites);
