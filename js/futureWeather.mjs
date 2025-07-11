import { renderFutureTemp } from "./renderUI.mjs";
import { apiKey } from "./searchCity.mjs";
import { foundCity } from "./searchCity.mjs";

export let futureArray = [];

export function futureTempFetch() {
    const serverUrl = "https://api.openweathermap.org/data/2.5/forecast";
    const cityName = foundCity.textContent;
    
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                console.log(cityName)
                throw new Error("Запись не найдена");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
            futureArray = data.list.slice(1, 4);
            renderFutureTemp(futureArray);
        })
        .catch((error) => console.error(error));
}