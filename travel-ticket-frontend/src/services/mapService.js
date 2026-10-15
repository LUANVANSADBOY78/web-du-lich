import api from './api';
import { VIETNAM_DESTINATIONS } from '../data/mockDestinations';

export const mapService = {
  getDestinations: async (params = {}) => {
    try {
      const res = await api.get('/destinations', { params });
      if (res.data?.items && Array.isArray(res.data.items) && res.data.items.length > 0) {
        return res.data.items;
      }
      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
      return VIETNAM_DESTINATIONS;
    } catch {
      return VIETNAM_DESTINATIONS;
    }
  },

  getDestinationDetail: async (id) => {
    try {
      const res = await api.get(`/destinations/${id}`);
      return res.data;
    } catch {
      return VIETNAM_DESTINATIONS.find(d => d.id === Number(id)) || null;
    }
  },

  getStats: async () => {
    try {
      const res = await api.get('/destinations/stats');
      return res.data;
    } catch {
      return {
        totalProvinces: 63,
        regionNorth: 25,
        regionCentral: 19,
        regionSouth: 19,
        totalTours: VIETNAM_DESTINATIONS.reduce((acc, d) => acc + (d.tours || 0), 0),
        totalTickets: VIETNAM_DESTINATIONS.reduce((acc, d) => acc + (d.tickets || 0), 0)
      };
    }
  },

  search: (query) => api.get('/destinations', { params: { search: query } }),
};
