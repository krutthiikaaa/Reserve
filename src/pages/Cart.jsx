import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useAppContext();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const delivery = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + tax + delivery;

  if (cart.length === 0) {
    return (
      <div className="container animate-fade-in" style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
        <div style={{
          width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--surface-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'
        }}>
          <span style={{ fontSize: '3rem' }}>🛒</span>
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px' }}>
          Looks like you haven't added any delicious meals yet.
        </p>
        <Link to="/menu" className="btn btn-primary">
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px 80px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '32px' }}>Your Cart</h1>

      <div className="split-layout">
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cart.map(item => (
            <div key={item.id} style={{
              display: 'flex', gap: '20px', backgroundColor: 'var(--surface-color)',
              padding: '20px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)'
            }}>
              <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '4px' }}>{item.name}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.restaurant}</p>
                  </div>
                  <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-full)', padding: '4px 8px' }}>
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ fontWeight: '600', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ color: '#F44336', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div style={{
            backgroundColor: 'var(--surface-color)', padding: '30px',
            borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)',
            position: 'sticky', top: '100px'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Tax (10%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Delivery Fee</span>
                <span>₹{delivery.toFixed(2)}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>Total</span>
              <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>₹{total.toFixed(2)}</span>
            </div>

            {/* Promo Code */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
              <input 
                type="text" 
                placeholder="Promo code" 
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)',
                  color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit'
                }}
              />
              <button className="btn btn-secondary" style={{ padding: '12px 20px', borderRadius: 'var(--radius-md)' }}>
                Apply
              </button>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem', justifyContent: 'space-between' }}>
              <span>Checkout</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
