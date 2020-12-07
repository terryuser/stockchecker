import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Config from '../context/Config.json';
import * as d3 from 'd3';

import CandleChart from './CandleChart';
// import HistoricalData from '../context/HistoricalData';

import CurrentStockContext from '../context/CurrentStcok';


function StockResult() {
    const [error, setError] = useState(null);
    const [isSent, setIsSent] = useState(false);
    const [isFinishFetch, setIsFinishFetch] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [stockData, setStockData] = useState(null);
    const [dailyData, setDailyData] = useState([]);
    const [displayData, setDisplayData] = useState(null);
    const [histroryDays, setHistroryDays] = useState(30);
    const [chartsToDisplay, setChartsToDisplay] = useState([]);

    const [currentStock, setCurrentStock] = useContext(CurrentStockContext);

    const {symbol} = useParams();

    const target = () => {
      if (currentStock !== symbol) {
        console.log("No same symbol");
        setCurrentStock(symbol);
        return symbol;
      } else {
        return currentStock;
      }
    }

    const getData = async () => {
      const ajaxURL = Config.API_BaseURL +"historical-price-full/" + target() + "?apikey=" + Config.API_Key;
      fetch(ajaxURL)
      .then((res) => res.json())
      .then((data)=> {
        let dataset = data.historical;
        dataset.map((item) => {
          let full_date = new Date(item.date);
          item.date = full_date;
        });

        dataset.sort((a,b) => a.date - b.date);
        setDailyData(dataset);
        setIsLoaded(true);
      })
    };

    useEffect(() => {
      // fetchData();
      getStockProfile();
      getData();
    }, []);

    const getStockProfile = () => {
      const ajaxURL = Config.API_BaseURL + "profile/" + target() + "?apikey=" + Config.API_Key;
      fetch( ajaxURL )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setStockData(data);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setStockData(error);
          }
        );
    };

    const fetchData = () => {
      const ajaxURL = Config.API_BaseURL +"historical-price-full/" + target() + "?apikey=" + Config.API_Key;
      fetch ( ajaxURL )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        let dataset = data.historical;
        dataset.map((item) => {
          let full_date = new Date(item.date);
          item.date = full_date.getDate() + '/' + full_date.getMonth() + '/' + full_date.getFullYear(full_date);
        });
        dataset.reverse();
        // console.log(dataset);
        setDailyData(dataset);
        let endIndex = dataset.length;
        let startIndex = endIndex - histroryDays;
        let displayData = dataset.slice(startIndex, endIndex);
        // console.log(displayData);
        setDisplayData(displayData);
        setIsFinishFetch(true);
      })
      .catch(error => {
        console.log(error)
      });
    }

    const DataList = () => {
      if (stockData == null) {
        return <div>No data</div>;
      } else {
        var data = stockData[0];
        console.log(data);
        return (
          <ul>
            {Object.entries(data).map(([key, value]) => (
              <li>
                {key} : {value}
              </li>
            ))}
          </ul>
        );
      }
    };

    const Loading = () => {
      return <div>Loading...</div>
    }

    const displayChart = () => {
      if (isLoaded) {
        console.log(dailyData);
        return <CandleChart key={1} data={dailyData} symbol={currentStock} />
      } else {
        return <div>Fetching Data</div>
      }
    }

    return (
        <div className="stock-result-container">
          <DataList />
          {/* <div>
          <LineChart width={600} height={300} data={displayData}>
            <Line type="monotone" dataKey="close" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" interval="preserveEnd" />
            <YAxis dataKey="close" interval="preserveEnd" />
          </LineChart>
          </div> */}
          {displayChart()}
        </div>
    );
}

export default StockResult;