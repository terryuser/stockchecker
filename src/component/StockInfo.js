import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../context/Config.json';

let stockInfo = (props) => {
    const { stock } = props;

    const changesPercent = stock.changes / (stock.price - stock.changes) * 100;

    return (
        <div className="stock-info d-flex col-12">
            <div className="wrapper name-wrapper">
                <img src={stock.image} height={32} />
                <div className="companyName">{stock.companyName}</div>
                <div className="symbol">{stock.symbol}</div>
            </div>

            <div className="wrapper price-wrapper">
                <div className="price">{stock.price}<span className="currency">{stock.currency}</span></div>
                <div className="changes">{stock.changes} ({changesPercent.toFixed(2)})</div>
            </div>
        </div>
    );
}



export default stockInfo;