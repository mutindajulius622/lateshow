import React from 'react';

const BOT_CLASSES = ['Support', 'Medic', 'Assault', 'Defender', 'Captain', 'Witch'];

function FilterBar({ filters, setFilters }) {
  const toggleFilter = (botClass) => {
    if (filters.includes(botClass)) {
      setFilters(filters.filter(f => f !== botClass));
    } else {
      setFilters([...filters, botClass]);
    }
  };

  return (
    <div className="filter-bar">
      <label>Filter by class: </label>
      {BOT_CLASSES.map(botClass => (
        <label key={botClass} className="filter-checkbox">
          <input
            type="checkbox"
            checked={filters.includes(botClass)}
            onChange={() => toggleFilter(botClass)}
          />
          {botClass}
        </label>
      ))}
    </div>
  );
}

export default FilterBar;