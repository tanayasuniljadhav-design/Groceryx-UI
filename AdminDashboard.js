import React, { useMemo, useState } from "react";
import "./AdminDashboard.css";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Fresh Milk",
    category: "Dairy",
    price: 30,
    stock: 85,
    sold: 124,
    rating: 4.5,
    icon: "🥛"
  },
  {
    id: 2,
    name: "Fresh Bread",
    category: "Bakery",
    price: 40,
    stock: 42,
    sold: 98,
    rating: 4.4,
    icon: "🍞"
  },
  {
    id: 3,
    name: "Fresh Apples",
    category: "Fruits",
    price: 120,
    stock: 18,
    sold: 87,
    rating: 4.6,
    icon: "🍎"
  },
  {
    id: 4,
    name: "Fresh Bananas",
    category: "Fruits",
    price: 50,
    stock: 65,
    sold: 112,
    rating: 4.5,
    icon: "🍌"
  },
  {
    id: 5,
    name: "Fresh Oranges",
    category: "Fruits",
    price: 90,
    stock: 31,
    sold: 76,
    rating: 4.4,
    icon: "🍊"
  },
  {
    id: 6,
    name: "Fresh Grapes",
    category: "Fruits",
    price: 110,
    stock: 24,
    sold: 63,
    rating: 4.5,
    icon: "🍇"
  },
  {
    id: 7,
    name: "Fresh Spinach",
    category: "Vegetables",
    price: 30,
    stock: 16,
    sold: 71,
    rating: 4.5,
    icon: "🥬"
  },
  {
    id: 8,
    name: "Fresh Capsicum",
    category: "Vegetables",
    price: 55,
    stock: 28,
    sold: 54,
    rating: 4.3,
    icon: "🫑"
  },
  {
    id: 9,
    name: "Premium Rice",
    category: "Staples",
    price: 420,
    stock: 36,
    sold: 92,
    rating: 4.6,
    icon: "🍚"
  },
  {
    id: 10,
    name: "Sugar",
    category: "Staples",
    price: 48,
    stock: 58,
    sold: 83,
    rating: 4.4,
    icon: "🍬"
  },
  {
    id: 11,
    name: "Toor Dal",
    category: "Pulses",
    price: 110,
    stock: 22,
    sold: 79,
    rating: 4.6,
    icon: "🫘"
  },
  {
    id: 12,
    name: "Moong Dal",
    category: "Pulses",
    price: 125,
    stock: 39,
    sold: 68,
    rating: 4.5,
    icon: "🫘"
  },
  {
    id: 13,
    name: "Butter",
    category: "Dairy",
    price: 58,
    stock: 47,
    sold: 91,
    rating: 4.7,
    icon: "🧈"
  },
  {
    id: 14,
    name: "Cheese",
    category: "Dairy",
    price: 105,
    stock: 19,
    sold: 73,
    rating: 4.6,
    icon: "🧀"
  },
  {
    id: 15,
    name: "Burger Buns",
    category: "Bakery",
    price: 45,
    stock: 33,
    sold: 59,
    rating: 4.3,
    icon: "🍔"
  },
  {
    id: 16,
    name: "Biscuits",
    category: "Snacks",
    price: 35,
    stock: 76,
    sold: 142,
    rating: 4.4,
    icon: "🍪"
  },
  {
    id: 17,
    name: "Potato Chips",
    category: "Snacks",
    price: 30,
    stock: 12,
    sold: 126,
    rating: 4.5,
    icon: "🥔"
  },
  {
    id: 18,
    name: "Mango Juice",
    category: "Beverages",
    price: 85,
    stock: 44,
    sold: 88,
    rating: 4.5,
    icon: "🧃"
  },
  {
    id: 19,
    name: "Green Tea",
    category: "Beverages",
    price: 150,
    stock: 27,
    sold: 61,
    rating: 4.4,
    icon: "🍵"
  },
  {
    id: 20,
    name: "Shampoo",
    category: "Personal Care",
    price: 180,
    stock: 21,
    sold: 56,
    rating: 4.3,
    icon: "🧴"
  },
  {
    id: 21,
    name: "Hand Wash",
    category: "Personal Care",
    price: 95,
    stock: 49,
    sold: 64,
    rating: 4.5,
    icon: "🧼"
  }
];

function AdminDashboard({ onLogout }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activePage, setActivePage] = useState("Dashboard");
  const [message, setMessage] = useState("");

  const categories = [
    "All",
    "Fruits",
    "Vegetables",
    "Staples",
    "Pulses",
    "Dairy",
    "Bakery",
    "Snacks",
    "Beverages",
    "Personal Care"
  ];

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  const totalSold = products.reduce(
    (sum, product) => sum + product.sold,
    0
  );

  const lowStock = products.filter(
    product => product.stock <= 20
  ).length;

  const estimatedSales = products.reduce(
    (sum, product) => sum + product.price * product.sold,
    0
  );

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const updateStock = (id, amount) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? {
              ...product,
              stock: Math.max(0, product.stock + amount)
            }
          : product
      )
    );

    setMessage(
      amount > 0
        ? "Stock increased successfully"
        : "Stock reduced successfully"
    );

    setTimeout(() => setMessage(""), 1800);
  };

  return (
    <div className="admin-dashboard">

      {/* TOP NAVBAR */}
      <header className="admin-navbar">

        <div className="admin-brand">
          <div className="admin-logo">🛒</div>

          <div>
            <h2>GroceryX</h2>
            <span>ADMIN CONTROL CENTER</span>
          </div>
        </div>

        <div className="admin-top-info">
          <div className="admin-live">
            <span></span>
            System Online
          </div>

          <div className="admin-user">
            👨‍💼 Admin
          </div>

          <button
            className="admin-logout"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>

      </header>

      <div className="admin-layout">

        {/* SIDEBAR */}
        <aside className="admin-sidebar">

          <div className="sidebar-title">
            MANAGEMENT
          </div>

          <button
            className={activePage === "Dashboard" ? "active" : ""}
            onClick={() => setActivePage("Dashboard")}
          >
            📊 Dashboard
          </button>

          <button
            className={activePage === "Products" ? "active" : ""}
            onClick={() => setActivePage("Products")}
          >
            📦 Products
          </button>

          <button
            className={activePage === "Stock" ? "active" : ""}
            onClick={() => setActivePage("Stock")}
          >
            🏷️ Stock Management
          </button>

          <button
            className={activePage === "Orders" ? "active" : ""}
            onClick={() => setActivePage("Orders")}
          >
            🧾 Orders
          </button>

          <button
            className={activePage === "Customers" ? "active" : ""}
            onClick={() => setActivePage("Customers")}
          >
            👥 Customers
          </button>

          <button
            className={activePage === "Reports" ? "active" : ""}
            onClick={() => setActivePage("Reports")}
          >
            📈 Reports
          </button>

          <div className="sidebar-bottom">

            <div className="admin-security">
              <span>🔐</span>
              <div>
                <strong>Secure Mode</strong>
                <small>Admin session active</small>
              </div>
            </div>

          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="admin-main">

          {/* PAGE HEADER */}
          <div className="admin-page-header">

            <div>
              <span>GROCERYX ADMIN</span>

              <h1>
                {activePage}
              </h1>

              <p>
                Manage products, stock, orders and grocery operations.
              </p>
            </div>

            <div className="admin-date">
              <strong>📅 Today</strong>
              <small>Store Management</small>
            </div>

          </div>

          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="admin-message">
              ✓ {message}
            </div>
          )}

          {/* DASHBOARD OVERVIEW */}
          <section className="admin-stats">

            <div className="admin-stat-card blue">
              <div className="stat-icon">📦</div>

              <div>
                <span>Total Products</span>
                <strong>{totalProducts}</strong>
                <small>Active products</small>
              </div>
            </div>

            <div className="admin-stat-card green">
              <div className="stat-icon">🏷️</div>

              <div>
                <span>Total Stock</span>
                <strong>{totalStock}</strong>
                <small>Units available</small>
              </div>
            </div>

            <div className="admin-stat-card purple">
              <div className="stat-icon">🛍️</div>

              <div>
                <span>Total Sold</span>
                <strong>{totalSold}</strong>
                <small>Units sold</small>
              </div>
            </div>

            <div className="admin-stat-card orange">
              <div className="stat-icon">⚠️</div>

              <div>
                <span>Low Stock</span>
                <strong>{lowStock}</strong>
                <small>Need attention</small>
              </div>
            </div>

            <div className="admin-stat-card pink">
              <div className="stat-icon">💰</div>

              <div>
                <span>Sales Value</span>
                <strong>₹{estimatedSales.toLocaleString()}</strong>
                <small>Estimated sales</small>
              </div>
            </div>

          </section>

          {/* QUICK INFORMATION */}
          <section className="admin-info-grid">

            <div className="admin-info-card">

              <div className="info-card-header">
                <div>
                  <span>INVENTORY STATUS</span>
                  <h3>Stock Overview</h3>
                </div>

                <b>{totalStock} Units</b>
              </div>

              <div className="stock-progress">

                <div className="progress-label">
                  <span>Healthy Stock</span>
                  <strong>
                    {totalStock - products.filter(p => p.stock <= 20).reduce((s, p) => s + p.stock, 0)}
                  </strong>
                </div>

                <div className="progress-bar">
                  <div
                    style={{
                      width: `${Math.min(
                        100,
                        ((totalStock -
                          products.filter(p => p.stock <= 20).reduce(
                            (s, p) => s + p.stock,
                            0
                          )) /
                          totalStock) *
                          100
                      )}%`
                    }}
                  />
                </div>

                <p>
                  Most products currently have sufficient inventory.
                </p>

              </div>

            </div>

            <div className="admin-info-card">

              <div className="info-card-header">
                <div>
                  <span>ATTENTION REQUIRED</span>
                  <h3>Low Stock Products</h3>
                </div>

                <b className="warning-number">
                  {lowStock}
                </b>
              </div>

              <div className="low-stock-list">

                {products
                  .filter(product => product.stock <= 20)
                  .slice(0, 4)
                  .map(product => (
                    <div
                      className="low-stock-item"
                      key={product.id}
                    >
                      <span className="mini-product">
                        {product.icon}
                      </span>

                      <div>
                        <strong>{product.name}</strong>
                        <small>{product.category}</small>
                      </div>

                      <b>{product.stock} left</b>
                    </div>
                  ))}

              </div>

            </div>

            <div className="admin-info-card">

              <div className="info-card-header">
                <div>
                  <span>BEST SELLERS</span>
                  <h3>Top Products</h3>
                </div>

                <b>🔥</b>
              </div>

              <div className="top-selling-list">

                {[...products]
                  .sort((a, b) => b.sold - a.sold)
                  .slice(0, 4)
                  .map((product, index) => (
                    <div
                      className="top-selling-item"
                      key={product.id}
                    >
                      <span className="rank">
                        #{index + 1}
                      </span>

                      <span className="mini-product">
                        {product.icon}
                      </span>

                      <div>
                        <strong>{product.name}</strong>
                        <small>{product.category}</small>
                      </div>

                      <b>{product.sold} sold</b>
                    </div>
                  ))}

              </div>

            </div>

          </section>

          {/* PRODUCT / STOCK MANAGEMENT */}
          <section className="admin-products-panel">

            <div className="products-panel-header">

              <div>
                <span>PRODUCT INVENTORY</span>
                <h2>📦 Product Stock Management</h2>
                <p>
                  Complete product information and live stock controls.
                </p>
              </div>

              <div className="inventory-total">
                <strong>{filteredProducts.length}</strong>
                <span>Showing</span>
              </div>

            </div>

            {/* SEARCH + FILTER */}
            <div className="admin-filters">

              <div className="admin-search">
                🔍
                <input
                  type="text"
                  placeholder="Search product..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <div className="category-filter">

                {categories.map(item => (
                  <button
                    key={item}
                    className={
                      category === item ? "selected" : ""
                    }
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}

              </div>

            </div>

            {/* TABLE */}
            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>SOLD</th>
                    <th>RATING</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredProducts.map(product => (

                    <tr key={product.id}>

                      <td>
                        <div className="product-name-cell">

                          <span className="table-product-icon">
                            {product.icon}
                          </span>

                          <div>
                            <strong>{product.name}</strong>
                            <small>
                              Product ID #{product.id}
                            </small>
                          </div>

                        </div>
                      </td>

                      <td>
                        <span className="category-pill">
                          {product.category}
                        </span>
                      </td>

                      <td>
                        <strong className="table-price">
                          ₹{product.price}
                        </strong>
                      </td>

                      <td>
                        <strong
                          className={
                            product.stock <= 20
                              ? "stock-danger"
                              : product.stock <= 35
                              ? "stock-warning"
                              : "stock-good"
                          }
                        >
                          {product.stock}
                        </strong>
                      </td>

                      <td>
                        <strong>
                          {product.sold}
                        </strong>
                      </td>

                      <td>
                        <span className="table-rating">
                          ⭐ {product.rating}
                        </span>
                      </td>

                      <td>

                        {product.stock === 0 ? (
                          <span className="status out">
                            OUT OF STOCK
                          </span>
                        ) : product.stock <= 20 ? (
                          <span className="status low">
                            LOW STOCK
                          </span>
                        ) : (
                          <span className="status available">
                            AVAILABLE
                          </span>
                        )}

                      </td>

                      <td>

                        <div className="stock-actions">

                          <button
                            className="minus"
                            onClick={() =>
                              updateStock(product.id, -1)
                            }
                            title="Reduce stock"
                          >
                            −
                          </button>

                          <button
                            className="plus"
                            onClick={() =>
                              updateStock(product.id, 1)
                            }
                            title="Increase stock"
                          >
                            +
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

              {filteredProducts.length === 0 && (
                <div className="no-products">
                  🔍 No products found.
                </div>
              )}

            </div>

          </section>

          {/* ORDERS / CUSTOMERS INFORMATION */}
          <section className="admin-bottom-grid">

            <div className="admin-large-card">

              <div className="large-card-header">
                <div>
                  <span>ORDER MANAGEMENT</span>
                  <h2>🧾 Recent Orders</h2>
                </div>

                <button>
                  View All
                </button>
              </div>

              <div className="order-list">

                <div className="order-row">
                  <div className="order-id">
                    <strong>GX-1001</strong>
                    <small>Today • 10:25 AM</small>
                  </div>

                  <div>
                    <strong>Rahul Sharma</strong>
                    <small>4 Products</small>
                  </div>

                  <strong>₹680</strong>

                  <span className="order-status delivered">
                    Delivered
                  </span>
                </div>

                <div className="order-row">
                  <div className="order-id">
                    <strong>GX-1002</strong>
                    <small>Today • 11:10 AM</small>
                  </div>

                  <div>
                    <strong>Priya Patil</strong>
                    <small>6 Products</small>
                  </div>

                  <strong>₹920</strong>

                  <span className="order-status processing">
                    Processing
                  </span>
                </div>

                <div className="order-row">
                  <div className="order-id">
                    <strong>GX-1003</strong>
                    <small>Today • 12:40 PM</small>
                  </div>

                  <div>
                    <strong>Amit Joshi</strong>
                    <small>3 Products</small>
                  </div>

                  <strong>₹450</strong>

                  <span className="order-status shipped">
                    Shipped
                  </span>
                </div>

                <div className="order-row">
                  <div className="order-id">
                    <strong>GX-1004</strong>
                    <small>Today • 01:15 PM</small>
                  </div>

                  <div>
                    <strong>Neha More</strong>
                    <small>5 Products</small>
                  </div>

                  <strong>₹760</strong>

                  <span className="order-status delivered">
                    Delivered
                  </span>
                </div>

              </div>

            </div>

            <div className="admin-large-card">

              <div className="large-card-header">
                <div>
                  <span>CUSTOMER INFORMATION</span>
                  <h2>👥 Customers</h2>
                </div>
              </div>

              <div className="customer-summary">

                <div className="customer-number">
                  <strong>248</strong>
                  <span>Total Customers</span>
                </div>

                <div className="customer-number">
                  <strong>37</strong>
                  <span>Active Today</span>
                </div>

                <div className="customer-number">
                  <strong>18</strong>
                  <span>New Customers</span>
                </div>

              </div>

              <div className="customer-note">
                <span>💡</span>

                <div>
                  <strong>Customer Activity</strong>
                  <p>
                    Customers can receive product recommendations
                    based on their previous views and purchases.
                  </p>
                </div>
              </div>

            </div>

          </section>

          {/* FOOTER */}
          <footer className="admin-footer">

            <div>
              <strong>🛒 GroceryX Admin</strong>
              <span>
                Grocery management dashboard
              </span>
            </div>

            <div>
              <span>Products: {totalProducts}</span>
              <span>Stock: {totalStock}</span>
              <span>Sales: ₹{estimatedSales.toLocaleString()}</span>
            </div>

          </footer>

        </main>

      </div>

    </div>
  );
}

export default AdminDashboard;