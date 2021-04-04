import React, { useContext, useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../context/Config.json';
import example from '../context/alphavantage_example.json';
import example_details from '../context/example_details.json';
import * as d3 from 'd3';

import CandleChart from './CandleChart';
import Chart from './Chart';
import StockInfo from './StockInfo';
import StockDetails from './StockDetails';
// import HistoricalData from '../context/HistoricalData';

import CurrentStockContext from '../context/CurrentStcok';


function StockResult() {
  const [error, setError] = useState(null);
  const [isSent, setIsSent] = useState(false);
  const [isLoaded, setIsLoaded] = useState({
    profile: false,
    dailyData: false
  });
  const [stockData, setStockData] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [doneFetch, setDoneFetch] = useState(false);

  const [chartWidth, setChartWidth] = useState(0);

  const [currentStock, setCurrentStock] = useContext(CurrentStockContext);

  const { symbol } = useParams();

  // const domWidth = useCallback(node => {
  //   console.log(node);
  //   console.log(node.getBoundingClientRect())
  //   setChartWidth(node.getBoundingClientRect().width);
  // }, []);

  const domWidth = useRef();

  const target = () => {
    if (currentStock !== symbol) {
      setCurrentStock(symbol);
      return symbol;
    }
    return currentStock;
  }

  const fetchProfile = () => {
    const ajaxURL = Config.API_BaseURL + "profile/" + target() + "?apikey=" + Config.API_Key;
    // fetch(ajaxURL)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);
    //     setStockData(data);
    //     let status = isLoaded;
    //     status.profile = true;
    //     setIsLoaded(status);
    //     setDoneFetch(checkFetchStatus());
    //   },
    //     (error) => {
    //       setStockData(error);
    //     }
    //   );

    setStockData(example_details);
    let status = isLoaded;
    status.profile = true;
    setIsLoaded(status);
    setDoneFetch(checkFetchStatus());
  };

  const fetchPriceHistory = async () => {
    // const ajaxURL = Config.Alphavantage_API_base + "query?function=TIME_SERIES_DAILY&symbol=" + target() + "&outputsize=compact&apikey=" + Config.API_Key;
    // fetch(ajaxURL)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     let dataset = data["Time Series (Daily)"];
    //     console.log(Object.entries(dataset))
    //   })
    console.log(example);

    let dataset = example["Time Series (Daily)"];
    // console.log(Object.entries(dataset));

    let chartData = [];

    Object.entries(dataset).map((row) => {
      let dayRecord = [];

      let date = row[0];
      let OHLCV = row[1];

      dayRecord.date = new Date(date);
      dayRecord.open = parseFloat(OHLCV['1. open']);
      dayRecord.close = parseFloat(OHLCV['4. close']);
      dayRecord.high = parseFloat(OHLCV['2. high']);
      dayRecord.low = parseFloat(OHLCV['3. low']);
      dayRecord.volume = Math.floor(OHLCV['5. volume']);

      chartData.push(dayRecord);
    });

    chartData.sort((a, b) => a.date - b.date);
    setDailyData(chartData);

    console.log(chartData);

    let status = isLoaded;
    status.dailyData = true;
    setIsLoaded(status);
    setDoneFetch(checkFetchStatus());
  }

  const getData = async () => {
    const ajaxURL = Config.API_BaseURL + "historical-price-full/" + target() + "?apikey=" + Config.API_Key;
    fetch(ajaxURL)
      .then((res) => res.json())
      .then((data) => {
        let dataset = data.historical;
        dataset.map((item) => {
          let full_date = new Date(item.date);
          item.date = full_date;
        });

        dataset.sort((a, b) => a.date - b.date);
        setDailyData(dataset);
        setIsLoaded(true);
      })
  };

  const fetchStockNews = async () => {

  }

  const checkFetchStatus = () => {
    let showStock = Object.values(isLoaded).every(status => {
      return status == true;
    });
    return showStock;
  }


  useEffect(() => {
    // getData();
    fetchProfile();
    fetchPriceHistory();
  }, []);

  const displayChart = () => {

    if (doneFetch) {
      // console.log(isLoaded)
      // console.log(stockData);
      return (
        <div className="stock-data row">
          <StockInfo stock={stockData[0]} />
          <div className="stock-details-wrapper py-2 row col-12">
            <div className="stock-chart p-2 col-9" ref={el => { domWidth.current = el; console.log(domWidth); }} id="stock-chart">
              <Chart type="hybrid" data={dailyData} symbol={currentStock} height={500} />
            </div>
            <div className="stock-details col-3">
              <StockDetails stock={stockData[0]} />
            </div>
          </div>
        </div>
      )
    } else {
      return <div>Fetching Data</div>
    }
  }

  return (
    <div className="stock-result-container">
      {displayChart()}
    </div>
  );
}

export default StockResult;