import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../context/Config.json';

let stockDetails = (props) => {
    const { stock } = props;
    console.log(stock);

    const displayList = {
        sector: "Sector",
        industry: "Industry",
        mktCap: "Market Cap",
        range: "52 week Range",
        lastDiv: "Last Dividend",
        ipoDate: "IPO Date",
        ceo: "CEO"
    };

    // console.log(displayList);

    let infoHTML = new Map(Object.entries(displayList))

    // console.log(infoHTML);

    const changesPercent = stock.changes / (stock.price - stock.changes) * 100;

    return (
        <div className="stock-details pr-0 d-flex">
            <p className="company-desc text-left">{stock.description}</p>
            <table className="table-details text-left">
                <tbody>
                    {
                        Object.entries(displayList).map(([field, label]) => (
                            <tr key={field} className={"field " + field}>
                                <th className="label">{label}</th>
                                <td className="value text-left">{stock[field]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <a href={stock.website} className="company-website"><div>View Offical Website</div></a>
        </div>
    );
}



export default stockDetails;