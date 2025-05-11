export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  image_url: string;
  category: string;
  stock: number;
  weight: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user: User;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
} 