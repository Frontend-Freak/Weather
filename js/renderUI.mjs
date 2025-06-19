const addedLocations = document.getElementById("addedLocations");
import { savedCity } from "./addFavorites.mjs";
import { temperature } from "./searchCity.mjs";
import { weatherStatus } from "./searchCity.mjs";
import { serverUrl } from "./searchCity.mjs";
import { apiKey } from "./searchCity.mjs";
import { showWeatherIcon } from "./showIcon.mjs";

export function renderFavorite() {
	addedLocations.innerHTML = "";

	savedCity.forEach((weather, index) => {
		const favoriteWeather = document.createElement("div");
		const favoriteCity = document.createElement("div");
		const favoriteTemperature = document.createElement("div");
		const deleteButton = document.createElement("button");
		const addedLocations = document.getElementById("addedLocations");

		favoriteWeather.id = "favoriteWeather";
		favoriteCity.id = "favoriteCity";
		favoriteTemperature.id = "favoriteTemperature";
		deleteButton.id = "deleteButton";
		deleteButton.textContent = "x";

		favoriteWeather.appendChild(favoriteCity);
		favoriteWeather.appendChild(favoriteTemperature);
		favoriteWeather.appendChild(deleteButton);

		favoriteCity.textContent = weather.city;
		favoriteTemperature.textContent = weather.temperature;
		addedLocations.appendChild(favoriteWeather);

		deleteButton.addEventListener("click", () => {
			savedCity.splice(index, 1);
			renderFavorite();
            console.log(savedCity)
		});

		favoriteCity.addEventListener("click", () => {
			const cityName = favoriteCity.textContent;
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
					temperature.textContent =
						Math.floor(celsiusTemperature) + "°C";
					foundCity.textContent = data.name;
					weatherStatus.textContent = data.weather[0].description;
					weatherIcon.innerHTML = "";
					showWeatherIcon(data.weather[0].icon);
				})
				.catch((error) => console.error(error));
		});
	});
}
