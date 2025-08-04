import axios from 'axios';

// Normal user API (port 5000)
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Admin API (port 5001)
const adminApi = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to both
const attachAuth = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(err);
    }
  );
};

attachAuth(api);
attachAuth(adminApi);

// Auth API (port 5000)
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  verifyOtp: (otpData) => api.post('/auth/verify-otp', otpData),
  login: (loginData) => api.post('/auth/login', loginData),
};

// Admin API (port 5001)
export const adminAPI = {
  login: (loginData) => adminApi.post('/auth/admin/login', loginData), // ✅ fixed route
  getUsers: () => adminApi.get('/admin/users'),
  banUser: (userId) => adminApi.patch(`/admin/users/${userId}/ban`),
  unbanUser: (userId) => adminApi.patch(`/admin/users/${userId}/unban`),
  getJournals: () => adminApi.get('/admin/journals'),
  deleteJournal: (journalId) => adminApi.delete(`/admin/journals/${journalId}`),
};


// Journal API (port 5000)
export const journalAPI = {
  createJournal: (journalData) => api.post('/journals', journalData),
  getAllJournals: () => api.get('/journals'),
  getJournalById: (id) => api.get(`/journals/${id}`),
  updateJournal: (id, journalData) => api.put(`/journals/${id}`, journalData),
  deleteJournal: (id) => api.delete(`/journals/${id}`),
  togglePinJournal: (id) => api.patch(`/journals/${id}/pin`),
};

export default api;
