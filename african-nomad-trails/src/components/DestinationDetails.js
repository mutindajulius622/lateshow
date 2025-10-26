import React from 'react';
import WeatherWidget from './WeatherWidget';
import DestinationMap from './DestinationMap';
import TransportComparison from './TransportComparison';
import ReviewSection from './ReviewSection';

const DestinationDetails = ({ 
  destination, 
  onClose, 
  onBookNow, 
  nearbyDestinations, 
  reviews,
  selectedTransport,
  onTransportSelect 
}) => {
  const {
    name,
    image,
    location,
    price,
    rating,
    description,
    amenities = [],
    transport = [],
    contact
  } = destination;

  return (
    <div className="destination-details-overlay">
      <div className="destination-details">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="details-content">
          <div className="details-image">
            <img src={image} alt={name} />
          </div>

          <div className="details-info">
            <h1>{name}</h1>
            <p className="location">📍 {location}</p>
            
            <div className="rating-price">
              <span className="rating">⭐ {rating} / 5</span>
              <span className="price-large">${price} / night</span>
            </div>

            <div className="description">
              <h3>About</h3>
              <p>{description}</p>
            </div>

            {amenities.length > 0 && (
              <div className="amenities">
                <h3>Amenities</h3>
                <div className="amenities-grid">
                  {amenities.map(amenity => (
                    <span key={amenity} className="amenity">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <WeatherWidget location={location} />

            <DestinationMap 
              destination={destination}
              nearbyDestinations={nearbyDestinations}
            />

            <TransportComparison
              destination={destination}
              selectedTransport={selectedTransport}
              onTransportSelect={onTransportSelect}
            />

            <ReviewSection 
              destination={destination}
              reviews={reviews}
            />

            {contact && (
              <div className="contact-info">
                <h3>Contact</h3>
                <p>📞 {contact.phone}</p>
                <p>📧 {contact.email}</p>
                {contact.website && <p>🌐 {contact.website}</p>}
              </div>
            )}

            <button 
              className="book-now-large"
              onClick={() => onBookNow(destination)}
            >
              Book Now - ${price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;