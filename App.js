import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import CategoryMenu from "./components/CategoryMenu";
import HeroBanner from "./components/HeroBanner";
import ProductSection from "./components/ProductSection";
import RecommendationSection from "./components/RecommendationSection";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import CustomerDashboard from "./components/CustomerDashboard";

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLoginSuccess = (role) => {
    setLoginOpen(false);
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (userRole === "admin") {
    return (
      <AdminDashboard
        onLogout={handleLogout}
      />
    );
  }

  if (userRole === "customer") {
    return (
      <CustomerDashboard
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="app">

      <Navbar
        onLoginClick={() => setLoginOpen(true)}
      />

      <CategoryMenu />

      <HeroBanner />

      <ProductSection />

      <RecommendationSection />

      {loginOpen && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onCancel={() => setLoginOpen(false)}
        />
      )}

    </div>
  );
}

export default App;