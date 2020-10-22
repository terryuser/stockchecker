import React, { useContext, useEffect, useState } from 'react';
import CurrentStockContext from '../Context';

function SearchBar() {
    const [current, setCurrent] = useContext(CurrentStockContext);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchTerm = event => {
        setSearchTerm(event.target.value);
        setCurrent(event.target.value);
    };

    const handleKeyDown = event => {
        if ( event.key === 'Enter' ) {
            setSearchTerm(event.target.value);
            setCurrent(event.target.value);
        }
    };

    return (
        <header className="App-header">
            <input type="text" placeholder="Stock symbol" onChange={handleSearchTerm} onKeyDown={handleKeyDown} />
            <button>Go!</button>
        </header>
    );
}

export default SearchBar;