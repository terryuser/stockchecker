import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter, HashRouter, Link} from 'react-router-dom'
import CurrentStockContext from '../context/CurrentStcok';
import Config from '../context/Config.json';

function SearchBar() {
    const [ current, setCurrent ] = useContext(CurrentStockContext);
    const [ input, setInput ] = useState('');
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ sendSearch, setSendSearch ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ searchResult, setSearchResult ] = useState([]);

    const handleSearchTerm = event => {
        setInput(event.target.value);
    };

    const handleKeyDown = event => {
        if ( event.key === 'Enter' ) {
            setSearchTerm(event.target.value);
            setSendSearch(true);
            searchStock(input);
        }
    };

    const handleClick = event => {
        setSearchTerm(input);
        setSendSearch(true);
        searchStock(input);
    };

    const handleChooseStock = (event, item) => {
      setSearchTerm(null);
      setSendSearch(false);
      setSendSearch(null);
      setCurrent(item.symbol);
    }

    const path_stock = '/stock/';

    const SearchList = () => {
        if (sendSearch) {
            return (
              
                <ul className="search-result-wrapper">
                    {
                        searchResult.map((item ,index) =>
                            <li className="search-result-item" key={index}>
                              <Link to={path_stock + item.symbol} onClick={e=> handleChooseStock(e, item)}>
                                <div className="symbol">{item.symbol}</div>
                                <div className="name">{item.name}</div>
                                <div className="exchange-symbol">{item.exchangeShortName}</div>
                              </Link>
                            </li>
                        )
                    }
                </ul>
              
            );
        } else {
            return ('No result');
        }
    };

    const searchStock = (terms) => {
      fetch(
        Config.API_BaseURL +
          "search?query=" +
          terms +
          "&limit" +
          Config.Search_setting.limit +
          "&apikey=" +
          Config.API_Key
      )
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
            setSendSearch(true);
            setSearchResult(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setSendSearch(true);
            setError(error);
          }
        );
    };

    return (
      <header className="App-header">
        <div className="Search-block">
          <div className="Input-wrapper">
            <input
              type="text"
              placeholder="Stock symbol"
              onChange={handleSearchTerm}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleClick}>Go!</button>
          </div>
          <SearchList />
        </div>
        <div>{!sendSearch ? 'Waiting' : 'Searching: ' + JSON.stringify(searchTerm)}</div>
      </header>
    );
}

export default SearchBar;