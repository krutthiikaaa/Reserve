import React, { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants, categories } from '../data/mockData';

const Restaurants = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Top Rated');

  const filteredRestaurants = restaurants.filter(r => 
    activeFilter === 'All' ? true : r.cuisine === activeFilter
  ).sort((a, b) => {
    if (sortBy === 'Top Rated') return b.rating - a.rating;
    if (sortBy === 'Nearest') return parseFloat(a.distance) - parseFloat(b.distance);
    return 0;
  });

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px 80px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>Explore Restaurants</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Find the perfect place for your next meal.</p>
      </div>

      {/* Filters and Sorting Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        padding: '20px',
        backgroundColor: 'var(--surface-color)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Categories */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
          <button
            onClick={() => setActiveFilter('All')}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              whiteSpace: 'nowrap',
              fontWeight: '500',
              backgroundColor: activeFilter === 'All' ? 'var(--primary-color)' : 'transparent',
              color: activeFilter === 'All' ? 'white' : 'var(--text-primary)',
              border: activeFilter === 'All' ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
              transition: 'all var(--transition-fast)'
            }}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.name)}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                whiteSpace: 'nowrap',
                fontWeight: '500',
                backgroundColor: activeFilter === cat.name ? 'var(--primary-color)' : 'transparent',
                color: activeFilter === cat.name ? 'white' : 'var(--text-primary)',
                border: activeFilter === cat.name ? '1px solid var(--primary-color)' : '1px solid var(--border-color)',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sorting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <SlidersHorizontal size={18} />
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Sort by:</span>
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-color)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontFamily: 'inherit',
              cursor: 'pointer'
            }}
          >
            <option value="Top Rated">Top Rated</option>
            <option value="Nearest">Nearest</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {filteredRestaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.2rem' }}>No restaurants found for the selected category.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
