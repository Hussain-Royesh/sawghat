// API Test Component
import React, { useState } from 'react';

const ApiTest = () => {
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    setResults('Testing API connection...\n');

    try {
      // Test 1: Basic connection
      const response = await fetch('http://localhost:4001/');
      const text = await response.text();
      setResults(prev => prev + `✅ Backend connection: OK\n`);

      // Test 2: Products API
      const productsResponse = await fetch('http://localhost:4001/api/products');
      const productsData = await productsResponse.json();
      setResults(prev => prev + `✅ Products API: ${productsData.success ? 'Success' : 'Failed'}\n`);
      setResults(prev => prev + `📦 Total products: ${productsData.products?.length || 0}\n`);

      // Test 3: Women's products
      const womenResponse = await fetch('http://localhost:4001/api/products?category=women&limit=4');
      const womenData = await womenResponse.json();
      setResults(prev => prev + `👩 Women products: ${womenData.products?.length || 0}\n`);

      // Test 4: Men's products  
      const menResponse = await fetch('http://localhost:4001/api/products?category=men&limit=4');
      const menData = await menResponse.json();
      setResults(prev => prev + `👨 Men products: ${menData.products?.length || 0}\n`);

      // Test 5: Kids products
      const kidsResponse = await fetch('http://localhost:4001/api/products?category=kids&limit=4');
      const kidsData = await kidsResponse.json();
      setResults(prev => prev + `🧒 Kids products: ${kidsData.products?.length || 0}\n`);

      // Test 6: Sample products with details
      if (productsData.products && productsData.products.length > 0) {
        setResults(prev => prev + `\n📋 Sample products:\n`);
        productsData.products.slice(0, 2).forEach((product, index) => {
          setResults(prev => prev + `   ${index + 1}. ${product.name}\n`);
          setResults(prev => prev + `      Category: ${product.category}\n`);
          setResults(prev => prev + `      Price: $${product.price}\n`);
          setResults(prev => prev + `      Images: ${product.images?.length || 0}\n\n`);
        });
      }

    } catch (error) {
      setResults(prev => prev + `❌ Error: ${error.message}\n`);
      console.error('API Test Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: 10, 
      right: 10, 
      background: 'white', 
      border: '2px solid #000', 
      padding: '10px',
      zIndex: 9999,
      width: '300px',
      maxHeight: '400px',
      overflow: 'auto'
    }}>
      <h3>API Tester</h3>
      <button onClick={testApiConnection} disabled={loading}>
        {loading ? 'Testing...' : 'Test API'}
      </button>
      <pre style={{ fontSize: '12px', margin: '10px 0' }}>
        {results}
      </pre>
    </div>
  );
};

export default ApiTest;