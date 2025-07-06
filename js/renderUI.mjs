import { savedCity } from "./addFavorites.mjs";
import { serverUrl } from "./searchCity.mjs";
import { apiKey } from "./searchCity.mjs";
import { showWeatherIcon } from "./showIcon.mjs";
import { foundCity } from "./searchCity.mjs";
import { futureWeather } from "./searchCity.mjs";
import { convertUnixToNormalTime } from "./utils.mjs";
import { coordCity } from "./futureWeather.mjs";
import { feelsLike } from "./searchCity.mjs";
import { sunrise } from "./searchCity.mjs";
import { sunset } from "./searchCity.mjs";
const addedLocations = document.getElementById("addedLocations");


export function renderMainTemp(data) {
	addToFavoritesBtn.textContent = "♡";
	temperature.textContent = Math.floor(data.main.temp) + "°C";
	foundCity.textContent = data.name;
	weatherIcon.innerHTML = "";
	feelsLike.textContent =
		"Ощущается как: " + Math.floor(data.main.feels_like) + "°C";
	sunrise.textContent =
		"Восход: " + convertUnixToNormalTime(data.sys.sunrise);
	sunset.textContent = "Закат: " + convertUnixToNormalTime(data.sys.sunset);
	showWeatherIcon(data.weather[0].icon);

	coordCity.lat = data.coord.lat;
	coordCity.lon = data.coord.lon;
}


export function renderFutureTemp(futureArray) {
	futureWeather.innerHTML = "";

	futureArray.forEach((futureWeatherData, index) => {
		const futureWeatherItem = document.createElement("div");
		const futureWeatherTime = document.createElement("div");
		const futureWeatherDescription = document.createElement("div");
		const futureTemp = document.createElement("div");
		const futureFeelsLike = document.createElement("div");

		futureWeatherItem.className = "future__weather-item";
		futureWeatherTime.className = "future__weather-time";
		futureWeatherDescription.className = "future__temperature-desc";
		futureTemp.className = "future__temperature";
		futureFeelsLike.className = "future__feels__like";

		futureWeatherTime.textContent = convertUnixToNormalTime(
			futureWeatherData.dt
		);
		futureTemp.textContent = Math.floor(futureWeatherData.main.temp) + "°C";
		futureFeelsLike.textContent =
			Math.floor(futureWeatherData.main.feels_like) + "°C";

		futureWeather.appendChild(futureWeatherItem);
		futureWeatherItem.appendChild(futureWeatherTime);
		futureWeatherItem.appendChild(futureWeatherDescription);
		futureWeatherDescription.appendChild(futureTemp);
		futureWeatherDescription.appendChild(futureFeelsLike);
	});
}


export function renderFavorite() {
	addedLocations.innerHTML = "";

	savedCity.forEach((weather, index) => {
		const favoriteWeather = document.createElement("div");
		const favoriteCity = document.createElement("div");
		const deleteButton = document.createElement("button");
		const addedLocations = document.getElementById("addedLocations");

		favoriteWeather.id = "favoriteWeather";
		favoriteCity.id = "favoriteCity";
		deleteButton.id = "deleteButton";
		deleteButton.textContent = "x";

		favoriteWeather.appendChild(favoriteCity);
		favoriteWeather.appendChild(deleteButton);

		favoriteCity.textContent = weather.city;
		addedLocations.appendChild(favoriteWeather);

		deleteButton.addEventListener("click", () => {
			savedCity.splice(index, 1);
			renderFavorite();
			console.log(savedCity);
		});

		favoriteCity.addEventListener("click", () => {
			const cityName = favoriteCity.textContent;
			const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

			fetch(url)
				.then((response) => {
					if (response.status === 404) {
						throw new Error("Запись не найдена");
					}
					return response.json();
				})
				.then((data) => {
					foundCity.textContent = data.name;
					temperature.textContent = Math.floor(data.main.temp) + "°C";
					feelsLike.textContent = `Ощущается как: ${Math.floor(data.main.feels_like)}°C`;
					sunrise.textContent = `Восход: ${convertUnixToNormalTime(data.sys.sunrise)}`;
					sunset.textContent = `Закат: ${convertUnixToNormalTime(data.sys.sunset)}`;
					weatherIcon.innerHTML = "";
					showWeatherIcon(data.weather[0].icon);

					let futureArray = []
					const serverUrl = "https://api.openweathermap.org/data/2.5/forecast";
					const cityLat = data.coord.lat;
					const cityLon = data.coord.lon;
					const url = `${serverUrl}?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=metric`;
					fetch(url)
						.then((response) => {
							if (response.status === 404) {
								throw new Error("Запись не найдена");
							}
						return response.json();
						})
						.then((data) => {
							futureArray = data.list.slice(1, 4);
            				renderFutureTemp(futureArray);
						});
				});
		});
	});
}
