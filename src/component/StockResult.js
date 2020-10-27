import React, { useContext, useState } from 'react';
import {useParams} from "react-router-dom"

import CurrentStockContext from '../context/CurrentStcok';


function StockResult() {
    const [error, setError] = useState(null);
    const [isSent, setIsSent] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [stockData, setStockData] = useState([]);

    const currentStock = useContext(CurrentStockContext);

    const { symbol } = useParams();

    return (
        <div className="stock-result-container">
            <p>This is stock result area</p>
            <p>{currentStock}</p>
            <p>Params: {symbol}</p>
        </div>
    );
}

export default StockResult;