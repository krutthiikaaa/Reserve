import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import DishCard from '../components/DishCard';
import { categories, restaurants, dishes, offers } from '../data/mockData';

const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [activeOffer, setActiveOffer] = useState(null);
  const cuisineRef = useRef(null);

  const handleExploreClick = (e) => {
    e.preventDefault();
    if (cuisineRef.current) {
      cuisineRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOfferClick = (offer) => {
    if (offer.type === 'slots') {
      navigate('/booking');
    } else {
      // Toggle offer filter
      if (activeOffer === offer.id) {
        setActiveOffer(null);
      } else {
        setActiveOffer(offer.id);
      }
    }
  };

  // Filter restaurants based on active offer and category
  let filteredRestaurants = restaurants;
  if (selectedLocation !== 'All') {
    filteredRestaurants = filteredRestaurants.filter(r => r.location === selectedLocation);
  }
  if (activeCategory !== 'All') {
    filteredRestaurants = filteredRestaurants.filter(r => r.cuisine === activeCategory);
  }
  if (activeOffer) {
    const offer = offers.find(o => o.id === activeOffer);
    if (offer?.type === 'dessert') {
      filteredRestaurants = filteredRestaurants.filter(r => r.hasFreeDessert);
    } else if (offer?.type === 'discount') {
      filteredRestaurants = filteredRestaurants.filter(r => r.hasReservationDiscount);
    } else if (offer?.type === 'delivery') {
      filteredRestaurants = filteredRestaurants.filter(r => r.hasFreeDelivery);
    }
  }

  // Filter dishes based on active category
  let filteredDishes = dishes.filter(d => d.badges?.includes('Best Seller') || d.badges?.includes('Trending') || d.badges?.includes('Signature'));
  if (activeCategory !== 'All' || selectedLocation !== 'All') {
    // Filter dishes by finding their restaurant's cuisine and location
    filteredDishes = filteredDishes.filter(d => {
      const rest = restaurants.find(r => r.id === d.restaurantId);
      if (!rest) return false;
      const matchesLocation = selectedLocation === 'All' || rest.location === selectedLocation;
      const matchesCuisine = activeCategory === 'All' || rest.cuisine === activeCategory;
      return matchesLocation && matchesCuisine;
    });
  }

  const BestSellersSection = () => (
    <section className="container section-padding" style={{ marginBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>🔥 Today's Best Sellers</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {activeCategory !== 'All' ? `Most loved ${activeCategory} dishes right now` : 'Most loved dishes right now'}
          </p>
        </div>
        <Link to="/menu" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-color)', fontWeight: '500' }}>
          View All <ArrowRight size={16} />
        </Link>
      </div>
      
      {filteredDishes.length > 0 ? (
        <div style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          paddingBottom: '20px',
          scrollbarWidth: 'none'
        }}>
          {filteredDishes.slice(0, 8).map(dish => (
            <div key={dish.id} className="best-seller-item" style={{ minWidth: '280px', width: '280px', maxWidth: '85vw' }}>
              <DishCard dish={dish} />
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--text-secondary)' }}>No best sellers found for this category.</p>
      )}
    </section>
  );

  const RestaurantsSection = () => (
    <section className="container section-padding" style={{ marginBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>📍 Our Restaurants</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Explore places to dine around you</p>
        </div>
        <Link to="/restaurants" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-color)', fontWeight: '500' }}>
          View All <ArrowRight size={16} />
        </Link>
      </div>
      
      {filteredRestaurants.length > 0 ? (
        <div className="responsive-grid">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--text-secondary)' }}>No restaurants found matching your criteria.</p>
      )}
    </section>
  );

  return (
    <div className="animate-fade-in">
      {/* 1. Hero Section */}
      <section style={{
        position: 'relative',
        height: '80vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
          zIndex: -1
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
          <h1 className="animate-slide-up" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '700', marginBottom: '24px', lineHeight: '1.1' }}>
            Find Your Perfect <br />
            <span style={{ color: 'var(--secondary-color)' }}>Meal Experience</span>
          </h1>
          <p className="animate-slide-up" style={{ animationDelay: '0.1s', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px', color: '#E0E0E0' }}>
            Discover top restaurants, reserve tables, and explore trending dishes near you with our minimal and elegant platform.
          </p>
          <div className="animate-slide-up" style={{ animationDelay: '0.2s', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleExploreClick} className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              Explore Restaurants
            </button>
          </div>
        </div>
      </section>

      {/* 2. Offer Cards Section */}
      <section className="container section-padding" style={{ marginTop: '40px', marginBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {offers.map(offer => (
            <div 
              key={offer.id} 
              onClick={() => handleOfferClick(offer)}
              style={{
                backgroundColor: offer.color,
                color: 'white',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transform: activeOffer === offer.id ? 'scale(0.98)' : 'scale(1)',
                boxShadow: activeOffer === offer.id ? 'inset 0 4px 12px rgba(0,0,0,0.2)' : 'var(--shadow-md)',
                transition: 'all var(--transition-fast)'
              }}>
              <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '8px' }}>{offer.title}</h3>
              <p style={{ opacity: 0.9 }}>{offer.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Filters Section (Location + Cuisines) */}
      <section ref={cuisineRef} className="container" style={{ position: 'relative', zIndex: 10, marginBottom: '40px' }}>
        <div className="glass categories-container" style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Location Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
            <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Location:</span>
            <select 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--surface-color)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Locations</option>
              {['Hyderabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Vizag'].map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)', opacity: 0.5 }} />

          {/* Cuisines Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px'
          }}>
          <button
            onClick={() => setActiveCategory('All')}
            style={{
              padding: '10px 24px',
              borderRadius: 'var(--radius-full)',
              whiteSpace: 'nowrap',
              fontWeight: '500',
              transition: 'all var(--transition-fast)',
              backgroundColor: activeCategory === 'All' ? 'var(--primary-color)' : 'transparent',
              color: activeCategory === 'All' ? 'white' : 'var(--text-primary)',
              border: activeCategory === 'All' ? '1px solid var(--primary-color)' : '1px solid var(--border-color)'
            }}
          >
            All Cuisines
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              style={{
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                whiteSpace: 'nowrap',
                fontWeight: '500',
                transition: 'all var(--transition-fast)',
                backgroundColor: activeCategory === category.name ? 'var(--primary-color)' : 'transparent',
                color: activeCategory === category.name ? 'white' : 'var(--text-primary)',
                border: activeCategory === category.name ? '1px solid var(--primary-color)' : '1px solid var(--border-color)'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
        </div>
      </section>

      {/* 
        Dynamic Reordering:
        If category is 'All', show Best Sellers then Restaurants.
        If category is selected, show Restaurants then Best Sellers.
      */}
      {activeCategory === 'All' ? (
        <>
          <BestSellersSection />
          <RestaurantsSection />
        </>
      ) : (
        <>
          <RestaurantsSection />
          <BestSellersSection />
        </>
      )}
    </div>
  );
};

export default Home;
