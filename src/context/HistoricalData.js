import * as d3 from "d3";

import Config from './Config.json';

// export function getData(symbol) {
// 	const ajaxURL = Config.API_BaseURL +"historical-price-full/" + symbol + "?apikey=" + Config.API_Key;
// 	// const promise = fetch(ajaxURL)
// 	// .then(response => response.json())
// 	// .then(data => console.log(data))
// 	const promise = d3.json(ajaxURL, function(data) {
// 		let dataset = data.historical;
//           dataset.map((item) => {
//             // let time_format = d3.timeFormat("%Y-%m-%d");
//             let full_date = new Date(item.date);
//             // item.date = time_format(full_date);
//             item.date = full_date;
//           });
// 		return dataset;
// 	});
// 	return promise;
// }

const fetchData = (symbol) => {
	const ajaxURL = Config.API_BaseURL +"historical-price-full/" + symbol + "?apikey=" + Config.API_Key;
	const promise = d3.json(ajaxURL, function(data) {
		let dataset = data.historical;
		dataset.map((item) => {
			let full_date = new Date(item.date);
			item.date = full_date;
		});
		return dataset;
	});
	return promise;
}

// module.exports = [
// 	{
// 	  date: new Date("2020-01-01 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-02 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-01-03 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-04 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-05 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-01-06 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-07 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-08 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-01-09 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-10 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-11 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-01-12 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-13 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-14 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-01-15 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-16 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-17 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-01-18 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-19 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-20 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-01-21 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-22 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-23 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-01-24 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-25 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-26 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-01-27 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-28 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-29 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-30 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 3.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-01-31 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-02-01 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
  
// 	{
// 	  date: new Date("2020-02-02 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-02-03 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-02-04 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-02-05 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-02-06 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-02-07 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-02-08 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-02-09 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-02-10 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-02-11 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-02-12 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-02-13 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-02-14 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-02-15 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-02-16 00:00:00"),
// 	  open: 33,
// 	  high: 33.5,
// 	  low: 32.98,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
// 	{
// 	  date: new Date("2020-02-17 00:00:00"),
// 	  open: 33.4,
// 	  high: 35,
// 	  low: 31,
// 	  close: 32.4,
// 	  volume: 594858443,
// 	},
// 	{
// 	  date: new Date("2020-02-18 00:00:00"),
// 	  open: 32.4,
// 	  high: 27,
// 	  low: 28,
// 	  close: 33.4,
// 	  volume: 594858493,
// 	},
//   ];