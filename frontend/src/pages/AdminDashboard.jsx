import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { adminAPI } from '../services/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch users and journals data
      const [usersResponse, journalsResponse] = await Promise.all([
        adminAPI.getUsers(),
        adminAPI.getJournals()
      ]);
      
      setUsers(usersResponse.data);
      setJournals(journalsResponse.data);
    } catch (error) {
      setMessage('Failed to fetch data');
      // Use placeholder data for demo
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'banned' }
      ]);
      setJournals([
        { id: 1, title: 'My First Entry', content: 'Today was a good day...', userId: 1, createdAt: '2024-01-15' },
        { id: 2, title: 'Reflections', content: 'I learned something new...', userId: 2, createdAt: '2024-01-14' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId) => {
    try {
      await adminAPI.banUser(userId);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'banned' } : user
      ));
      setMessage('User banned successfully');
    } catch (error) {
      setMessage('Failed to ban user');
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      await adminAPI.unbanUser(userId);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'active' } : user
      ));
      setMessage('User unbanned successfully');
    } catch (error) {
      setMessage('Failed to unban user');
    }
  };

  const handleDeleteJournal = async (journalId) => {
    try {
      await adminAPI.deleteJournal(journalId);
      setJournals(journals.filter(journal => journal.id !== journalId));
      setMessage('Journal deleted successfully');
    } catch (error) {
      setMessage('Failed to delete journal');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      
      <div className="admin-content" style={{ 
        flex: 1, 
        marginLeft: '250px', 
        padding: '2rem',
        backgroundColor: 'var(--background)',
        minHeight: '100vh'
      }}>
        <div className="fade-in">
          <h1 style={{ 
            color: 'var(--coral-accent)', 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Welcome, Admin! 👋
          </h1>

          {message && (
            <div style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '8px',
              backgroundColor: message.includes('successfully') ? 'var(--coral-accent)' : 'var(--deep-red)',
              color: 'white',
              textAlign: 'center'
            }}>
              {message}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div className="card">
              <h3 style={{ color: 'var(--coral-accent)', marginBottom: '1rem' }}>📊 Statistics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--coral-accent)' }}>
                    {users.length}
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>Total Users</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--coral-accent)' }}>
                    {journals.length}
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>Total Journals</div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{ color: 'var(--coral-accent)', marginBottom: '1rem' }}>🔍 Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={fetchData}>
                  Refresh Data
                </button>
                <button className="btn btn-primary">
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--coral-accent)', marginBottom: '1rem' }}>👥 User Management</h3>
            {loading ? (
              <p>Loading users...</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px' }}>{user.name}</td>
                        <td style={{ padding: '12px' }}>{user.email}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            backgroundColor: user.status === 'active' ? 'var(--coral-accent)' : 'var(--deep-red)',
                            color: 'white'
                          }}>
                            {user.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          {user.status === 'active' ? (
                            <button 
                              className="btn btn-secondary"
                              style={{ fontSize: '0.8rem', padding: '4px 8px' }}
                              onClick={() => handleBanUser(user.id)}
                            >
                              Ban
                            </button>
                          ) : (
                            <button 
                              className="btn btn-primary"
                              style={{ fontSize: '0.8rem', padding: '4px 8px' }}
                              onClick={() => handleUnbanUser(user.id)}
                            >
                              Unban
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Journals Table */}
          <div className="card">
            <h3 style={{ color: 'var(--coral-accent)', marginBottom: '1rem' }}>📝 Journal Management</h3>
            {loading ? (
              <p>Loading journals...</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Title</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Content Preview</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>User ID</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Created</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {journals.map(journal => (
                      <tr key={journal.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px' }}>{journal.title}</td>
                        <td style={{ padding: '12px' }}>
                          {journal.content.substring(0, 50)}...
                        </td>
                        <td style={{ padding: '12px' }}>{journal.userId}</td>
                        <td style={{ padding: '12px' }}>{journal.createdAt}</td>
                        <td style={{ padding: '12px' }}>
                          <button 
                            className="btn btn-secondary"
                            style={{ fontSize: '0.8rem', padding: '4px 8px' }}
                            onClick={() => handleDeleteJournal(journal.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 