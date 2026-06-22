import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} style={{
      display: 'block',
      textDecoration: 'none',
      color: 'var(--text-primary)',
      backgroundColor: 'var(--surface-color)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
    }}>
      <div style={{ position: 'relative', height: '200px' }}>
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: restaurant.isOpen ? '#4CAF50' : '#F44336',
          color: 'white',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          fontWeight: '600',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          {restaurant.isOpen ? 'Open' : 'Closed'}
        </div>
      </div>
      
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>{restaurant.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'var(--bg-color)', padding: '4px 8px', borderRadius: 'var(--radius-sm)' }}>
            <Star size={14} color="var(--accent-color)" fill="var(--accent-color)" />
            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{restaurant.rating}</span>
          </div>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>{restaurant.cuisine}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={14} />
            <span>{restaurant.distance}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} />
            <span>{restaurant.eta}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
