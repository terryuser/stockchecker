import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

import CurrentStockContext from '../context/CurrentStcok';


function parseData(parse) {
    const [currentStock, setCurrentStock] = useContext(CurrentStockContext);
    
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export function getData() {
	const promiseCompare = tsvParse(data, parseData(parseDate));
	return promiseCompare;
}
