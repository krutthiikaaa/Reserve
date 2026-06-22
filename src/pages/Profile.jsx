import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Clock, Calendar, Settings, LogOut, Edit2, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { reservations } = useAppContext();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Reservations');

  const [user, setUser] = useState({
    name: currentUser?.displayName || 'User',
    email: currentUser?.email || '',
    phone: currentUser?.phoneNumber || '',
    avatar: currentUser?.photoURL || ''
  });

  useEffect(() => {
    if (currentUser) {
      setUser(prev => ({
        ...prev,
        name: currentUser.displayName || prev.name,
        email: currentUser.email || prev.email,
        phone: currentUser.phoneNumber || prev.phone,
        avatar: currentUser.photoURL || prev.avatar
      }));
    }
  }, [currentUser]);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);

  useEffect(() => {
    setEditForm(user);
  }, [user]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUser(editForm);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
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
          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=C97B63&color=fff`} 
          alt={user.name} 
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>{user.name}</h1>
          <p style={{ color: 'var(--text-secondary)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span>{user.email}</span>
            <span>{user.phone ? user.phone : <span style={{ fontStyle: 'italic', opacity: 0.7 }}>Add phone number</span>}</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => setIsEditing(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Edit2 size={18} /> Edit Profile
          </button>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ color: '#F44336', borderColor: '#F44336', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
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
      
      {/* Edit Profile Modal */}
      {isEditing && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} className="animate-fade-in">
          <div style={{
            backgroundColor: 'var(--surface-color)', padding: '32px',
            borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '500px',
            position: 'relative'
          }}>
            <button 
              onClick={() => setIsEditing(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--text-secondary)' }}
            >
              <X size={24} />
            </button>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '24px' }}>Edit Profile</h2>
            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-secondary)' }}>Full Name</label>
                <input 
                  type="text" 
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-secondary)' }}>Email Address</label>
                <input 
                  type="email" 
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-secondary)' }}>Phone Number</label>
                <input 
                  type="tel" 
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-secondary)' }}>Avatar Image URL</label>
                <input 
                  type="url" 
                  value={editForm.avatar}
                  onChange={(e) => setEditForm({...editForm, avatar: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary" style={{ flex: 1, padding: '14px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '14px' }}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
