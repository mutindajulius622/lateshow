import React from 'react';

const DestinationCard = ({ destination, onSelect, onBookNow }) => {
  const { 
    name, 
    image, 
    location, 
    category, 
    price, 
    rating, 
    transport 
  } = destination;

  const getCategoryIcon = (cat) => {
    const icons = {
      'hotel': '🏨',
      'game-park': '🦁',
      'resort': '🏖️',
      'recreation': '🎯'
    };
    return icons[cat] || '📍';
  };

  const handleBookClick = (e) => {
    e.stopPropagation();
    onBookNow(destination);
  };

  return (
    <div className="destination-card" onClick={() => onSelect(destination)}>
      <div className="card-image">
        <img src={image} alt={name} />
        <div className="category-badge">
          {getCategoryIcon(category)} {category.replace('-', ' ')}
        </div>
        <div className="rating-badge">⭐ {rating}</div>
      </div>

      <div className="card-content">
        <h3 className="destination-name">{name}</h3>
        <p className="destination-location">📍 {location}</p>
        
        <div className="transport-options">
          <strong>Transport:</strong>
          <div className="transport-icons">
            {transport.slice(0, 3).map(t => (
              <span key={t.type} className="transport-icon" title={t.name}>
                {t.icon}
              </span>
            ))}
            {transport.length > 3 && (
              <span className="more-transport">+{transport.length - 3} more</span>
            )}
          </div>
        </div>

        <div className="card-footer">
          <div className="price">${price} <span>/night</span></div>
          <button 
            className="book-button"
            onClick={handleBookClick}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;