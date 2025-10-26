import React from 'react';

const SearchFilters = ({ filters, onFilterChange, destinationCount }) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'hotel', label: 'Hotels' },
    { value: 'game-park', label: 'Game Parks' },
    { value: 'resort', label: 'Resorts' },
    { value: 'recreation', label: 'Recreational Areas' }
  ];

  const transportTypes = [
    { value: 'all', label: 'All Transport' },
    { value: 'flight', label: 'Flights' },
    { value: 'bus', label: 'Buses' },
    { value: 'train', label: 'Trains' },
    { value: 'car-rental', label: 'Car Rental' },
    { value: 'boat', label: 'Boats' }
  ];

  const ratings = [
    { value: 0, label: 'Any Rating' },
    { value: 4.5, label: '4.5+ Stars' },
    { value: 4, label: '4+ Stars' },
    { value: 3, label: '3+ Stars' }
  ];

  return (
    <div className="search-filters">
      <div className="filters-header">
        <h2>Find Your Perfect Getaway</h2>
        <span className="results-count">{destinationCount} destinations found</span>
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label>Category</label>
          <select 
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Location</label>
          <input
            type="text"
            placeholder="Search location..."
            value={filters.location}
            onChange={(e) => onFilterChange({ location: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</label>
          <div className="price-range">
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[0]}
              onChange={(e) => onFilterChange({ 
                priceRange: [parseInt(e.target.value), filters.priceRange[1]] 
              })}
              className="price-slider"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) => onFilterChange({ 
                priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
              })}
              className="price-slider"
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Transport Type</label>
          <select
            value={filters.transportType}
            onChange={(e) => onFilterChange({ transportType: e.target.value })}
          >
            {transportTypes.map(transport => (
              <option key={transport.value} value={transport.value}>
                {transport.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Minimum Rating</label>
          <select
            value={filters.rating}
            onChange={(e) => onFilterChange({ rating: parseFloat(e.target.value) })}
          >
            {ratings.map(rating => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;