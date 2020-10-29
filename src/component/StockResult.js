import React, { useContext, useEffect, useState } from 'react';
import {useParams} from "react-router-dom"
import Config from '../context/Config.json';
import { Line, Bar } from 'react-chartjs-2';

import CurrentStockContext from '../context/CurrentStcok';


function StockResult() {
    const [error, setError] = useState(null);
    const [isSent, setIsSent] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFinishFetch, setIsFinishFetch] = useState();
    const [stockData, setStockData] = useState([]);

    const [currentStock, setCurrentStock] = useContext(CurrentStockContext);

    const {symbol} = useParams();

    const target = (currentStock === symbol)? currentStock:symbol;

    useEffect(() => {
        getStockProfile();
        getHistoricalDailyPrices(90);
    }, []);

    const getStockProfile = (terms) => {
      fetch(
        Config.API_BaseURL + "profile/" + target + "?apikey=" + Config.API_Key
      )
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

    const getHistoricalDailyPrices = (series) => {
        fetch(
            Config.API_BaseURL + 
            "historical-price-full/" +
            target +
            "?timeseries=" +
            series +
            "&apikey=" +
            Config.API_Key
        )
        .then((res) => res.json())
        .then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error)
            }
        );
    };
    

    return (
        <div className="stock-result-container">

        </div>
    );
}

export default StockResult;