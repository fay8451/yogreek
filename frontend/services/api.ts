import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async () => {
  const response = await api.get('/api/products/');
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await api.get(`/api/products/${id}/`);
  return response.data;
};

export const createOrder = async (orderData: any) => {
  const response = await api.post('/api/orders/', orderData);
  return response.data;
};

export const getOrder = async (id: string) => {
  const response = await api.get(`/api/orders/${id}/`);
  return response.data;
};

export default api;
