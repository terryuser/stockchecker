import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../context/Config.json';

let stockDetails = (props) => {
    const { stock } = props;
    console.log(stock);

    const displayList = {
        companyName: null,
        symbol: null,
        price: null,
        sector: "Sector",
        range: "52 week Range"
    };

    // console.log(displayList);

    let infoHTML = new Map(Object.entries(displayList))

    // console.log(infoHTML);

    const changesPercent = stock.changes / (stock.price - stock.changes) * 100;

    return (
        <div className="stock-details">
            <table>
                <tbody>
                    {
                        Object.entries(displayList).map(([field, label]) => (
                            <tr key={field} className={"field " + field}>
                                <th className="label">{label}</th>
                                <td className="value">{stock[field]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}



export default stockDetails;