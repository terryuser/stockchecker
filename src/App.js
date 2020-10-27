import React, { createContext, useContext, useEffect, useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import './App.css';

import Home from './component/Home';
import SearchBar from './component/SearchBar';
import StockResult from './component/StockResult';

import { CurrentStockProvider } from './context/CurrentStcok';

function App() {
  const [ current, setCurrent ] = useState('');
  return (
    <div className="App">
      <CurrentStockProvider value={[ current, setCurrent ]}>
        <HashRouter basename="/">
          <SearchBar />
          <main>
            <section>
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/stock/:symbol" component={StockResult}></Route>
              </Switch>
            </section>
            <aside>
              
            </aside>
          </main>
        </HashRouter>
      </CurrentStockProvider>
    </div>
  );
}

export default App;