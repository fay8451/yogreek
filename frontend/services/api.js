// Login
const login = async (username, password) => {
    try {
      const response = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      
      // Store the tokens in localStorage
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  
  // Get products
  const getProducts = async (category = null) => {
    try {
      let url = '/api/products/';
      if (category) {
        url += `?category=${category}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };
  
  // Create an order
  const createOrder = async (orderData) => {
    try {
      const token = localStorage.getItem('access_token');
      
      const response = await fetch('/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };
  
  // Get order status
  const getOrderStatus = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch order status');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching order status:', error);
      throw error;
    }
  };