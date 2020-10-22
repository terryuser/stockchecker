import React, { createContext, useContext, useEffect, useState } from 'react';
import './App.css';

import SearchBar from './component/SearchBar';
import StockResult from './component/StockResult';

import { CurrentStockProvider } from './Context';

function App() {
  const [ current, setCurrent ] = useState('');
  return (
    <div className="App">
      <CurrentStockProvider value={[ current, setCurrent ]}>
        <SearchBar />
        <StockResult />
      </CurrentStockProvider>
    </div>
  );
}

export default App;