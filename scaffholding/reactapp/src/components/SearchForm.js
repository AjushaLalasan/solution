import React, { useRef } from 'react';

const SearchForm = ({ onSearch }) => {
  const searchRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = searchRef.current.value;
    onSearch(keyword);
  };

  const handleInputChange = () => {
    const keyword = searchRef.current.value;
    onSearch(keyword);
  };

  return (
    <div className="form-container">
      <h2>Search Form (Uncontrolled)</h2>
      <form onSubmit={handleSearch}>
        <div className="field">
          <label>Search Keyword:</label>
          <input
            type="text"
            ref={searchRef}
            onChange={handleInputChange}
            placeholder="Search products..."
            data-testid="search-input"
          />
        </div>

        <button type="submit" data-testid="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;