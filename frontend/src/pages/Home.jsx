import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container fade-in" style={{ paddingTop: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: '3rem 2rem' }}>
          <h1 style={{ 
            color: 'var(--coral-accent)', 
            fontSize: '3rem', 
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            🌸 Welcome to MindCare
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Your safe space for mental health journaling and self-reflection. 
            Start your journey towards better mental well-being today.
          </p>

          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--light-brown)',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: '2px solid var(--border-color)'
          }}>
            <p style={{ 
              fontSize: '1.1rem', 
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              "The greatest glory in living lies not in never falling, but in rising every time we fall." 
              <br />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                — Nelson Mandela
              </span>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '12px 24px' }}>
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '12px 24px' }}>
              Register
            </Link>
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--coral-accent)' }}>Sign in</Link> or 
              <Link to="/register" style={{ color: 'var(--coral-accent)' }}> create a new account</Link> to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 