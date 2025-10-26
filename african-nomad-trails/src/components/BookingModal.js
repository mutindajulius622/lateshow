import React, { useState } from 'react';
import PriceBreakdown from './PriceBreakdown';

const BookingModal = ({ destination, selectedTransport, onTransportChange, onSubmit, onClose }) => {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    transportType: selectedTransport,
    specialRequests: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bookingData);
  };

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const selectedTransportObj = destination.transport.find(t => t.type === bookingData.transportType);

  return (
    <div className="modal-overlay">
      <div className="booking-modal">
        <h2>Book {destination.name}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={bookingData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={bookingData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={bookingData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={bookingData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Check-in Date</label>
              <input
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Check-out Date</label>
              <input
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Number of Guests</label>
            <select
              value={bookingData.guests}
              onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
            >
              {[1,2,3,4,5,6].map(num => (
                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Preferred Transport</label>
            <select
              value={bookingData.transportType}
              onChange={(e) => {
                handleInputChange('transportType', e.target.value);
                onTransportChange(e.target.value);
              }}
            >
              <option value="">Select transport</option>
              {destination.transport.map(t => (
                <option key={t.type} value={t.type}>
                  {t.name} (${t.cost})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Special Requests</label>
            <textarea
              value={bookingData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="Any special requirements or requests..."
              rows="3"
            />
          </div>

          <PriceBreakdown
            destination={destination}
            bookingData={bookingData}
            transport={selectedTransportObj}
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="confirm-btn">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;