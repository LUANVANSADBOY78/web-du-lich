import api from './api';

export const aiService = {
  sendMessage: (data) => api.post('/ai/chat', data),
  getConversations: () => api.get('/ai/conversations'),
  getConversation: (id) => api.get(`/ai/conversations/${id}`),
  deleteConversation: (id) => api.delete(`/ai/conversations/${id}`),
  planTrip: (data) => api.post('/ai/plan-trip', data),
};

