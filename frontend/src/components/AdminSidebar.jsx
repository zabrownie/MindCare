import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-sidebar" style={{
      width: '250px',
      backgroundColor: 'var(--card-bg)',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          color: 'var(--coral-accent)', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          margin: 0,
          textAlign: 'center'
        }}>
          🛡️ Admin Panel
        </h2>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link 
              to="/admin/dashboard" 
              className="btn btn-secondary"
              style={{ 
                width: '100%', 
                textAlign: 'left',
                justifyContent: 'flex-start',
                padding: '12px 16px'
              }}
            >
              📊 Dashboard
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link 
              to="/admin/users" 
              className="btn btn-secondary"
              style={{ 
                width: '100%', 
                textAlign: 'left',
                justifyContent: 'flex-start',
                padding: '12px 16px'
              }}
            >
              👥 Users
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link 
              to="/admin/journals" 
              className="btn btn-secondary"
              style={{ 
                width: '100%', 
                textAlign: 'left',
                justifyContent: 'flex-start',
                padding: '12px 16px'
              }}
            >
              📝 Journals
            </Link>
          </li>
        </ul>
      </nav>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
        <button 
          onClick={handleLogout} 
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar; 