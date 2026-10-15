import api from './api';

export const ticketService = {
  getAll: (params) => api.get('/tickets', { params }),
  getById: (id) => api.get(`/tickets/${id}`),
  getFeatured: () => api.get('/tickets', { params: { featured: true, limit: 6 } }),
  getCategories: () => api.get('/tickets/categories'),
  search: (query) => api.get('/tickets/search', { params: { q: query } }),
};

