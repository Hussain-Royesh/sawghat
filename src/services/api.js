// API Service for Sawghat E-commerce
const API_BASE_URL = 'http://localhost:4001';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  // Helper method to get headers
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Helper method for API calls
  async apiCall(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        ...options,
        headers: {
          ...this.getHeaders(options.auth !== false),
          ...options.headers,
        },
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API call failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Update token method
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // ==================== AUTH SERVICES ====================

  async register(userData) {
    const response = await this.apiCall('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      auth: false,
    });

    if (response.success) {
      this.setToken(response.token);
    }

    return response;
  }

  async login(credentials) {
    const response = await this.apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      auth: false,
    });

    if (response.success) {
      this.setToken(response.token);
    }

    return response;
  }

  async getProfile() {
    return await this.apiCall('/api/auth/profile');
  }

  async updateProfile(profileData) {
    return await this.apiCall('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData) {
    return await this.apiCall('/api/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  }

  async verifyToken() {
    try {
      return await this.apiCall('/api/auth/verify-token', {
        method: 'POST',
      });
    } catch (error) {
      this.setToken(null);
      return { success: false };
    }
  }

  logout() {
    this.setToken(null);
    return { success: true, message: 'Logged out successfully' };
  }

  // ==================== PRODUCT SERVICES ====================

  async getProducts(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/api/products${queryString ? `?${queryString}` : ''}`;
    
    return await this.apiCall(endpoint, { auth: false });
  }

  async getProduct(productId) {
    return await this.apiCall(`/api/products/${productId}`, { auth: false });
  }

  async getFeaturedProducts() {
    return await this.apiCall('/api/products/featured/list', { auth: false });
  }

  async getProductsByCategory(category, filters = {}) {
    const queryParams = new URLSearchParams(filters);
    const queryString = queryParams.toString();
    const endpoint = `/api/products/category/${category}${queryString ? `?${queryString}` : ''}`;
    
    return await this.apiCall(endpoint, { auth: false });
  }

  async searchProducts(searchTerm, filters = {}) {
    const searchFilters = { ...filters, search: searchTerm };
    return await this.getProducts(searchFilters);
  }

  async addProductReview(productId, reviewData) {
    return await this.apiCall(`/api/products/${productId}/review`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  // ==================== CART SERVICES ====================

  async getCart() {
    return await this.apiCall('/api/cart');
  }

  async addToCart(cartData) {
    return await this.apiCall('/api/cart/add', {
      method: 'POST',
      body: JSON.stringify(cartData),
    });
  }

  async updateCartItem(itemId, quantity) {
    return await this.apiCall(`/api/cart/update/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(itemId) {
    return await this.apiCall(`/api/cart/remove/${itemId}`, {
      method: 'DELETE',
    });
  }

  async clearCart() {
    return await this.apiCall('/api/cart/clear', {
      method: 'DELETE',
    });
  }

  async getCartCount() {
    return await this.apiCall('/api/cart/count');
  }

  // ==================== FILE UPLOAD SERVICES ====================

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('product', file);

    try {
      const response = await fetch(`${this.baseURL}/upload`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, let browser set it with boundary
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      return data;
    } catch (error) {
      console.error('Upload Error:', error);
      throw error;
    }
  }

  // ==================== ORDER SERVICES ====================

  async createOrder(orderData) {
    return await this.apiCall('/api/orders/create', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(filters = {}) {
    const queryParams = new URLSearchParams(filters);
    const queryString = queryParams.toString();
    const endpoint = `/api/orders${queryString ? `?${queryString}` : ''}`;
    
    return await this.apiCall(endpoint);
  }

  async getOrder(orderId) {
    return await this.apiCall(`/api/orders/${orderId}`);
  }

  async cancelOrder(orderId, reason) {
    return await this.apiCall(`/api/orders/${orderId}/cancel`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    });
  }

  // Admin order methods
  async getAllOrders(filters = {}) {
    const queryParams = new URLSearchParams(filters);
    const queryString = queryParams.toString();
    const endpoint = `/api/orders/admin/all${queryString ? `?${queryString}` : ''}`;
    
    return await this.apiCall(endpoint);
  }

  async updateOrderStatus(orderId, statusData) {
    return await this.apiCall(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    });
  }

  async getDashboardStats() {
    return await this.apiCall('/api/orders/admin/dashboard');
  }

  // ==================== UTILITY METHODS ====================

  isLoggedIn() {
    return !!this.token;
  }

  async checkConnection() {
    try {
      const response = await fetch(this.baseURL);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
const apiService = new ApiService();
export default apiService;