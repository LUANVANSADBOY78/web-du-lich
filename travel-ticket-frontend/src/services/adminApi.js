import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('gotravel_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const adminApi = {
  // Dashboard
  getDashboardSummary: () => api.get('/api/admin/dashboard/summary'),
  getRevenueReport: (period = 'month') => api.get(`/api/admin/reports/revenue?period=${period}`),

  // Tours
  getTours: (params) => api.get('/api/admin/tours', { params }),
  createTour: (data) => api.post('/api/admin/tours', data),
  updateTour: (id, data) => api.put(`/api/admin/tours/${id}`, data),
  deleteTour: (id) => api.delete(`/api/admin/tours/${id}`),

  // Bookings
  getBookings: (params) => api.get('/api/admin/bookings', { params }),
  updateBookingStatus: (id, status) => api.put(`/api/admin/bookings/${id}/status`, { status }),
  deleteBooking: (id) => api.delete(`/api/admin/bookings/${id}`),

  // Customers
  getCustomers: (params) => api.get('/api/admin/customers', { params }),
  toggleCustomerActive: (id) => api.put(`/api/admin/customers/${id}/toggle-active`),

  // Vouchers
  getVouchers: (params) => api.get('/api/admin/vouchers', { params }),
  createVoucher: (data) => api.post('/api/admin/vouchers', data),
  updateVoucher: (id, data) => api.put(`/api/admin/vouchers/${id}`, data),
  deleteVoucher: (id) => api.delete(`/api/admin/vouchers/${id}`),

  // Reviews
  getReviews: (params) => api.get('/api/admin/reviews', { params }),
  updateReviewStatus: (id, status) => api.put(`/api/admin/reviews/${id}/status`, { status }),
  deleteReview: (id) => api.delete(`/api/admin/reviews/${id}`),

  // Support Tickets
  getSupportTickets: (params) => api.get('/api/admin/supporttickets', { params }),
  createSupportTicket: (data) => api.post('/api/admin/supporttickets', data),
  updateSupportStatus: (id, status) => api.put(`/api/admin/supporttickets/${id}/status`, { status }),

  // Activity Logs
  getActivityLogs: (params) => api.get('/api/admin/activitylogs', { params }),
};
