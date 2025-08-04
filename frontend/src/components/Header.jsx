import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide header on admin pages
  if (location.pathname.startsWith('/admin/')) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      backgroundColor: 'var(--card-bg)',
      padding: '1rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ 
            color: 'var(--coral-accent)', 
            fontSize: '1.8rem', 
            fontWeight: 'bold',
            margin: 0
          }}>
            🌸 MindCare
          </h1>
        </Link>

        {isAuthenticated && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/dashboard" className="btn btn-secondary">
              Dashboard
            </Link>
            <Link to="/profile" className="btn btn-secondary">
              Profile
            </Link>
            <Link to="/admin/login" className="btn btn-secondary">
              Admin
            </Link>
            <button 
              onClick={toggleTheme}
              className="btn btn-secondary"
              style={{ fontSize: '1.2rem' }}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 