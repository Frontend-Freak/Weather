export function showWeatherIcon(iconCode) {
	const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
	const img = document.createElement("img");
	img.src = iconUrl;
	weatherIcon.appendChild(img);
}