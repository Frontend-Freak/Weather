import { savedCity } from "./addFavorites.mjs";
import { apiKey } from "./searchCity.mjs";
import { showWeatherIcon } from "./showIcon.mjs";
import { foundCity } from "./searchCity.mjs";
import { futureWeather } from "./searchCity.mjs";
import { convertUnixToNormalTime } from "./utils.mjs";
import { feelsLike } from "./searchCity.mjs";
import { sunrise } from "./searchCity.mjs";
import { sunset } from "./searchCity.mjs";
import { saveToLocalStorageFavorite } from "./local.mjs";

export function renderMainTemp(data) {
	addToFavoritesBtn.textContent = "♡";
	temperature.textContent = Math.floor(data.main.temp) + "°C";
	foundCity.textContent = data.name;
	weatherIcon.innerHTML = "";
	feelsLike.textContent = "Ощущается как: " + Math.floor(data.main.feels_like) + "°C";
	sunrise.textContent = "Восход: " + convertUnixToNormalTime(data.sys.sunrise);
	sunset.textContent = "Закат: " + convertUnixToNormalTime(data.sys.sunset);
	showWeatherIcon(data.weather[0].icon);
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

		futureWeatherTime.textContent = convertUnixToNormalTime(futureWeatherData.dt);
		futureTemp.textContent = Math.floor(futureWeatherData.main.temp) + "°C";
		futureFeelsLike.textContent = Math.floor(futureWeatherData.main.feels_like) + "°C";

		futureWeather.appendChild(futureWeatherItem);
		futureWeatherItem.appendChild(futureWeatherTime);
		futureWeatherItem.appendChild(futureWeatherDescription);
		futureWeatherDescription.appendChild(futureTemp);
		futureWeatherDescription.appendChild(futureFeelsLike);
	});
}

function clearFavoriteList() {
	const addedLocations = document.getElementById("addedLocations");
	addedLocations.innerHTML = "";
}

function createFavoriteElement(city, index) {
	const favoriteWeather = document.createElement("div");
	const favoriteCity = document.createElement("div");
	const deleteButton = document.createElement("button");

	favoriteWeather.id = "favoriteWeather";
	favoriteCity.id = "favoriteCity";
	deleteButton.id = "deleteButton";
	deleteButton.textContent = "x";

	favoriteCity.textContent = city.city;

	favoriteWeather.appendChild(favoriteCity);
	favoriteWeather.appendChild(deleteButton);

	deleteButton.addEventListener("click", () => handleDeleteFavorite(index));
	favoriteCity.addEventListener("click", () => handleClickFavorite(city.city));

	return favoriteWeather;
}

function handleDeleteFavorite(index) {
	savedCity.splice(index, 1);
	renderFavorite();
	saveToLocalStorageFavorite();
}

async function handleClickFavorite(cityName) {
	const serverUrlCurrent = "https://api.openweathermap.org/data/2.5/weather";
	const serverUrlForecast = "https://api.openweathermap.org/data/2.5/forecast";

	const urlCurrentWeather = `${serverUrlCurrent}?q=${cityName}&appid=${apiKey}&units=metric`;
	const urlForecastWeather = `${serverUrlForecast}?q=${cityName}&appid=${apiKey}&units=metric`;

	try {
		const [resCurrent, resForecast] = await Promise.all([fetch(urlCurrentWeather), fetch(urlForecastWeather)]);

		if (!resCurrent.ok || !resForecast.ok) {
			console.error("Город не найден");
			return;
		}

		const dataCurrent = await resCurrent.json();
		const dataForecast = await resForecast.json();

		foundCity.textContent = dataCurrent.name;
		temperature.textContent = Math.floor(dataCurrent.main.temp) + "°C";
		feelsLike.textContent = `Ощущается как: ${Math.floor(dataCurrent.main.feels_like)}°C`;
		sunrise.textContent = `Восход: ${convertUnixToNormalTime(dataCurrent.sys.sunrise)}`;
		sunset.textContent = `Закат: ${convertUnixToNormalTime(dataCurrent.sys.sunset)}`;
		weatherIcon.innerHTML = "";
		showWeatherIcon(dataCurrent.weather[0].icon);

		const futureArray = dataForecast.list.slice(1, 4);
		renderFutureTemp(futureArray);
	} catch (err) {
		console.error("Ошибка при получении данных", err);
	}
}

export function renderFavorite() {
	clearFavoriteList();

	const addedLocations = document.getElementById("addedLocations");

	savedCity.forEach((city, index) => {
		const favoriteElement = createFavoriteElement(city, index);
		addedLocations.appendChild(favoriteElement);
	});
}
