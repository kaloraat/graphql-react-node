import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Search = () => {
    const [query, setQuery] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${query}`);
    };

    return (
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                Search / {query}
            </button>
        </form>
    );
};

export default Search;
