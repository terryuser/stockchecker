import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

import Config from './Config.json';
import CurrentStockContext from './CurrentStcok';

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");
const currentStock = useContext(CurrentStockContext);

export function getData() {
	const ajaxURL = Config.API_BaseURL +"historical-price-full/" + currentStock + "?apikey=" + Config.API_Key;
	const promise = fetch(ajaxURL)
		.then(response => response.historical.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promise;
}
