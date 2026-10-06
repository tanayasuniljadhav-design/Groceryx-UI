import React from "react";
import "./ProductSection.css";

const PRODUCTS = [
  {
    id: 1,
    icon: "🥛",
    name: "Fresh Milk",
    category: "Dairy",
    quantity: "1 L",
    price: 30,
    oldPrice: 34,
    discount: "12% OFF",
    rating: "4.5"
  },
  {
    id: 2,
    icon: "🍞",
    name: "Fresh Bread",
    category: "Bakery",
    quantity: "400 g",
    price: 40,
    oldPrice: 50,
    discount: "20% OFF",
    rating: "4.4"
  },
  {
    id: 3,
    icon: "🍎",
    name: "Fresh Apples",
    category: "Fruits",
    quantity: "1 kg",
    price: 120,
    oldPrice: 150,
    discount: "20% OFF",
    rating: "4.5"
  },
  {
    id: 4,
    icon: "🍚",
    name: "Premium Rice",
    category: "Staples",
    quantity: "5 kg",
    price: 420,
    oldPrice: 500,
    discount: "16% OFF",
    rating: "4.6"
  },
  {
    id: 5,
    icon: "🥬",
    name: "Fresh Spinach",
    category: "Vegetables",
    quantity: "500 g",
    price: 30,
    oldPrice: 40,
    discount: "25% OFF",
    rating: "4.5"
  },
  {
    id: 6,
    icon: "🫘",
    name: "Toor Dal",
    category: "Pulses",
    quantity: "1 kg",
    price: 110,
    oldPrice: 130,
    discount: "15% OFF",
    rating: "4.6"
  },
  {
    id: 7,
    icon: "🍪",
    name: "Biscuits",
    category: "Snacks",
    quantity: "300 g",
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
    quantity: "1 L",
    price: 85,
    oldPrice: 100,
    discount: "15% OFF",
    rating: "4.5"
  },
  {
    id: 9,
    icon: "🧴",
    name: "Face Wash",
    category: "Personal Care",
    quantity: "100 ml",
    price: 150,
    oldPrice: 190,
    discount: "21% OFF",
    rating: "4.5"
  },
  {
    id: 10,
    icon: "🍌",
    name: "Fresh Bananas",
    category: "Fruits",
    quantity: "1 Dozen",
    price: 50,
    oldPrice: 65,
    discount: "23% OFF",
    rating: "4.4"
  }
];

function ProductSection() {
  return (
    <section
      className="gx-product-section"
      id="gx-products"
    >

      <div className="gx-products-heading">

        <div>
          <span>
            GROCERYX COLLECTION
          </span>

          <h2>
            🛍️ Popular Products
          </h2>

          <p>
            Fresh groceries and daily essentials
            at affordable prices.
          </p>
        </div>

        <div className="gx-product-count">
          <strong>50+</strong>
          <small>Products</small>
        </div>

      </div>


      <div className="gx-product-grid">

        {PRODUCTS.map(product => (
          <div
            className="gx-product-card"
            key={product.id}
          >

            <div className="gx-product-top">

              <span className="gx-discount">
                {product.discount}
              </span>

              <span className="gx-product-icon">
                {product.icon}
              </span>

              <div className="gx-product-meta">
                <span>
                  {product.category}
                </span>

                <span>
                  {product.quantity}
                </span>
              </div>

            </div>


            <div className="gx-product-body">

              <div className="gx-title-row">

                <h3>
                  {product.name}
                </h3>

                <span>
                  ⭐ {product.rating}
                </span>

              </div>

              <p>
                Quality {product.name.toLowerCase()}
                for your everyday needs.
              </p>

              <div className="gx-price">

                <strong>
                  ₹{product.price}
                </strong>

                <del>
                  ₹{product.oldPrice}
                </del>

                <em>
                  {product.discount}
                </em>

              </div>

              <div className="gx-benefit">
                ✓ Quality checked
              </div>

              <div className="gx-benefit">
                🚚 Free delivery
              </div>

              <button>
                View Product →
              </button>

            </div>

          </div>
        ))}

      </div>


      <div className="gx-products-footer">

        <div>
          <strong>
            🛒 Everything You Need in One Place
          </strong>

          <span>
            Fresh products • Great prices • Easy shopping
          </span>
        </div>

        <b>
          SHOP SMART
        </b>

      </div>

    </section>
  );
}

export default ProductSection;