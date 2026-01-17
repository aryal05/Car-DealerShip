import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://car-dealership-production-3c2c.up.railway.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Vehicle APIs
export const vehicleAPI = {
  getAll: (params) => api.get('/vehicles', { params }),
  getOne: (id) => api.get(`/vehicles/${id}`),
  create: (data) => api.post('/vehicles', data),
  update: (id, data) => api.put(`/vehicles/${id}`, data),
  delete: (id) => api.delete(`/vehicles/${id}`),
  getFilters: () => api.get('/vehicles/filters'),
  getStats: () => api.get('/vehicles/stats'),
};

export default api;
