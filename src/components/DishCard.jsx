import React from 'react';
import { Plus, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const DishCard = ({ dish }) => {
  const { addToCart, toggleFavorite, isFavorite } = useAppContext();
  const favorite = isFavorite(dish.id);

  return (
    <div style={{
      backgroundColor: 'var(--surface-color)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    className="dish-card"
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
    }}>
      <div style={{ position: 'relative', height: '180px' }}>
        <img 
          src={dish.image} 
          alt={dish.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
          {dish.badges?.map((badge, index) => (
            <span key={index} style={{
              backgroundColor: 'var(--accent-color)',
              color: 'white',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.7rem',
              fontWeight: '600'
            }}>
              {badge}
            </span>
          ))}
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); toggleFavorite(dish); }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: favorite ? '#F44336' : '#555',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Heart size={16} fill={favorite ? '#F44336' : 'none'} />
        </button>
      </div>
      
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>{dish.name}</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>
          {dish.restaurant}
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {dish.description}
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-color)' }}>
            ₹{dish.price.toFixed(2)}
          </span>
          <button 
            onClick={() => addToCart(dish)}
            style={{
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B86A52'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
            aria-label="Add to Cart"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
