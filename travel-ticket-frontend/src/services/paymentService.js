import api from './api';

export const paymentService = {
  getAll: (params) => api.get('/admin/payments', { params }),
  getByBooking: (bookingId) => api.get(`/admin/payments/booking/${bookingId}`),
};

