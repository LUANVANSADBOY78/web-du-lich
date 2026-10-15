import api from './api';

export const bookingService = {
  create: (data) => api.post('/bookings', data),
  getMyBookings: (params) => api.get('/my/bookings', { params }),
  getById: (id) => api.get(`/bookings/${id}`),
  cancel: (id) => api.put(`/bookings/${id}/cancel`),
  applyVoucher: (code, amount) => api.post('/vouchers/apply', { code, amount }),
};

