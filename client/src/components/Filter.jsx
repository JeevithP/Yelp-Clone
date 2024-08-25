import React, { useState } from "react";

export const Filter = ({ onApplyFilters, onResetFilters, onSearch }) => {
  const [priceRange, setPriceRange] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleApplyFilters = () => {
    onApplyFilters(priceRange, sortOrder);
  };

  const handleReset = () => {
    setPriceRange("");
    setSortOrder("");
    setSearchQuery("");
    onResetFilters();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="filter-container mb-3">
        <h2>Search For A Restaurant</h2>
      <div className="form-group">
        <input
          id="search"
          type="text"
          className="form-control"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by restaurant name"
          style={{marginTop:"20px"}}
        />
      </div>

      <div className="form-group">
        <h2 style={{marginTop:"20px"}}>Filters :</h2>
        <label htmlFor="priceRange" style={{marginRight:"30px",marginBottom:"20px",fontWeight:"bold"}}>Price Range</label>
        <select
          id="priceRange"
          className="custom-select"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">Select Price Range</option>
          <option value="100">100</option>
          <option value="150">150</option>
          <option value="200">200</option>
          <option value="250">250</option>
          <option value="300">300</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="sortOrder" style={{marginRight:"30px",marginBottom:"20px",fontWeight:"bold"}}>Sort Order</label>
        <select
          id="sortOrder"
          className="custom-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Select Sort Order</option>
          <option value="lowToHigh">Rating: Low to High</option>
          <option value="highToLow">Rating: High to Low</option>
        </select>
      </div>

      <button onClick={handleApplyFilters} className="btn btn-primary mr-2" style={{marginRight:"30px"}}>
        Apply
      </button>
      <button onClick={handleReset} className="btn btn-secondary">
        Reset
      </button>
    </div>
  );
};

//export default Filter;
