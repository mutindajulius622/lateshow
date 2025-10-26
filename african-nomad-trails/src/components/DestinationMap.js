import React from 'react';

const DestinationMap = ({ destination, nearbyDestinations = [] }) => {
  return (
    <div className="destination-map">
      <h3>Location & Nearby Attractions</h3>
      <div className="map-container">
        <div className="mock-map">
          <div className="main-marker">
            📍 {destination.name}
          </div>
          {nearbyDestinations.map((nearby, index) => (
            <div 
              key={nearby.id}
              className="nearby-marker"
              style={{
                top: `${20 + (index * 15)}%`,
                left: `${30 + (index * 10)}%`
              }}
            >
              🎯 {nearby.name}
            </div>
          ))}
        </div>
      </div>
      <div className="nearby-attractions">
        <h4>Nearby Attractions</h4>
        {nearbyDestinations.length > 0 ? (
          <ul>
            {nearbyDestinations.map(nearby => (
              <li key={nearby.id}>
                <strong>{nearby.name}</strong> - {nearby.distance} away
              </li>
            ))}
          </ul>
        ) : (
          <p>No nearby attractions found.</p>
        )}
      </div>
    </div>
  );
};

export default DestinationMap;