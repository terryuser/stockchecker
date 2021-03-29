import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../context/Config.json';

let stockInfo = (props) => {
    const { stock } = props;
    console.log(stock);

    const displayList = {
        companyName: "Company Name",
        price: "Price",
        symbol: "Symbol",
        sector: "Sector",
        range: "52 week Range"
    };

    console.log(displayList);

    let infoHTML = new Map(Object.entries(displayList))

    console.log(infoHTML);

    return (
        <div className="stock-info">
            {
                Object.entries(displayList).map(([field, label]) => (
                    <div className={"field field-" + field}>
                        <label>{label} :</label>
                        <span>{stock[field]}</span>
                    </div>
                ))
            }
        </div>
    );
}



export default stockInfo;