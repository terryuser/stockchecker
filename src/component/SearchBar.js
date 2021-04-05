import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, HashRouter, Link } from 'react-router-dom'
import CurrentStockContext from '../context/CurrentStcok';
import Config from '../context/Config.json';

import usa_jpg from '../img/usa.jpg'
import uk_jpg from '../img/uk.jpg'
import euro_jpg from '../img/euro.jpg'

function SearchBar() {
  const [current, setCurrent] = useContext(CurrentStockContext);
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sendSearch, setSendSearch] = useState(false);
  const [error, setError] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [typing, setTyping] = useState(true);
  const [timer, setTimer] = useState(0);

  const WAIT_TIME = 1000;

  const handleChange = event => {
    setTyping(true);
    clearTimeout(timer);
    console.log(timer);
    console.log(typing ? 'Typing' : 'not typing');

    setTimer(setTimeout(function () {
      setTyping(false);
      setSearchTerm(event.target.value);
      setSendSearch(true);
      searchStock(event.target.value);
    }, WAIT_TIME));
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      setTyping(false);
      setSearchTerm(event.target.value);
      setSendSearch(true);
      searchStock(event.target.value);
    }
  };

  const handleChooseStock = (event, item) => {
    setSearchTerm(null);
    setSendSearch(false);
    setSendSearch(null);
    setCurrent(item.symbol);
  }

  const path_stock = '/stock/';

  const exchangeFlag = (exchange) => {
    let flagIMG = {
      NYSE: usa_jpg,
      NASDAQ: usa_jpg,
      LSE: uk_jpg,
      EURONEXT: euro_jpg
    }

    if (flagIMG[exchange]) return (
      <div className="exchange-flag">
        <img src={flagIMG[exchange]} />
      </div>

    );
  }

  const SearchList = () => {
    if (sendSearch & sendSearch !== null & sendSearch !== '') {
      if ("Error Message" in searchResult) {
        return (
          <div>Limited Reach</div>
        );
      } else {
        return (
          <ul className="search-result-wrapper list-group">
            {
              searchResult.map((item, index) =>
                <li className="search-result-item list-group-item px-1 py-2" key={index}>
                  <Link to={path_stock + item.symbol} onClick={e => handleChooseStock(e, item)} className="d-flex text-left align-middle py-1">
                    <div className="result-sumbol d-inline-block col-2"><span className="symbol d-inline-block">{item.symbol}</span></div>
                    <div className="result-name d-inline-block col-7"><span className="name">{item.name}</span></div>
                    <div className="result-exchange d-inline-block col-3">
                      {exchangeFlag(item.exchangeShortName)}
                      <span className={"exchange-symbol " + item.exchangeShortName}>{item.exchangeShortName}</span>
                    </div>
                  </Link>
                </li>
              )
            }
          </ul>
        );
      }
    } else {
      return ('');
    }
  };

  const searchStock = (terms) => {
    let financialmodel_API = Config.API_BaseURL + "search?query=" + terms + "&limit" + Config.Search_setting.limit + "&apikey=" + Config.API_Key;

    fetch(financialmodel_API)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setSearchResult(result);
          setSendSearch(true);
        },
        (error) => {
          console.log(error);
          setSendSearch(true);
          setError(error);
        }
      );
  };

  return (
    <header className="header d-flex justify-content-space-between">
      <div className="Search-block">
        <div className="Input-wrapper input-group">
          <input
            type="text"
            className="search-input form-control"
            placeholder="Stock symbol"
            aria-label="Stock symbol"
            aria-describedby="symbol"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <SearchList />
      </div>
      <div className="menu-icon"><span></span><span></span><span></span></div>
    </header>
  );
}

export default SearchBar;