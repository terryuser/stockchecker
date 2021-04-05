import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../context/Config.json';

let stockInfo = (props) => {
    const { stock } = props;

    const changesPercent = stock.changes / (stock.price - stock.changes) * 100;

    return (
        <div className="stock-info row mx-0 mb-3 px-0 col-12">
            <div className="container-name px-0 d-flex col-8">
                <div className="stock-image d-flex"><img src={stock.image} height={32} /></div>
                <h1 className="companyName pl-2">{stock.companyName}</h1>
                <div className="stockSymbol pl-2 d-block"><span className="symbol">{stock.symbol}</span></div>
            </div>

            <div className="container-price text-right px-0 col-4">
                <div className="price mr-2 d-inline-block">{stock.price}<span className="currency">{stock.currency}</span></div>
                <div className={"changes d-inline-block " + ((stock.changes > 0) ? "up" : "down")}>{stock.changes} ({changesPercent.toFixed(2)})</div>
            </div>
        </div>
    );
}



export default stockInfo;