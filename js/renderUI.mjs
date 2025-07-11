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

const addedLocations = document.getElementById("addedLocations");

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


export function renderFavorite() {
	addedLocations.innerHTML = "";

	savedCity.forEach((city, index) => {
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

		favoriteCity.textContent = city.city;
		addedLocations.appendChild(favoriteWeather);

		deleteButton.addEventListener("click", () => {
			savedCity.splice(index, 1);
			renderFavorite();
			saveToLocalStorageFavorite();
		});


		
		favoriteCity.addEventListener("click", async () => {
			const serverUrlCurrent = "https://api.openweathermap.org/data/2.5/weather";
			const serverUrlForecast = "https://api.openweathermap.org/data/2.5/forecast";
			const cityName = favoriteCity.textContent;
			const urlCurrentWeather = `${serverUrlCurrent}?q=${cityName}&appid=${apiKey}&units=metric`;
			const urlForecastWeather = `${serverUrlForecast}?q=${cityName}&appid=${apiKey}&units=metric`;

			try{
				const responseCurrentWeather = await fetch(urlCurrentWeather);
				const responseForecastWeather = await fetch(urlForecastWeather);


				if(!responseCurrentWeather.ok || !responseForecastWeather.ok){
					return 'Запись не найдена'
				}
				const dataCurrentWeather = await responseCurrentWeather.json();
				const dataForecastWeather = await responseForecastWeather.json();

				foundCity.textContent = dataCurrentWeather.name;
				temperature.textContent = Math.floor(dataCurrentWeather.main.temp) + "°C";
				feelsLike.textContent = `Ощущается как: ${Math.floor(dataCurrentWeather.main.feels_like)}°C`;
				sunrise.textContent = `Восход: ${convertUnixToNormalTime(dataCurrentWeather.sys.sunrise)}`;
				sunset.textContent = `Закат: ${convertUnixToNormalTime(dataCurrentWeather.sys.sunset)}`;
				weatherIcon.innerHTML = "";
				showWeatherIcon(dataCurrentWeather.weather[0].icon);

				let futureArray = []

				futureArray = dataForecastWeather.list.slice(1, 4);
				renderFutureTemp(futureArray);
			} catch(error){
				console.error(error)
			}
				});
		});
	};