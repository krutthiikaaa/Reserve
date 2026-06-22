import React, { useState } from 'react';
import DishCard from '../components/DishCard';
import { dishes } from '../data/mockData';

const Menu = () => {
  const categories = ['All', 'Starters', 'Main Course', 'Drinks', 'Desserts'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredDishes = activeCategory === 'All' 
    ? dishes 
    : dishes.filter(d => d.category === activeCategory);

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>Our Menu</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore our curated selection of dishes from top restaurants.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '40px'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '10px 24px',
              borderRadius: 'var(--radius-full)',
              fontWeight: '500',
              transition: 'all var(--transition-fast)',
              backgroundColor: activeCategory === cat ? 'var(--primary-color)' : 'var(--surface-color)',
              color: activeCategory === cat ? 'white' : 'var(--text-primary)',
              border: '1px solid',
              borderColor: activeCategory === cat ? 'var(--primary-color)' : 'var(--border-color)',
              boxShadow: activeCategory === cat ? 'var(--shadow-sm)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {filteredDishes.map(dish => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>

      {filteredDishes.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.2rem' }}>No dishes found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
