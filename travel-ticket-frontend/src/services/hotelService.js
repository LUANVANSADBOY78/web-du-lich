import api from './api';

export const hotelService = {
  getAll: (params) => api.get('/hotels', { params }),
  getById: (id) => api.get(`/hotels/${id}`),
  getFeatured: () => api.get('/hotels', { params: { featured: true, limit: 6 } }),
  search: (params) => api.get('/hotels/search', { params }),
};

