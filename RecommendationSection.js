import React from "react";
import "./RecommendationSection.css";

const RECOMMENDED_PRODUCTS = [
  {
    id: 1,
    icon: "🍎",
    name: "Fresh Apples",
    category: "Fruits",
    price: 120,
    oldPrice: 150,
    discount: "20% OFF",
    rating: "4.5"
  },
  {
    id: 2,
    icon: "🥬",
    name: "Fresh Spinach",
    category: "Vegetables",
    price: 30,
    oldPrice: 40,
    discount: "25% OFF",
    rating: "4.5"
  },
  {
    id: 3,
    icon: "🍚",
    name: "Premium Rice",
    category: "Staples",
    price: 420,
    oldPrice: 500,
    discount: "16% OFF",
    rating: "4.6"
  },
  {
    id: 4,
    icon: "🫘",
    name: "Toor Dal",
    category: "Pulses",
    price: 110,
    oldPrice: 130,
    discount: "15% OFF",
    rating: "4.6"
  },
  {
    id: 5,
    icon: "🥛",
    name: "Fresh Milk",
    category: "Dairy",
    price: 30,
    oldPrice: 34,
    discount: "12% OFF",
    rating: "4.5"
  },
  {
    id: 6,
    icon: "🍞",
    name: "Fresh Bread",
    category: "Bakery",
    price: 40,
    oldPrice: 50,
    discount: "20% OFF",
    rating: "4.4"
  },
  {
    id: 7,
    icon: "🍪",
    name: "Biscuits",
    category: "Snacks",
    price: 35,
    oldPrice: 45,
    discount: "22% OFF",
    rating: "4.4"
  },
  {
    id: 8,
    icon: "🧃",
    name: "Mango Juice",
    category: "Beverages",
    price: 85,
    oldPrice: 100,
    discount: "15% OFF",
    rating: "4.5"
  }
];

function RecommendationSection() {
  return (
    <section className="gx-recommend-section">

      <div className="gx-recommend-header">

        <div>
          <span>GROCERYX PICKS</span>

          <h2>
            ✨ Recommended Products
          </h2>

          <p>
            Popular groceries selected for everyday shopping.
          </p>
        </div>

        <div className="gx-recommend-badge">
          TOP PICKS
        </div>

      </div>

      <div className="gx-recommend-grid">

        {RECOMMENDED_PRODUCTS.map(product => (

          <div
            className="gx-recommend-card"
            key={product.id}
          >

            <div className="gx-recommend-image">

              <span className="gx-recommend-discount">
                {product.discount}
              </span>

              <span className="gx-recommend-icon">
                {product.icon}
              </span>

            </div>

            <div className="gx-recommend-body">

              <small>
                {product.category}
              </small>

              <h3>
                {product.name}
              </h3>

              <div className="gx-recommend-rating">
                ⭐ {product.rating}
              </div>

              <div className="gx-recommend-price">
                <strong>
                  ₹{product.price}
                </strong>

                <del>
                  ₹{product.oldPrice}
                </del>
              </div>

              <div className="gx-recommend-info">
                ✓ Quality checked
              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default RecommendationSection;