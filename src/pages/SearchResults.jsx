import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { restaurants, dishes } from '../data/mockData';
import RestaurantCard from '../components/RestaurantCard';
import DishCard from '../components/DishCard';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q')?.toLowerCase() || '';

  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(query) || 
    r.cuisine.toLowerCase().includes(query)
  );

  const filteredDishes = dishes.filter(d => 
    d.name.toLowerCase().includes(query) || 
    d.category.toLowerCase().includes(query)
  );

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px 80px' }}>
      <div style={{ marginBottom: '40px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '48px', height: '48px', borderRadius: 'var(--radius-md)', 
            backgroundColor: 'var(--primary-color)', color: 'white', 
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            <SearchIcon size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700' }}>Results for "{query}"</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Found {filteredRestaurants.length} restaurants and {filteredDishes.length} dishes
            </p>
          </div>
        </div>
      </div>

      {filteredRestaurants.length === 0 && filteredDishes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🔍</div>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px' }}>No matches found</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px' }}>
            We couldn't find anything matching "{query}". Try searching for something else like "Pizza", "Sushi", or "Pasta".
          </p>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      ) : (
        <>
          {filteredRestaurants.length > 0 && (
            <section style={{ marginBottom: '60px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '24px' }}>Restaurants</h2>
              <div className="responsive-grid">
                {filteredRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            </section>
          )}

          {filteredDishes.length > 0 && (
            <section>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '24px' }}>Dishes & Meals</h2>
              <div className="responsive-grid">
                {filteredDishes.map(dish => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
