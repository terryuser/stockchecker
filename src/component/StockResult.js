import React, { useContext, useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../context/Config.json';

import example from '../context/alphavantage_example.json';
import example_details from '../context/example_details.json';
import news_example from '../context/stock_news_example.json';


import CandleChart from './CandleChart';
import Chart from './Chart';
import StockInfo from './StockInfo';
import StockDetails from './StockDetails';
import StockNews from './StockNews';
// import HistoricalData from '../context/HistoricalData';

import CurrentStockContext from '../context/CurrentStcok';


function StockResult() {
  const [error, setError] = useState(null);
  const [isSent, setIsSent] = useState(false);
  const [isLoaded, setIsLoaded] = useState({
    profile: false,
    dailyData: false,
    news: false
  });
  const [stockData, setStockData] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [stockNews, setStockNews] = useState(null);
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
    fetch(ajaxURL)
      .then((res) => res.json())
      .then((data) => {
        setStockData(data);
        let status = isLoaded;
        status.profile = true;
        setIsLoaded(status);
        setDoneFetch(checkFetchStatus());
      },
        (error) => {
          setStockData(error);
        }
      );

    // setStockData(example_details);
    // let status = isLoaded;
    // status.profile = true;
    // setIsLoaded(status);
    // setDoneFetch(checkFetchStatus());
  };

  const fetchPriceHistory = async () => {
    const ajaxURL = Config.Alphavantage_API_base + "query?function=TIME_SERIES_DAILY&symbol=" + target() + "&outputsize=compact&apikey=" + Config.API_Key;
    fetch(ajaxURL)
      .then((res) => res.json())
      .then((data) => {
        let dataset = data["Time Series (Daily)"];
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
      })

    // let dataset = example["Time Series (Daily)"];

    // let chartData = [];

    // Object.entries(dataset).map((row) => {
    //   let dayRecord = [];

    //   let date = row[0];
    //   let OHLCV = row[1];

    //   dayRecord.date = new Date(date);
    //   dayRecord.open = parseFloat(OHLCV['1. open']);
    //   dayRecord.close = parseFloat(OHLCV['4. close']);
    //   dayRecord.high = parseFloat(OHLCV['2. high']);
    //   dayRecord.low = parseFloat(OHLCV['3. low']);
    //   dayRecord.volume = Math.floor(OHLCV['5. volume']);

    //   chartData.push(dayRecord);
    // });

    // chartData.sort((a, b) => a.date - b.date);
    // setDailyData(chartData);

    // console.log(chartData);

    // let status = isLoaded;
    // status.dailyData = true;
    // setIsLoaded(status);
    // setDoneFetch(checkFetchStatus());
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
    const ajaxURL = "https://yahoo-finance-low-latency.p.rapidapi.com/v2/finance/news?symbols=" + target();
    // const headers = {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-key": Config['Yahoo-x_rapidapi_key'],
    //     "x-rapidapi-host": Config['Yahoo_Finance-news']
    //   }
    // };

    const headers = new Headers();
    let api_key = Config['Yahoo-x_rapidapi_key'];
    let api_host = Config['Yahoo-x_rapidapi_host'];

    headers.append("x-rapidapi-key", api_key);
    headers.append("x-rapidapi-host", api_host);

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };

    console.log('Start fetching Yahoo....');
    fetch(ajaxURL, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        let news = data.Content.result;
        news.map((item) => {
          item.provider_publish_time = new Date((1000 * item.provider_publish_time) + item.gmtOffSetMilliseconds);
          let div = document.createElement("div");

          div.innerHTML = item.title;
          item.title = div.textContent || div.innerText;

          div.innerHTML = item.summary;
          item.summary = div.textContent || div.innerText;
        });

        setStockNews(news);

        let status = isLoaded;
        status.news = true;
        setIsLoaded(status);
        setDoneFetch(checkFetchStatus());
      })
      .catch(error => console.log('error', error));

    // console.log(news_example);

    // let news = news_example.Content.result;
    // news.map((item) => {
    //   item.provider_publish_time = new Date((1000 * item.provider_publish_time) + item.gmtOffSetMilliseconds);
    //   let div = document.createElement("div");

    //   div.innerHTML = item.title;
    //   item.title = div.textContent || div.innerText;

    //   div.innerHTML = item.summary;
    //   item.summary = div.textContent || div.innerText;
    // });

    // console.log(news);

    // setStockNews(news);

    // let status = isLoaded;
    // status.news = true;
    // setIsLoaded(status);
    // setDoneFetch(checkFetchStatus());
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
    fetchStockNews();
  }, []);

  const displayChart = () => {

    if (doneFetch) {
      return (
        <div className="stock-data row mx-0">
          <StockInfo stock={stockData[0]} />
          <div className="stock-result-wrapper px-0 pt-2 mx-0 row col-12">
            <div className="stock-chart p-2 col-lg-9 col-md-12 col-sm-12" ref={el => { domWidth.current = el; console.log(domWidth); }} id="stock-chart">
              <Chart type="hybrid" data={dailyData} symbol={currentStock} height={(window.innerWidth > 768) ? 500 : 250} />
            </div>
            <div className="stock-details col-lg-3 col-md-12 col-sm-12">
              <StockDetails stock={stockData[0]} />
            </div>
          </div>
          <StockNews news={stockNews} />
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