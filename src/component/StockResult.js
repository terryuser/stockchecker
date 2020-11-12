import React, { useContext, useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import {useParams} from 'react-router-dom';
import Config from '../context/Config.json';
import * as d3 from 'd3';
import { timeParse } from "d3-time-format";
import StockChart from 'react-financial-charts';
import Chart from './Chart';

import { getData } from "../context/utils"

// import { getData } from "../context/HistoricalData"

import CurrentStockContext from '../context/CurrentStcok';
import StockDataContext from '../context/StockData';


function StockResult() {
    const [error, setError] = useState(null);
    const [isSent, setIsSent] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [stockData, setStockData] = useState(null);
    const [dailyData, setDailyData] = useState([]);

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

    useEffect(() => {
      getStockProfile();
      fetchData();
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
        console.log(data.historical);
        let dataset = data.historical;
        setDailyData(dataset);
        setIsLoaded(true);
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
                {key} : {value.toString()}
              </li>
            ))}
          </ul>
        );
      }
    };

    const Loading = () => {
      return <div>Loading...</div>
    }

    return (
        <div className="stock-result-container">
          {/* <DataList /> */}
          <div>
          <LineChart width={600} height={300} data={dailyData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis dataKey="open" />
          </LineChart>
          </div>
        </div>
    );
}

export default StockResult;