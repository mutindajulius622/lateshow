import React from 'react';

const PriceBreakdown = ({ destination, bookingData, transport }) => {
  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const nights = Math.ceil(
      (new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24)
    );
    return Math.max(1, nights);
  };

  const nights = calculateNights();
  const accommodationCost = destination.price * nights;
  const transportCost = transport ? transport.cost : 0;
  const tax = (accommodationCost + transportCost) * 0.1;
  const serviceFee = 25;
  const total = accommodationCost + transportCost + tax + serviceFee;

  return (
    <div className="price-breakdown">
      <h4>Price Breakdown</h4>
      <div className="price-line">
        <span>Accommodation ({nights} night{nights !== 1 ? 's' : ''})</span>
        <span>${accommodationCost}</span>
      </div>
      {transport && (
        <div className="price-line">
          <span>Transport ({transport.name})</span>
          <span>${transportCost}</span>
        </div>
      )}
      <div className="price-line">
        <span>Tax & Fees (10%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="price-line">
        <span>Service Fee</span>
        <span>${serviceFee}</span>
      </div>
      <div className="price-line total">
        <span>Total Amount</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceBreakdown;