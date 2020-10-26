import React, { useContext, useState } from 'react';
import CurrentStockContext from '../context/CurrentStcok';

function Home() {
    const [error, setError] = useState(null);
    const [isSent, setIsSent] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [stockData, setStockData] = useState([]);

    const currentStock = useContext(CurrentStockContext);

    return (
        <div className="stock-result-container">
            <p>This is stock summmary page</p>
        </div>
    );
}

export default Home;