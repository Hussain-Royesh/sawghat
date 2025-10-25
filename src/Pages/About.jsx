import React from 'react';
import './CSS/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Sawghat</h1>
        <p>Your trusted online shopping destination</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2024, Sawghat has grown from a small startup to one of the leading 
            online fashion retailers. We believe that everyone deserves access to quality, 
            stylish clothing at affordable prices.
          </p>
          <p>
            Our mission is to provide an exceptional shopping experience with a carefully 
            curated selection of products for men, women, and children. We work directly 
            with manufacturers to ensure the best quality at competitive prices.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🛍️</div>
              <h3>Wide Selection</h3>
              <p>Thousands of products across multiple categories</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Quality Guaranteed</h3>
              <p>All products meet our strict quality standards</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Shipping</h3>
              <p>Quick and reliable delivery to your doorstep</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payments</h3>
              <p>Your transactions are safe and encrypted</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💯</div>
              <h3>Customer Satisfaction</h3>
              <p>30-day return policy for your peace of mind</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Our team is always here to help you</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-list">
            <div className="value-item">
              <h3>Quality First</h3>
              <p>We never compromise on the quality of our products.</p>
            </div>
            <div className="value-item">
              <h3>Customer Focus</h3>
              <p>Your satisfaction is our top priority.</p>
            </div>
            <div className="value-item">
              <h3>Sustainability</h3>
              <p>We're committed to eco-friendly practices.</p>
            </div>
            <div className="value-item">
              <h3>Innovation</h3>
              <p>Constantly improving our service and selection.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
