import React, { createContext } from 'react';

const CurrentStockContext = createContext(null);

export const CurrentStockProvider = CurrentStockContext.Provider;

export default CurrentStockContext;