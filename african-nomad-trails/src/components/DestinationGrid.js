import React from 'react';
import DestinationCard from './DestinationCard';

const DestinationGrid = ({ destinations, onDestinationSelect, onBookNow }) => {
  if (destinations.length === 0) {
    return (
      <div className="no-results">
        <h3>No destinations found</h3>
        <p>Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="destination-grid">
      {destinations.map(destination => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          onSelect={onDestinationSelect}
          onBookNow={onBookNow}
        />
      ))}
    </div>
  );
};

export default DestinationGrid;