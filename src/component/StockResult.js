import React, { useContext, useState } from 'react';
import CurrentStockContext from '../Context';

function StockResult() {
    const [error, setError] = useState(null);
    const [isSent, setIsSent] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [stockData, setStockData] = useState([]);

    const currentStock = useContext(CurrentStockContext);

    return (
        <div className="stock-result-container">
            <p>This is stock result area</p>
            <p>{currentStock}</p>
        </div>
    );
}

export default StockResult;