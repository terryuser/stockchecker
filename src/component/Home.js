import React, { useContext, useState } from 'react';
import CurrentStockContext from '../context/CurrentStcok';

function Home() {
    const currentStock = useContext(CurrentStockContext);

    return (
        <div className="stock-result-container">
            <p>This is stock summmary page</p>
        </div>
    );
}

export default Home;