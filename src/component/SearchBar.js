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
          if ("Error Message" in searchResult) {
            return (
              <div>Limited Reach</div>
            );
          } else {
            return (
              <ul className="search-result-wrapper list-group">
                  {
                      searchResult.map((item ,index) =>
                          <li className="search-result-item list-group-item px-1 py-1" key={index}>
                            <Link to={path_stock + item.symbol} onClick={e=> handleChooseStock(e, item)} className="d-flex text-left align-middle">
                              <div className="symbol d-inline-block col-3">{item.symbol}</div>
                              <div className="name d-inline-block col-6">{item.name}</div>
                              <div className="exchange-symbol d-inline-block col-3">{item.exchangeShortName}</div>
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
      let alphavantage_API = Config.Alphavantage_API_base + "/query?function=SYMBOL_SEARCH&keywords=" + terms + "&apikey=" + Config.Alphavantage_API_Key;
      fetch(financialmodel_API)
        .then((res) => res.json())
        .then(
          (result) => {
            // let matches = result.bestMatches;
            // analysisAlphaSearchData(matches);
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
    
    // const analysisAlphaSearchData = (data) => {
    //   data.map((item) =>{
    //     console.log(item);
    //     item["9. matchScore"] = parseFloat(item["9. matchScore"]);
    //   });
    //   data.sort((a,b) => {
    //     let sort = (a["9. matchScore"] > b["9. matchScore"])? true : false;
    //     if (sort) return 1;
    //     if (!sort) return -1;
    //     return 0;
    //   });
    //   setSearchResult(data);
    // }
    
    return (
      <header className="App-header">
        <div className="Search-block">
          <div className="Input-wrapper input-group">
            <input
              type="text"
              className="search-input form-control"
              placeholder="Stock symbol"
              aria-label="Stock symbol"
              aria-describedby="symbol"
              onChange={handleSearchTerm}
              onKeyDown={handleKeyDown}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-primary" onClick={handleClick}>Go!</button>
            </div>
          </div>
          <SearchList />
        </div>
        {/* <div>{!sendSearch ? 'Waiting' : 'Searching: ' + JSON.stringify(searchTerm)}</div> */}
      </header>
    );
}

export default SearchBar;