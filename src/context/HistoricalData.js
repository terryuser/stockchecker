import d3 from "d3";

import Config from './Config.json';

export function getData(symbol) {
	const ajaxURL = Config.API_BaseURL +"historical-price-full/" + symbol + "?apikey=" + Config.API_Key;
	// const promise = fetch(ajaxURL)
	// 	.then(response => response.historical.text())
	// 	.then(data => tsvParse(data, parseData(parseDate)))
	const promise = d3.json(ajaxURL,function(data) {
		console.log(data);
	});
	return promise;
}
