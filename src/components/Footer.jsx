import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--surface-color)',
      padding: '60px 0 20px',
      marginTop: '60px',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
                background: 'var(--primary-color)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem'
              }}>R</div>
              <span className="text-gradient">Reserve</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Discover top restaurants, reserve tables, and explore trending dishes near you.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '16px', fontWeight: '600' }}>Explore</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/restaurants" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>Restaurants</Link></li>
              <li><Link to="/menu" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>Menus</Link></li>
              <li><Link to="/offers" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>Offers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '16px', fontWeight: '600' }}>Company</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/about" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>About Us</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>Contact</Link></li>
              <li><Link to="/privacy" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}>Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.85rem'
        }}>
          &copy; {new Date().getFullYear()} Reserve. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
