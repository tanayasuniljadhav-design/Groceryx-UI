import React from "react";
import "./HeroBanner.css";

function HeroBanner() {
  return (
    <section className="gx-hero">

      <div className="gx-hero-content">

        <span className="gx-hero-tag">
          🛒 GROCERYX ONLINE
        </span>

        <h1>
          Fresh Groceries
          <br />
          <span>At Your Doorstep</span>
        </h1>

        <p>
          Fruits, vegetables, dairy, bakery, snacks
          and daily essentials at amazing prices.
        </p>

        <div className="gx-hero-points">

          <div>
            <strong>⚡ Fast</strong>
            <small>Quick Delivery</small>
          </div>

          <div>
            <strong>🌱 Fresh</strong>
            <small>Quality Products</small>
          </div>

          <div>
            <strong>💰 Save</strong>
            <small>Best Prices</small>
          </div>

        </div>

        <button
          className="gx-hero-btn"
          onClick={() =>
            document
              .getElementById("gx-products")
              ?.scrollIntoView({
                behavior: "smooth"
              })
          }
        >
          Shop Groceries →
        </button>

      </div>

      <div className="gx-hero-visual">

        <div className="gx-hero-main-icon">
          🛒
        </div>

        <div className="gx-floating gx-fruit">
          🍎
        </div>

        <div className="gx-floating gx-milk">
          🥛
        </div>

        <div className="gx-floating gx-bread">
          🍞
        </div>

      </div>

    </section>
  );
}

export default HeroBanner;