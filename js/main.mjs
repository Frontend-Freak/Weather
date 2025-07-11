import { searchCity } from "./searchCity.mjs";
import { addFavoritesBtn } from "./addFavorites.mjs";
import { addFavorites } from "./addFavorites.mjs";
import { renderFavorite } from "./renderUI.mjs";
import { cityInput } from "./searchCity.mjs";
import { getFromLocalStorageFavorite} from "./local.mjs";
import { saveToLocalStorageCurrent } from "./local.mjs";
const searchForm = document.getElementById("searchString");


if(!cityInput.value){
	searchCity()
}

getFromLocalStorageFavorite()
renderFavorite()

searchForm.addEventListener("submit", (event) => {
	event.preventDefault();

	saveToLocalStorageCurrent();
	searchCity();
	
	cityInput.value = "";
});

addFavoritesBtn.addEventListener("click", () => {
	addFavorites();
	renderFavorite();
});