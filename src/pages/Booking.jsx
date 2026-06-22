import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Clock, CheckCircle } from 'lucide-react';
import { restaurants } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

const LOCATIONS = [
  'Hyderabad', 'Mumbai', 'Delhi', 'Bangalore', 
  'Chennai', 'Kolkata', 'Pune', 'Vizag'
];

const Booking = () => {
  const navigate = useNavigate();
  const { addReservation } = useAppContext();
  
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSlots, setSelectedSlots] = useState({}); // { restaurantId: slotString }
  const [confirmation, setConfirmation] = useState(null);

  // Filter restaurants by selected location and search query
  const filteredRestaurants = restaurants.filter(r => {
    const matchesLocation = selectedLocation ? r.location === selectedLocation : true;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesSearch;
  });

  const handleSlotSelect = (restaurantId, slot) => {
    setSelectedSlots(prev => ({
      ...prev,
      [restaurantId]: slot
    }));
  };

  const handleReserve = (restaurant) => {
    const slot = selectedSlots[restaurant.id];
    if (!slot) {
      alert("Please select a time slot first.");
      return;
    }

    addReservation({
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantImage: restaurant.image,
      date: new Date().toISOString().split('T')[0],
      time: slot,
      guests: 2,
      location: restaurant.location
    });

    setConfirmation({ restaurant: restaurant.name, slot });
    
    setTimeout(() => {
      navigate('/profile');
    }, 2500);
  };

  if (confirmation) {
    return (
      <div className="container animate-fade-in" style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#4CAF50',
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <CheckCircle size={40} />
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px' }}>Reservation Confirmed!</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '8px' }}>
          Your table at <strong>{confirmation.restaurant}</strong> is booked for <strong>{confirmation.slot}</strong>.
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Redirecting to your profile...</p>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px 80px', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>Book Nearby Slots</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Select your city to discover the best restaurants around you and reserve a table instantly.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px', justifyContent: 'center' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '250px', maxWidth: '400px' }}>
          <MapPin size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{
              width: '100%', padding: '16px 20px 16px 48px', borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)',
              color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit', fontSize: '1rem',
              appearance: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-sm)'
            }}
          >
            <option value="">All Locations</option>
            {LOCATIONS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div style={{ position: 'relative', flex: '1', minWidth: '250px', maxWidth: '400px' }}>
          <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text"
            placeholder="Search restaurants or cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '16px 20px 16px 48px', borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)',
              color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit', fontSize: '1rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          />
        </div>
      </div>

      {selectedLocation && (
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px' }}>
          Restaurants in {selectedLocation}
        </h2>
      )}

      {filteredRestaurants.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredRestaurants.map(restaurant => (
            <div key={restaurant.id} style={{
              backgroundColor: 'var(--surface-color)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  backgroundColor: 'rgba(255,255,255,0.9)', color: '#111',
                  padding: '4px 10px', borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <MapPin size={12} /> {restaurant.distance}
                </div>
              </div>
              
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{restaurant.name}</h3>
                  <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
                    ★ {restaurant.rating}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
                  {restaurant.cuisine} • {restaurant.location}
                </p>
                
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: '500', marginBottom: '12px' }}>
                    <Clock size={16} color="var(--primary-color)" /> Available Slots Today
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {(restaurant.availableSlots || ['12:00 PM', '1:00 PM', '7:00 PM', '8:30 PM']).map(slot => (
                      <button
                        key={slot}
                        onClick={() => handleSlotSelect(restaurant.id, slot)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          border: selectedSlots[restaurant.id] === slot ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
                          backgroundColor: selectedSlots[restaurant.id] === slot ? 'var(--primary-color)' : 'transparent',
                          color: selectedSlots[restaurant.id] === slot ? 'white' : 'var(--text-primary)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <button 
                    onClick={() => handleReserve(restaurant)}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '12px' }}
                  >
                    Reserve Table
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-md)' }}>
          <MapPin size={48} style={{ color: 'var(--border-color)', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>No restaurants found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Try selecting a different location or adjusting your search.</p>
        </div>
      )}
    </div>
  );
};

export default Booking;
