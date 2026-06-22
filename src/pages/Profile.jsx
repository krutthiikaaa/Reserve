import React, { useState } from 'react';
import { User, MapPin, Clock, Calendar, Settings, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Profile = () => {
  const { reservations } = useAppContext();
  const [activeTab, setActiveTab] = useState('Reservations');

  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
  };

  const tabs = [
    { id: 'Reservations', icon: Calendar },
    { id: 'Orders', icon: Clock },
    { id: 'Addresses', icon: MapPin },
    { id: 'Settings', icon: Settings }
  ];

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px 80px' }}>
      
      {/* Profile Header */}
      <div style={{
        backgroundColor: 'var(--surface-color)',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        <img 
          src={user.avatar} 
          alt={user.name} 
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>{user.name}</h1>
          <p style={{ color: 'var(--text-secondary)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span>{user.email}</span>
            <span>{user.phone}</span>
          </p>
        </div>
        <button className="btn btn-secondary" style={{ color: '#F44336', borderColor: '#F44336' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '40px' }}>
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '16px 20px', borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
                  color: isActive ? 'white' : 'var(--text-primary)',
                  transition: 'all var(--transition-fast)',
                  textAlign: 'left', fontWeight: '500'
                }}
              >
                <Icon size={20} /> {tab.id}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '32px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', minHeight: '400px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '24px' }}>{activeTab}</h2>
          
          {activeTab === 'Reservations' && (
            <div>
              {reservations.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>No upcoming reservations.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {reservations.map(res => (
                    <div key={res.id} style={{
                      display: 'flex', gap: '20px', padding: '20px',
                      border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)'
                    }}>
                      <img src={res.restaurantImage} alt={res.restaurantName} style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>{res.restaurantName}</h3>
                        <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {res.date}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {res.time}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={14} /> {res.guests} Guests</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '600' }}>Confirmed</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab !== 'Reservations' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--text-secondary)' }}>
              This section is for demonstration purposes.
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 3fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
