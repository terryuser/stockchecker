import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Config from '../context/Config.json';
import StockChart from 'react-financial-charts';
import Chart from './Chart';

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
    }, []);

    const getStockProfile = () => {
      let ajaxURL = Config.API_BaseURL + "profile/" + target() + "?apikey=" + Config.API_Key;
      fetch( ajaxURL )
        .then((res) => res.json())
        .then(
          (data) => {
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

    const DataList = () => {
      if (stockData == null) {
        return (
          <div>No data</div>
        );
      } else {
        var data = stockData[0];
        console.log(data);
        return (
          <ul>
            {
              Object.entries(data).map(([key,value]) => 
                <li>{key} : {value.toString()}</li>
              )
            }
          </ul>
        );
      }
  };

    return (
        <div className="stock-result-container">
          <DataList />
          {/* {(dailyData.length > 0)? <Chart type="hybrid" data={dailyData}/>:<div>No data</div>} */}
        </div>
    );
}

export default StockResult;