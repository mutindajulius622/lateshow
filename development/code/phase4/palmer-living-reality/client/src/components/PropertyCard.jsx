import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getPropertyTypeIcon = (type) => {
    switch (type) {
      case 'apartment': return '🏢';
      case 'mansion': return '🏰';
      case 'bungalow': return '🏡';
      default: return '🏠';
    }
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const defaultImage = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop';

  return (
    <Link to={`/properties/${property.id}`} className="property-card" style={{ textDecoration: 'none' }}>
      <div className="property-card-image-wrapper">
        <img 
          src={imageError ? defaultImage : (property.image_url || defaultImage)}
          alt={property.name}
          className="property-card-image"
          onError={handleImageError}
        />
        
        <div className="property-card-badges">
          <span className="badge badge-primary">
            {getPropertyTypeIcon(property.property_type)} {property.property_type}
          </span>
          {property.is_for_rent && (
            <span className="badge badge-success">For Rent</span>
          )}
          {property.is_for_sale && (
            <span className="badge badge-warning">For Sale</span>
          )}
        </div>
        
        <button 
          className={`property-card-favorite ${isFavorite ? 'active' : ''}`}
          onClick={handleFavorite}
          type="button"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="property-card-content">
        <div className="property-card-price">
          ${property.rent_amount?.toLocaleString()}<span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/mo</span>
        </div>
        
        <h3 className="property-card-title">{property.name}</h3>
        
        <p className="property-card-location">
          📍 {property.location}
        </p>
        
        <div className="property-card-features">
          {property.bedrooms > 0 && (
            <span className="property-card-feature">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              {property.bedrooms} beds
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="property-card-feature">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              {property.bathrooms} baths
            </span>
          )}
          {property.square_feet && (
            <span className="property-card-feature">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {property.square_feet.toLocaleString()} sqft
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;

