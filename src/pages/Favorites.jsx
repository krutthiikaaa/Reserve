import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DishCard from '../components/DishCard';
import RestaurantCard from '../components/RestaurantCard';

const Favorites = () => {
  const { favorites } = useAppContext();
  const [activeTab, setActiveTab] = useState('Dishes');

  const favoriteDishes = favorites.filter(item => item.price); // Dishes have price
  const favoriteRestaurants = favorites.filter(item => !item.price); // Restaurants don't have price in our mock

  if (favorites.length === 0) {
    return (
      <div className="container animate-fade-in" style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
        <div style={{
          width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--surface-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
          color: 'var(--text-secondary)'
        }}>
          <Heart size={40} />
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px' }}>No favorites yet</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px' }}>
          Save your favorite restaurants and dishes to access them quickly.
        </p>
        <Link to="/restaurants" className="btn btn-primary">
          Explore Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px 80px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '32px' }}>Your Favorites</h1>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '32px'
      }}>
        <button
          onClick={() => setActiveTab('Dishes')}
          style={{
            padding: '12px 24px',
            fontSize: '1.1rem',
            fontWeight: activeTab === 'Dishes' ? '600' : '500',
            color: activeTab === 'Dishes' ? 'var(--primary-color)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'Dishes' ? '2px solid var(--primary-color)' : '2px solid transparent',
            transition: 'all var(--transition-fast)'
          }}
        >
          Dishes ({favoriteDishes.length})
        </button>
        <button
          onClick={() => setActiveTab('Restaurants')}
          style={{
            padding: '12px 24px',
            fontSize: '1.1rem',
            fontWeight: activeTab === 'Restaurants' ? '600' : '500',
            color: activeTab === 'Restaurants' ? 'var(--primary-color)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'Restaurants' ? '2px solid var(--primary-color)' : '2px solid transparent',
            transition: 'all var(--transition-fast)'
          }}
        >
          Restaurants ({favoriteRestaurants.length})
        </button>
      </div>

      {/* Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {activeTab === 'Dishes' && favoriteDishes.map(dish => (
          <DishCard key={dish.id} dish={dish} />
        ))}
        {activeTab === 'Restaurants' && favoriteRestaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      {(activeTab === 'Dishes' && favoriteDishes.length === 0) && (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>No favorite dishes saved.</p>
      )}
      {(activeTab === 'Restaurants' && favoriteRestaurants.length === 0) && (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>No favorite restaurants saved.</p>
      )}
    </div>
  );
};

export default Favorites;
