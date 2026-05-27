import axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor do obsługi tokenów JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funkcje dla grup
export const groupAPI = {
  createGroup: (name: string, members: string[]) =>
    apiClient.post('/groups', { name, members }),
  getGroup: (groupId: string) =>
    apiClient.get(`/groups/${groupId}`),
  joinGroup: (code: string) =>
    apiClient.post('/groups/join', { code }),
  updateGroup: (groupId: string, data: any) =>
    apiClient.put(`/groups/${groupId}`, data),
};

// Funkcje dla destynacji
export const destinationAPI = {
  getDestinations: (filters?: any) =>
    apiClient.get('/destinations', { params: filters }),
  getDestination: (id: string) =>
    apiClient.get(`/destinations/${id}`),
  voteDestination: (groupId: string, destinationId: string, vote: boolean) =>
    apiClient.post(`/groups/${groupId}/vote`, { destinationId, vote }),
};

// Funkcje dla itinerarium
export const itineraryAPI = {
  getItinerary: (groupId: string) =>
    apiClient.get(`/groups/${groupId}/itinerary`),
  updateItinerary: (groupId: string, itinerary: any) =>
    apiClient.put(`/groups/${groupId}/itinerary`, itinerary),
  generateItinerary: (groupId: string, preferences: any) =>
    apiClient.post(`/groups/${groupId}/itinerary/generate`, preferences),
};

// Funkcje dla użytkownika
export const userAPI = {
  getCurrentUser: () =>
    apiClient.get('/users/me'),
  updateProfile: (data: any) =>
    apiClient.put('/users/me', data),
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  logout: () =>
    apiClient.post('/auth/logout'),
};

export default apiClient;
