import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Mic, Moon, Sun, Heart, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { cart, favorites } = useAppContext();
  const { currentUser, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      transition: 'all var(--transition-normal)',
      backgroundColor: isScrolled ? 'rgba(var(--surface-rgb), 0.85)' : 'var(--surface-color)',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
      padding: '16px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Left: Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', fontWeight: '700', textDecoration: 'none' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
            background: 'var(--primary-color)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem'
          }}>R</div>
          <span style={{ color: 'var(--primary-color)' }}>Reserve</span>
        </Link>

        {/* Center: Search Bar (Desktop) */}
        <div style={{
          display: 'none',
          flex: 1,
          maxWidth: '500px',
          margin: '0 24px',
          position: 'relative'
        }} className="desktop-search">
          <input 
            type="text" 
            placeholder="Search restaurants, cuisines, dishes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            style={{
              width: '100%',
              padding: '12px 20px',
              paddingLeft: '44px',
              paddingRight: '44px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-color)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'all var(--transition-fast)'
            }}
          />
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <button style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-color)' }}>
            <Mic size={18} />
          </button>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={toggleTheme} style={{ color: 'var(--text-primary)' }} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          
          <Link to="/favorites" style={{ color: isActive('/favorites') ? 'var(--primary-color)' : 'var(--text-primary)', position: 'relative' }}>
            <Heart size={22} />
            {favorites.length > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: 'var(--primary-color)', color: 'white', fontSize: '0.7rem', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {favorites.length}
              </span>
            )}
          </Link>

          <Link to="/cart" style={{ color: isActive('/cart') ? 'var(--primary-color)' : 'var(--text-primary)', position: 'relative' }}>
            <ShoppingCart size={22} />
            {cartItemCount > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: 'var(--primary-color)', color: 'white', fontSize: '0.7rem', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartItemCount}
              </span>
            )}
          </Link>

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isActive('/profile') ? 'var(--primary-color)' : 'var(--text-primary)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '600' }}>
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email[0].toUpperCase()}
                </div>
              </Link>
              <button onClick={handleLogout} style={{ color: 'var(--text-secondary)' }} aria-label="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--primary-color)', textDecoration: 'none', padding: '8px 12px' }}>
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: 'var(--text-primary)', display: 'none' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Required CSS for responsive visibility */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-search { display: block !important; }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
