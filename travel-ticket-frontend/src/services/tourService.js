import api from './api';

export const tourService = {
  getAll: (params) => api.get('/tours', { params }),
  getById: (id) => api.get(`/tours/${id}`),
  getBySlug: (slug) => api.get(`/tours/slug/${slug}`),
  getFeatured: () => api.get('/tours', { params: { featured: true, limit: 8 } }),
  getBestSeller: () => api.get('/tours', { params: { bestSeller: true, limit: 8 } }),
  getDomestic: () => api.get('/tours', { params: { type: 'domestic', limit: 8 } }),
  getInternational: () => api.get('/tours', { params: { type: 'international', limit: 8 } }),
  search: (query) => api.get('/tours/search', { params: { q: query } }),
};

