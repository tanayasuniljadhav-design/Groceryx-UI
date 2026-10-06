import React, { useEffect, useMemo, useState } from "react";
import "./CustomerDashboard.css";
import {
  createOrder,
  getOrders,
  getRecentlyViewed,
  addRecentlyViewed
} from "../utils/store";

const PRODUCTS = [
  { id: 1, icon: "🥛", name: "Fresh Milk", category: "Dairy", quantity: "1 L", price: 30, oldPrice: 34, rating: 4.5 },
  { id: 2, icon: "🍞", name: "Fresh Bread", category: "Bakery", quantity: "400 g", price: 40, oldPrice: 50, rating: 4.4 },
  { id: 3, icon: "🧈", name: "Butter", category: "Dairy", quantity: "500 g", price: 245, oldPrice: 280, rating: 4.6 },
  { id: 4, icon: "🧀", name: "Cheese", category: "Dairy", quantity: "200 g", price: 110, oldPrice: 130, rating: 4.5 },
  { id: 5, icon: "🥣", name: "Curd", category: "Dairy", quantity: "500 g", price: 35, oldPrice: 42, rating: 4.5 },
  { id: 6, icon: "🍵", name: "Tea", category: "Beverages", quantity: "250 g", price: 125, oldPrice: 150, rating: 4.6 },
  { id: 7, icon: "🍎", name: "Fresh Apples", category: "Fruits", quantity: "1 kg", price: 120, oldPrice: 150, rating: 4.5 },
  { id: 8, icon: "🍇", name: "Fresh Grapes", category: "Fruits", quantity: "500 g", price: 75, oldPrice: 95, rating: 4.6 },
  { id: 9, icon: "🍊", name: "Fresh Oranges", category: "Fruits", quantity: "1 kg", price: 80, oldPrice: 100, rating: 4.5 },
  { id: 10, icon: "🍌", name: "Fresh Bananas", category: "Fruits", quantity: "1 Dozen", price: 50, oldPrice: 65, rating: 4.4 },
  { id: 11, icon: "🥭", name: "Mango Juice", category: "Beverages", quantity: "1 L", price: 85, oldPrice: 100, rating: 4.5 },
  { id: 12, icon: "🥬", name: "Fresh Spinach", category: "Vegetables", quantity: "500 g", price: 30, oldPrice: 40, rating: 4.5 },
  { id: 13, icon: "🫑", name: "Fresh Capsicum", category: "Vegetables", quantity: "500 g", price: 45, oldPrice: 60, rating: 4.4 },
  { id: 14, icon: "🥕", name: "Fresh Carrot", category: "Vegetables", quantity: "1 kg", price: 55, oldPrice: 70, rating: 4.5 },
  { id: 15, icon: "🍅", name: "Fresh Tomato", category: "Vegetables", quantity: "1 kg", price: 40, oldPrice: 50, rating: 4.6 },
  { id: 16, icon: "🍚", name: "Premium Rice", category: "Staples", quantity: "5 kg", price: 420, oldPrice: 500, rating: 4.6 },
  { id: 17, icon: "🛢️", name: "Cooking Oil", category: "Staples", quantity: "1 L", price: 145, oldPrice: 170, rating: 4.5 },
  { id: 18, icon: "🍬", name: "Sugar", category: "Staples", quantity: "1 kg", price: 45, oldPrice: 52, rating: 4.5 },
  { id: 19, icon: "🫘", name: "Toor Dal", category: "Pulses", quantity: "1 kg", price: 110, oldPrice: 130, rating: 4.6 },
  { id: 20, icon: "🫘", name: "Moong Dal", category: "Pulses", quantity: "1 kg", price: 120, oldPrice: 145, rating: 4.5 },
  { id: 21, icon: "🫘", name: "Chana Dal", category: "Pulses", quantity: "1 kg", price: 85, oldPrice: 105, rating: 4.4 },
  { id: 22, icon: "🍔", name: "Burger Buns", category: "Bakery", quantity: "6 pcs", price: 55, oldPrice: 70, rating: 4.3 },
  { id: 23, icon: "🍓", name: "Fruit Jam", category: "Bakery", quantity: "500 g", price: 95, oldPrice: 120, rating: 4.5 },
  { id: 24, icon: "🍪", name: "Biscuits", category: "Snacks", quantity: "300 g", price: 35, oldPrice: 45, rating: 4.4 },
  { id: 25, icon: "🥨", name: "Namkeen", category: "Snacks", quantity: "250 g", price: 60, oldPrice: 75, rating: 4.4 },
  { id: 26, icon: "🥔", name: "Potato Chips", category: "Snacks", quantity: "150 g", price: 45, oldPrice: 55, rating: 4.5 },
  { id: 27, icon: "🍵", name: "Green Tea", category: "Beverages", quantity: "25 Bags", price: 150, oldPrice: 180, rating: 4.6 },
  { id: 28, icon: "☕", name: "Cold Coffee", category: "Beverages", quantity: "500 ml", price: 70, oldPrice: 90, rating: 4.4 },
  { id: 29, icon: "🧴", name: "Shampoo", category: "Personal Care", quantity: "650 ml", price: 285, oldPrice: 330, rating: 4.5 },
  { id: 30, icon: "🧼", name: "Hand Wash", category: "Personal Care", quantity: "250 ml", price: 95, oldPrice: 120, rating: 4.5 }
];

const CUSTOMER_RECOMMENDATIONS = {
  "rahul@groceryx.com": {
    name: "Rahul",
    bought: "Milk",
    icon: "🥛",
    products: [2, 3, 4, 5, 6]
  },
  "priya@groceryx.com": {
    name: "Priya",
    bought: "Apples",
    icon: "🍎",
    products: [8, 9, 10, 11, 7]
  },
  "amit@groceryx.com": {
    name: "Amit",
    bought: "Rice",
    icon: "🍚",
    products: [19, 20, 21, 17, 18]
  }
};

const categories = [
  ["🍎", "Fruits"],
  ["🥬", "Vegetables"],
  ["🍚", "Staples"],
  ["🫘", "Pulses"],
  ["🥛", "Dairy"],
  ["🍞", "Bakery"],
  ["🍪", "Snacks"],
  ["🧃", "Beverages"],
  ["🧴", "Personal Care"]
];

function CustomerDashboard({ onLogout }) {
  const [customer, setCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("home");
  const [orders, setOrders] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const savedCustomer = localStorage.getItem(
      "groceryxCurrentCustomer"
    );

    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }

    setOrders(getOrders());
    setRecentlyViewed(getRecentlyViewed());

    const savedNotifications =
      JSON.parse(
        localStorage.getItem("groceryxNotifications") || "[]"
      );

    setNotifications(savedNotifications);
  }, []);

  useEffect(() => {
    const refresh = () => {
      setOrders(getOrders());
      setRecentlyViewed(getRecentlyViewed());

      setNotifications(
        JSON.parse(
          localStorage.getItem("groceryxNotifications") || "[]"
        )
      );
    };

    window.addEventListener(
      "groceryx-orders-updated",
      refresh
    );

    window.addEventListener(
      "groceryx-viewed-updated",
      refresh
    );

    return () => {
      window.removeEventListener(
        "groceryx-orders-updated",
        refresh
      );

      window.removeEventListener(
        "groceryx-viewed-updated",
        refresh
      );
    };
  }, []);

  const profile =
    customer &&
    CUSTOMER_RECOMMENDATIONS[customer.email]
      ? CUSTOMER_RECOMMENDATIONS[customer.email]
      : CUSTOMER_RECOMMENDATIONS[
          "rahul@groceryx.com"
        ];

  const personalizedProducts = useMemo(() => {
    if (!profile) return [];

    return profile.products
      .map((id) =>
        PRODUCTS.find((product) => product.id === id)
      )
      .filter(Boolean);
  }, [profile]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const searchMatch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        category === "All" ||
        product.category === category;

      return searchMatch && categoryMatch;
    });
  }, [search, category]);

  const addToCart = (product) => {
    addRecentlyViewed(product);
    setRecentlyViewed(getRecentlyViewed());

    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1
        }
      ];
    });

    setToast(`${product.name} added to cart`);

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const updateQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + amount
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    if (!cart.length || !customer) return;

    createOrder(customer, cart);

    setOrders(getOrders());
    setCart([]);
    setShowCart(false);

    const newNotification = {
      id: Date.now(),
      title: "Order Placed",
      message: "Your GroceryX order has been placed successfully.",
      time: new Date().toISOString(),
      read: false
    };

    const updatedNotifications = [
      newNotification,
      ...notifications
    ].slice(0, 10);

    setNotifications(updatedNotifications);

    localStorage.setItem(
      "groceryxNotifications",
      JSON.stringify(updatedNotifications)
    );

    setToast("Order placed successfully");

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const markNotificationsRead = () => {
    const updated = notifications.map(
      (item) => ({
        ...item,
        read: true
      })
    );

    setNotifications(updated);

    localStorage.setItem(
      "groceryxNotifications",
      JSON.stringify(updated)
    );
  };

  const logout = () => {
    localStorage.removeItem(
      "groceryxCurrentCustomer"
    );

    localStorage.removeItem(
      "groceryxUserRole"
    );

    onLogout();
  };

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  return (
    <div className="customer-dashboard">

      <header className="customer-navbar">

        <div className="customer-logo">
          🛒 <span>GroceryX</span>
        </div>

        <div className="customer-search">
          🔍
          <input
            value={search}
            placeholder="Search groceries..."
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="customer-actions">

          <button
            className="customer-action-btn"
            onClick={() => setView("orders")}
          >
            📦
            <span>Orders</span>
          </button>

          <div className="notification-wrapper">

            <button
              className="customer-action-btn notification-btn"
              onClick={() => {
                setShowNotifications(
                  !showNotifications
                );

                if (!showNotifications) {
                  markNotificationsRead();
                }
              }}
            >
              🔔

              {unreadCount > 0 && (
                <b>{unreadCount}</b>
              )}
            </button>

            {showNotifications && (
              <div className="notification-panel">

                <div className="notification-header">
                  <strong>Notifications</strong>
                  <span>
                    {notifications.length}
                  </span>
                </div>

                {notifications.length === 0 ? (
                  <div className="empty-notification">
                    No new notifications
                  </div>
                ) : (
                  notifications.map(
                    (notification) => (
                      <div
                        className="notification-item"
                        key={notification.id}
                      >
                        <div className="notification-icon">
                          🔔
                        </div>

                        <div>
                          <strong>
                            {notification.title}
                          </strong>

                          <p>
                            {notification.message}
                          </p>

                          <small>
                            {new Date(
                              notification.time
                            ).toLocaleString()}
                          </small>
                        </div>
                      </div>
                    )
                  )
                )}

              </div>
            )}

          </div>

          <button
            className="cart-top-button"
            onClick={() => setShowCart(true)}
          >
            🛒
            <span>{cart.length}</span>
          </button>

          <button
            className="customer-name-button"
            onClick={() => setView("profile")}
          >
            👤 {customer?.name || "Customer"}
          </button>

          <button
            className="customer-logout"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </header>

      <div className="customer-category-bar">

        <button
          className={category === "All" ? "active" : ""}
          onClick={() => setCategory("All")}
        >
          🏠 All
        </button>

        {categories.map(([icon, name]) => (
          <button
            key={name}
            className={
              category === name ? "active" : ""
            }
            onClick={() => setCategory(name)}
          >
            {icon} {name}
          </button>
        ))}

      </div>

      {view === "home" && (
        <>

          <section className="customer-hero">

            <div>
              <span className="hero-small">
                GROCERYX SPECIAL
              </span>

              <h1>
                Fresh Groceries
                <br />
                <span>Delivered Fast 🛒</span>
              </h1>

              <p>
                Best prices, fresh products and
                personalized recommendations.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById(
                      "all-products"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth"
                    })
                }
              >
                Shop Now →
              </button>
            </div>

            <div className="hero-grocery-icons">
              🥦
              <span>🍎</span>
              <span>🥛</span>
              <span>🍞</span>
            </div>

          </section>

          <section className="personalized-section">

            <div className="personalized-heading">

              <div>
                <span className="personalized-badge">
                  PERSONALIZED FOR YOU
                </span>

                <h2>
                  {profile.icon} Because You Bought{" "}
                  {profile.bought}
                </h2>

                <p>
                  Products you may like based on
                  your previous purchase.
                </p>
              </div>

              <span className="personalized-ai">
                ✨ Smart Recommendations
              </span>

            </div>

            <div className="personalized-grid">

              {personalizedProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={addToCart}
                  />
                )
              )}

            </div>

          </section>

          <section className="offer-strip">
            <div>⚡</div>
            <strong>Special Grocery Deals</strong>
            <span>Save more on your daily essentials</span>
            <b>Up to 40% OFF</b>
          </section>

          <section className="dashboard-section">

            <div className="section-heading">
              <div>
                <span>🔥 TODAY'S COLLECTION</span>
                <h2>Best Deals</h2>
              </div>
            </div>

            <div className="product-grid">

              {PRODUCTS.slice(0, 8).map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={addToCart}
                  />
                )
              )}

            </div>

          </section>

          {recentlyViewed.length > 0 && (
            <section className="dashboard-section">

              <div className="section-heading">
                <div>
                  <span>YOUR ACTIVITY</span>
                  <h2>Recently Viewed</h2>
                </div>
              </div>

              <div className="product-grid">

                {recentlyViewed
                  .slice(0, 6)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAdd={addToCart}
                    />
                  ))}

              </div>

            </section>
          )}

          <section
            className="dashboard-section"
            id="all-products"
          >

            <div className="section-heading">

              <div>
                <span>GROCERYX STORE</span>
                <h2>All Products</h2>
              </div>

              <span>
                {filteredProducts.length} Products
              </span>

            </div>

            <div className="product-grid">

              {filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={addToCart}
                  />
                )
              )}

            </div>

          </section>

        </>
      )}

      {view === "orders" && (
        <section className="page-content">

          <div className="page-title">
            <h1>📦 My Orders</h1>
            <button
              onClick={() => setView("home")}
            >
              ← Back
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="empty-page">
              <div>📦</div>
              <h2>No Orders Yet</h2>
              <p>
                Your placed orders will appear here.
              </p>
            </div>
          ) : (
            <div className="orders-list">

              {orders
                .filter(
                  (order) =>
                    order.customerEmail ===
                    customer?.email
                )
                .map((order) => (

                  <div
                    className="order-card"
                    key={order.id}
                  >

                    <div className="order-top">
                      <strong>
                        {order.id}
                      </strong>

                      <span>
                        {order.status}
                      </span>
                    </div>

                    <div className="order-products">

                      {order.products.map(
                        (product) => (
                          <div
                            key={product.id}
                          >
                            {product.name} ×{" "}
                            {product.quantity}
                          </div>
                        )
                      )}

                    </div>

                    <div className="order-bottom">
                      <strong>
                        ₹{order.amount}
                      </strong>

                      <small>
                        {new Date(
                          order.time
                        ).toLocaleString()}
                      </small>
                    </div>

                  </div>

                ))}

            </div>
          )}

        </section>
      )}

      {view === "profile" && (
        <section className="page-content">

          <div className="page-title">
            <h1>👤 My Profile</h1>

            <button
              onClick={() => setView("home")}
            >
              ← Back
            </button>
          </div>

          <div className="profile-card">

            <div className="profile-avatar">
              {profile.icon}
            </div>

            <h2>{customer?.name}</h2>

            <p>{customer?.email}</p>

            <div className="profile-stats">

              <div>
                <strong>
                  {orders.filter(
                    (order) =>
                      order.customerEmail ===
                      customer?.email
                  ).length}
                </strong>
                <span>Orders</span>
              </div>

              <div>
                <strong>
                  {recentlyViewed.length}
                </strong>
                <span>Viewed</span>
              </div>

              <div>
                <strong>
                  {cart.length}
                </strong>
                <span>Cart Items</span>
              </div>

            </div>

          </div>

        </section>
      )}

      {showCart && (
        <div
          className="cart-overlay"
          onClick={() => setShowCart(false)}
        >

          <div
            className="cart-drawer"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="cart-header">
              <h2>🛒 My Cart</h2>

              <button
                onClick={() =>
                  setShowCart(false)
                }
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div>🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some groceries to continue.</p>
              </div>
            ) : (
              <>

                <div className="cart-items">

                  {cart.map((item) => (

                    <div
                      className="cart-item"
                      key={item.id}
                    >

                      <div className="cart-product-icon">
                        {item.icon}
                      </div>

                      <div className="cart-product-info">

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          ₹{item.price}
                        </span>

                        <div className="quantity-control">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                -1
                              )
                            }
                          >
                            −
                          </button>

                          <b>
                            {item.quantity}
                          </b>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                1
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="cart-total">

                  <span>Total</span>

                  <strong>
                    ₹{cartTotal}
                  </strong>

                </div>

                <button
                  className="place-order-button"
                  onClick={placeOrder}
                >
                  Place Order →
                </button>

              </>
            )}

          </div>

        </div>
      )}

      {toast && (
        <div className="toast">
          ✅ {toast}
        </div>
      )}

    </div>
  );
}

function ProductCard({ product, onAdd }) {
  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  return (
    <div className="product-card">

      <div className="product-image">
        <span>{product.icon}</span>
        <b>{discount}% OFF</b>
      </div>

      <div className="product-category">
        {product.category}
      </div>

      <h3>{product.name}</h3>

      <p>{product.quantity}</p>

      <div className="product-rating">
        ⭐ {product.rating}
      </div>

      <div className="product-price">
        <strong>₹{product.price}</strong>
        <del>₹{product.oldPrice}</del>
      </div>

      <div className="delivery">
        🚚 Free Delivery
      </div>

      <button
        className="add-cart-button"
        onClick={() => onAdd(product)}
      >
        🛒 Add to Cart
      </button>

    </div>
  );
}

export default CustomerDashboard;