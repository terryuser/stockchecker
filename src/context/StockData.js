import React, { createContext } from 'react';

const StockDataContext = createContext(null);

export const StockDataProvider = StockDataContext.Provider;

export default StockDataContext;