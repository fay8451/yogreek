import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

// Fix: Always use relative path for API
const API_BASE_URL = '/api';

interface OrderResponse {
  id: string;
  status: string;
  total_amount: string;
  items: Array<{
    product_id: string;
    quantity: number;
    price: string;
  }>;
  shipping_address: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  payment_method: string;
  shipping_method: string;
  created_at: string;
  updated_at: string;
}

interface OrderRequest {
  items: Array<{
    product_id: string;
    quantity: number;
    price: string;
  }>;
  shipping_address: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  payment_method: string;
  shipping_method: string;
  total_amount: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error Request:', {
        request: error.request,
        message: 'No response received from server',
      });
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error:', {
        message: error.message,
        config: error.config,
      });
      throw new Error('Error setting up request');
    }
  }
);

// Product API calls
export const productApi = {
  // Get all products
  getAllProducts: async () => {
    try {
      console.log('Fetching products from:', `${API_BASE_URL}/products/`);
    const response = await api.get('/products/');
      console.log('Products response:', response.data);
    return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (productId: string) => {
    const response = await api.get(`/products/${productId}/`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category: string) => {
    const response = await api.get(`/products/?category=${category}`);
    return response.data;
  },

  // Get all categories
  getCategories: async () => {
    const response = await api.get('/products/categories/');
    return response.data;
  },
};

// แก้ไข request interceptor เพื่อป้องกันปัญหา localStorage ในฝั่ง server
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // ตรวจสอบว่าอยู่ในฝั่ง client ก่อนใช้ localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Order API calls
export const orderApi = {
  // Create new order
  createOrder: async (orderData: OrderRequest): Promise<OrderResponse | null> => {
    try {
      console.log('Creating order with data:', orderData);
      console.log('API URL:', `${API_BASE_URL}/orders/`);
      
      const response = await api.post<OrderResponse>('/orders/', orderData);
      console.log('Order creation response:', response);
      // ถ้า response เป็น empty object แต่ status 201 (Created)
       if ((!response.data || Object.keys(response.data).length === 0) && response.status === 201) {
        console.log('Empty response with 201 status - returning null');
        return null; // Return null instead of throwing
      }
        
      // ตรวจสอบ response.data
      if (!response.data || !response.data.id) {
        console.error('Invalid response data:', response.data);
        return null; // Return null instead of throwing
      }

    return response.data;
  } catch (error) {
      console.error('Create Order Error:', error);
      return null; // Return null instead of throwing
  }
  },

  // Get order by ID
  getOrderById: async (orderId: string): Promise<OrderResponse> => {
    try {
      const response = await api.get<OrderResponse>(`/orders/${orderId}/`);
      if (!response.data) {
        throw new Error('Order not found');
      }
      return response.data;
    } catch (error) {
      console.error('Get Order Error:', error);
      throw error;
    }
  },

  // Get user's orders
  getUserOrders: async (): Promise<OrderResponse[]> => {
    try {
      const response = await api.get<OrderResponse[]>('/orders/user/');
      return response.data;
    } catch (error) {
      console.error('Get User Orders Error:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: string): Promise<OrderResponse> => {
    try {
      const response = await api.patch<OrderResponse>(`/orders/${orderId}/`, { status });
      return response.data;
    } catch (error) {
      console.error('Update Order Status Error:', error);
      throw error;
    }
  },
};

// Auth API calls
export const authApi = {
  // Login
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  },

  // Register
  register: async (userData: any) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout/');
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/user/');
    return response.data;
  },
};

export async function registerUser(data: {
  email: string;
  fullname: string;
  username: string;
  phone: string;
  password: string;
}) {
  try {
    const response = await api.post('/users/register/', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Registration failed');
    }
    throw error;
  }
}

export default api; 
