export function convertUnixToNormalTime(unixTime) {
	let hours = new Date(unixTime * 1000).getHours();
	let minutes = new Date(unixTime * 1000).getMinutes();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	return `${hours}:${minutes}`;
}
