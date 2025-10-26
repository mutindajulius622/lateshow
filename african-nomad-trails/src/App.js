import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import DestinationGrid from './components/DestinationGrid';
import DestinationDetails from './components/DestinationDetails';
import BookingModal from './components/BookingModal';
import { getDestinations, getNearbyDestinations, getReviews } from './api/tourismApi';
import './styles/App.css'

function App() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState('');
  const [nearbyDestinations, setNearbyDestinations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
    location: '',
    transportType: 'all',
    rating: 0
  });

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [destsData, nearbyData, reviewsData] = await Promise.all([
        getDestinations(),
        getNearbyDestinations(),
        getReviews()
      ]);
      
      setDestinations(destsData);
      setFilteredDestinations(destsData);
      setNearbyDestinations(nearbyData);
      setReviews(reviewsData);
    } catch (err) {
      setError('Failed to load data. Please try again later.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = destinations;

    if (filters.category !== 'all') {
      filtered = filtered.filter(dest => dest.category === filters.category);
    }

    if (filters.location) {
      filtered = filtered.filter(dest =>
        dest.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.transportType !== 'all') {
      filtered = filtered.filter(dest =>
        dest.transport.some(t => t.type === filters.transportType)
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(dest => dest.rating >= filters.rating);
    }

    filtered = filtered.filter(dest =>
      dest.price >= filters.priceRange[0] && dest.price <= filters.priceRange[1]
    );

    setFilteredDestinations(filtered);
  }, [destinations, filters]);

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleBookNow = (destination) => {
    setSelectedDestination(destination);
    setSelectedTransport(destination.transport[0]?.type || '');
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      const selectedTransportObj = selectedDestination.transport.find(t => t.type === selectedTransport);
      const nights = Math.ceil(
        (new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24)
      );
      const accommodationCost = selectedDestination.price * nights;
      const transportCost = selectedTransportObj?.cost || 0;
      const tax = (accommodationCost + transportCost) * 0.1;
      const total = accommodationCost + transportCost + tax;

      const bookingSummary = {
        ...bookingData,
        destination: selectedDestination.name,
        transport: selectedTransportObj,
        total: total.toFixed(2),
        bookingReference: `BK-${Date.now()}`
      };
      
      console.log('Booking submitted:', bookingSummary);
      alert(`Booking confirmed! Your reference: ${bookingSummary.bookingReference}`);
      setShowBookingModal(false);
      setSelectedDestination(null);
      setSelectedTransport('');
    } catch (err) {
      setError('Failed to submit booking. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading amazing destinations...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <SearchFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          destinationCount={filteredDestinations.length}
        />
        
        <DestinationGrid
          destinations={filteredDestinations}
          onDestinationSelect={setSelectedDestination}
          onBookNow={handleBookNow}
        />
      </main>

      {selectedDestination && (
        <DestinationDetails
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onBookNow={handleBookNow}
          nearbyDestinations={nearbyDestinations.filter(n => 
            n.id !== selectedDestination.id
          )}
          reviews={reviews.filter(r => r.destinationId === selectedDestination.id)}
          selectedTransport={selectedTransport}
          onTransportSelect={setSelectedTransport}
        />
      )}

      {showBookingModal && selectedDestination && (
        <BookingModal
          destination={selectedDestination}
          selectedTransport={selectedTransport}
          onTransportChange={setSelectedTransport}
          onSubmit={handleBookingSubmit}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}

export default App;