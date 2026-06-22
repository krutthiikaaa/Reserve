import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Info, Image as ImageIcon, Heart } from 'lucide-react';
import { restaurants, dishes } from '../data/mockData';
import DishCard from '../components/DishCard';
import { useAppContext } from '../context/AppContext';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Menu');
  const { isFavorite, toggleFavorite } = useAppContext();

  const restaurant = restaurants.find(r => r.id === id);
  const restaurantDishes = dishes.filter(d => d.restaurantId === id);

  if (!restaurant) {
    return <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>Restaurant not found</div>;
  }

  const favorite = isFavorite(restaurant.id);

  const tabs = ['Menu', 'Reviews', 'About', 'Gallery'];

  return (
    <div className="animate-fade-in">
      {/* Banner */}
      <div className="restaurant-banner" style={{ position: 'relative', width: '100%' }}>
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to top, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.2) 100%)'
        }} />
        
        <div className="container" style={{ position: 'absolute', bottom: '40px', left: 0, right: 0, color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ backgroundColor: 'var(--primary-color)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '600' }}>
                  {restaurant.cuisine}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: 'var(--radius-full)' }}>
                  <Star size={14} color="#F4A261" fill="#F4A261" />
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{restaurant.rating}</span>
                </div>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '700', marginBottom: '12px', lineHeight: '1.2' }}>{restaurant.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', color: '#E0E0E0', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} />
                  <span>{restaurant.distance} • {restaurant.address}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={16} />
                  <span>Delivery: {restaurant.eta}</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => toggleFavorite(restaurant)}
                style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: favorite ? '#F44336' : 'white',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Heart size={20} fill={favorite ? '#F44336' : 'none'} />
              </button>
              <Link to={`/booking?restaurantId=${restaurant.id}`} className="btn btn-primary" style={{ padding: '0 24px' }}>
                Book Table
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: '40px 20px 80px' }}>
        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '32px', borderBottom: '1px solid var(--border-color)', marginBottom: '32px', overflowX: 'auto', scrollbarWidth: 'none'
        }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 0',
                fontSize: '1.1rem',
                fontWeight: activeTab === tab ? '600' : '500',
                color: activeTab === tab ? 'var(--primary-color)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab ? '2px solid var(--primary-color)' : '2px solid transparent',
                transition: 'all var(--transition-fast)',
                whiteSpace: 'nowrap'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Menu' && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '24px' }}>Menu Highlights</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {restaurantDishes.map(dish => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'About' && (
          <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '16px' }}>About {restaurant.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '32px' }}>
              {restaurant.description}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '24px', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-md)' }}>
                <Clock size={24} color="var(--primary-color)" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Opening Hours</h4>
                <p style={{ color: 'var(--text-secondary)' }}>Mon-Sun: 10:00 AM - 11:00 PM</p>
              </div>
              <div style={{ padding: '24px', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-md)' }}>
                <MapPin size={24} color="var(--primary-color)" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Location</h4>
                <p style={{ color: 'var(--text-secondary)' }}>{restaurant.address}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '24px' }}>Customer Reviews</h2>
            {restaurant.reviews && restaurant.reviews.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {restaurant.reviews.map(review => (
                  <div key={review.id} style={{
                    backgroundColor: 'var(--surface-color)',
                    padding: '24px',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <h4 style={{ fontWeight: '600', fontSize: '1.1rem' }}>{review.user}</h4>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{review.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'var(--bg-color)', padding: '4px 8px', borderRadius: 'var(--radius-sm)' }}>
                        <Star size={14} color="var(--accent-color)" fill="var(--accent-color)" />
                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{review.rating}</span>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>"{review.text}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No reviews yet.</p>
            )}
          </div>
        )}

        {activeTab === 'Gallery' && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '24px' }}>Photo Gallery</h2>
            {restaurant.gallery && restaurant.gallery.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '16px'
              }}>
                {restaurant.gallery.map((img, idx) => (
                  <div key={idx} style={{
                    position: 'relative',
                    paddingBottom: '100%',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <img 
                      src={img} 
                      alt={`Gallery \${idx}`} 
                      style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No photos available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
