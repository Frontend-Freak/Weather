import { renderFutureTemp } from "./renderUI.mjs";
import { apiKey } from "./searchCity.mjs";
import { foundCity } from "./searchCity.mjs";

export let futureArray = [];

export async function futureTempFetch() {
    const serverUrl = "https://api.openweathermap.org/data/2.5/forecast";
    const cityName = foundCity.textContent;
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    try{
        const response = await fetch(url)
        if(!response){
            return 'Страница не найдена'
        }
        const data = await response.json()
        futureArray = data.list.slice(1, 4);
            renderFutureTemp(futureArray);
    } catch(error){
        console.error(error)
    }
}