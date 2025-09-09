import React, { useState } from "react";
import "./Description.css";

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState("description");

  // Example reviews (this could come from API)
  const reviews = [
    {
      user: "Alice",
      rating: 5,
      text: "Absolutely love this product! Great quality and fits perfectly.",
    },
    {
      user: "John",
      rating: 4,
      text: "Good product overall, but shipping took a bit longer than expected.",
    },
    {
      user: "Sophia",
      rating: 5,
      text: "Exceeded my expectations. Will definitely buy again!",
    },
  ];

  // Helper function to render stars
  const renderStars = (count) => "⭐".repeat(count) + "☆".repeat(5 - count);

  return (
    <div className="DescriptionBox">
      {/* Tabs */}
      <div className="description-navigator">
        <div
          className={`description-nav-box ${
            activeTab === "description" ? "active" : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </div>
        <div
          className={`description-nav-box ${
            activeTab === "reviews" ? "active" : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({reviews.length})
        </div>
      </div>

      {/* Content */}
      <div className="description-content">
        {activeTab === "description" && (
          <p>
            This is a detailed description of the product. You can explain the
            material, fit, care instructions, and any unique selling points that
            make this product stand out.
          </p>
        )}

        {activeTab === "reviews" && (
          <div className="review-list">
            {reviews.map((review, index) => (
              <div className="review" key={index}>
                <div className="review-header">
                  <span className="review-user">{review.user}</span>
                  <span className="review-stars">
                    {renderStars(review.rating)}
                  </span>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
