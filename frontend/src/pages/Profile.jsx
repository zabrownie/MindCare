import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container fade-in" style={{ paddingTop: '2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card">
          <h2 className="text-center mb-20" style={{ color: 'var(--coral-accent)' }}>
            👤 Your Profile
          </h2>

          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'var(--coral-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              margin: '0 auto 20px',
              color: 'white'
            }}>
              👤
            </div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>
              Welcome to MindCare
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Your personal journaling companion
            </p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ color: 'var(--coral-accent)', marginBottom: '15px' }}>Account Information</h4>
            <div style={{ 
              backgroundColor: 'var(--background)', 
              padding: '15px', 
              borderRadius: '8px',
              marginBottom: '15px'
            }}>
              <p style={{ marginBottom: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Status:</strong>
                <span style={{ color: 'var(--light-brown)', marginLeft: '10px' }}>✓ Active</span>
              </p>
              <p style={{ marginBottom: '8px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Member Since:</strong>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '10px' }}>
                  {new Date().toLocaleDateString()}
                </span>
              </p>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Account Type:</strong>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '10px' }}>Free</span>
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ color: 'var(--coral-accent)', marginBottom: '15px' }}>App Features</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ 
                backgroundColor: 'var(--background)', 
                padding: '15px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📝</div>
                <h5 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>Journal Entries</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Write your thoughts</p>
              </div>
              <div style={{ 
                backgroundColor: 'var(--background)', 
                padding: '15px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📌</div>
                <h5 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>Pin Important</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Mark special entries</p>
              </div>
              <div style={{ 
                backgroundColor: 'var(--background)', 
                padding: '15px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>😊</div>
                <h5 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>Mood Tracking</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Track your feelings</p>
              </div>
              <div style={{ 
                backgroundColor: 'var(--background)', 
                padding: '15px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💭</div>
                <h5 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>Inspiration</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Daily motivation</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={logout}
              className="btn btn-primary"
              style={{ backgroundColor: 'var(--deep-red)' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 