import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

// Scores
export const getScores = () => api.get('/scores');
export const addScore = (data) => api.post('/scores', data);
export const updateScore = (id, data) => api.put(`/scores/${id}`, data);
export const deleteScore = (id) => api.delete(`/scores/${id}`);

// Draws
export const getDraws = () => api.get('/draws');
export const getDraw = (id) => api.get(`/draws/${id}`);
export const getUpcomingDraw = () => api.get('/draws/upcoming');

// Charities
export const getCharities = (params) => api.get('/charities', { params });
export const getCharity = (id) => api.get(`/charities/${id}`);
export const selectCharity = (data) => api.put('/charities/select', data);
export const donateToCharity = (data) => api.post('/charities/donate', data);

// Dashboard
export const getDashboardSummary = () => api.get('/dashboard/summary');
export const getWinnings = () => api.get('/dashboard/winnings');
export const getParticipation = () => api.get('/dashboard/participation');

// Payments (mock)
export const subscribe = (data) => api.post('/payments/subscribe', data);
export const cancelSubscription = () => api.post('/payments/cancel');
export const getSubscriptionStatus = () => api.get('/payments/status');

// Admin
export const adminGetUsers = () => api.get('/admin/users');
export const adminUpdateUser = (id, data) => api.put(`/admin/users/${id}`, data);
export const adminUpdateUserScores = (id, data) => api.put(`/admin/users/${id}/scores`, data);
export const adminConfigureDraw = (data) => api.post('/admin/draws/configure', data);
export const adminSimulateDraw = (data) => api.post('/admin/draws/simulate', data);
export const adminPublishDraw = (id) => api.post('/admin/draws/publish', { drawId: id });
export const adminGetCharities = () => api.get('/admin/charities');
export const adminCreateCharity = (data) => api.post('/admin/charities', data);
export const adminUpdateCharity = (id, data) => api.put(`/admin/charities/${id}`, data);
export const adminDeleteCharity = (id) => api.delete(`/admin/charities/${id}`);
export const adminGetWinners = () => api.get('/admin/winners');
export const adminVerifyWinner = (id, data) => api.put(`/admin/winners/${id}/verify`, data);
export const adminMarkPayout = (id) => api.put(`/admin/winners/${id}/payout`);
export const adminGetReports = () => api.get('/admin/reports');

export default api;
