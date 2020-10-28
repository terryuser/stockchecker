import React, { useContext, useState } from 'react';
import {useParams} from "react-router-dom"
import Config from '../context/Config.json';

import CurrentStockContext from '../context/CurrentStcok';


function StockResult() {
    const [error, setError] = useState(null);
    const [isSent, setIsSent] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [stockData, setStockData] = useState([]);

    const [currentStock, setCurrentStock] = useContext(CurrentStockContext);

    const {symbol} = useParams();

    const target = (currentStock === symbol)? currentStock:symbol;

    const getStockData = (terms) => {
        fetch(
          Config.API_BaseURL +
            "profile/" + 
            target +
            "?apikey=" +
            Config.API_Key
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

    const ShowStockData = () => {
        getStockData();
        return (
            <div>
                {JSON.stringify(stockData)}
            </div>
        );
    }
    

    return (
        <div className="stock-result-container">
            { console.log("Current Stock : " + currentStock) }
            { console.log("Symbol : " + symbol) }
            { console.log("Getting Data : " + target) }
            <ShowStockData />
        </div>
    );
}

export default StockResult;