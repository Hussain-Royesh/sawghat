// API-connected products loader
// This replaces the static all_product.js with dynamic data from backend

import { ApiService } from '../../services/api';

class ProductLoader {
  constructor() {
    this.products = [];
    this.categories = {
      men: [],
      women: [],
      kids: []
    };
    this.featured = [];
    this.newCollections = [];
    this.loading = false;
    this.error = null;
  }

  async loadAllProducts() {
    if (this.loading) return this.products;
    
    this.loading = true;
    this.error = null;
    
    try {
      const response = await ApiService.getAllProducts();
      this.products = response.data || [];
      
      // Categorize products
      this.categories.men = this.products.filter(p => p.category === 'men');
      this.categories.women = this.products.filter(p => p.category === 'women');
      this.categories.kids = this.products.filter(p => p.category === 'kids');
      
      // Get featured and new collections
      this.featured = this.products.filter(p => p.featured);
      this.newCollections = this.products.filter(p => p.newArrival);
      
      console.log('Products loaded:', this.products.length);
      return this.products;
    } catch (error) {
      console.error('Failed to load products:', error);
      this.error = error.message;
      return [];
    } finally {
      this.loading = false;
    }
  }

  async getFeaturedProducts() {
    if (this.featured.length === 0) {
      await this.loadAllProducts();
    }
    return this.featured;
  }

  async getNewCollections() {
    if (this.newCollections.length === 0) {
      await this.loadAllProducts();
    }
    return this.newCollections;
  }

  async getProductsByCategory(category) {
    if (this.products.length === 0) {
      await this.loadAllProducts();
    }
    return this.categories[category] || [];
  }

  getProductById(id) {
    return this.products.find(p => p._id === id || p.id === id);
  }

  // Transform API product to match frontend expectations
  transformProduct(apiProduct) {
    return {
      id: apiProduct._id,
      name: apiProduct.name,
      category: apiProduct.category,
      image: apiProduct.images[0], // Use first image
      new_price: apiProduct.price,
      old_price: apiProduct.originalPrice || apiProduct.price,
      discount: apiProduct.discount || 0,
      ...apiProduct
    };
  }

  // Get all products in the old format for compatibility
  getAllProductsCompatible() {
    return this.products.map(product => this.transformProduct(product));
  }
}

// Create singleton instance
const productLoader = new ProductLoader();

// Export the loader and a default empty array for backward compatibility
export default [];
export { productLoader };