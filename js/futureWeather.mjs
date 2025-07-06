import { renderFutureTemp } from "./renderUI.mjs";
import { apiKey } from "./searchCity.mjs";

export const coordCity = {
	lat: "",
	lon: "",
};

export let futureArray = [];

export function futureTempFetch() {
    const serverUrl = "https://api.openweathermap.org/data/2.5/forecast";
    const cityLat = coordCity.lat;
    const cityLon = coordCity.lon;
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
        })
        .catch((error) => console.error(error));
}