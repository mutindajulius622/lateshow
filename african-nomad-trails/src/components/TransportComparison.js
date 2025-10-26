import React from 'react';

const TransportComparison = ({ destination, selectedTransport, onTransportSelect }) => {
  const transportOptions = destination.transport || [];

  return (
    <div className="transport-comparison">
      <h3>Compare Transport Options</h3>
      <div className="transport-options-grid">
        {transportOptions.map(transport => (
          <div 
            key={transport.type}
            className={`transport-option ${selectedTransport === transport.type ? 'selected' : ''}`}
            onClick={() => onTransportSelect(transport.type)}
          >
            <div className="transport-icon-large">{transport.icon}</div>
            <div className="transport-info">
              <h4>{transport.name}</h4>
              <p className="transport-cost">${transport.cost}</p>
              <p className="transport-duration">{transport.duration}</p>
              {transport.features && (
                <ul className="transport-features">
                  {transport.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportComparison;