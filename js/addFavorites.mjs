export const addFavoritesBtn = document.getElementById("addToFavoritesBtn");


let isFavorites = false;

export function addFavorites() {
	if (isFavorites) {
		addFavoritesBtn.className = "added";
		isFavorites = false;
	} else {
		addFavoritesBtn.classList.remove("added");
		isFavorites = true;
	}
}