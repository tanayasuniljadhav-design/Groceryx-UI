import React, { useEffect, useState } from "react";
import "./Login.css";

const DEFAULT_CUSTOMERS = [
  {
    id: 1,
    name: "Rahul",
    email: "rahul@groceryx.com",
    password: "rahul123",
    otp: "111111",
    boughtProduct: "Milk",
    boughtIcon: "🥛"
  },
  {
    id: 2,
    name: "Priya",
    email: "priya@groceryx.com",
    password: "priya123",
    otp: "222222",
    boughtProduct: "Apples",
    boughtIcon: "🍎"
  },
  {
    id: 3,
    name: "Amit",
    email: "amit@groceryx.com",
    password: "amit123",
    otp: "333333",
    boughtProduct: "Rice",
    boughtIcon: "🍚"
  }
];

const ADMIN_ACCOUNT = {
  name: "GroceryX Admin",
  email: "admin@groceryx.com",
  password: "admin123",
  otp: "123456"
};

const CUSTOMER_KEY = "groceryxCustomers";
const IP_KEY = "groceryxAllowedIP";

function Login({ onLoginSuccess, onCancel }) {
  const [role, setRole] = useState("customer");
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);

  const [clientIP, setClientIP] = useState("");
  const [ipStatus, setIpStatus] = useState("Checking IP...");

  useEffect(() => {
    const savedCustomers =
      localStorage.getItem(CUSTOMER_KEY);

    if (!savedCustomers) {
      localStorage.setItem(
        CUSTOMER_KEY,
        JSON.stringify(DEFAULT_CUSTOMERS)
      );
    }
  }, []);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        const currentIP = data.ip;

        setClientIP(currentIP);
        setIpStatus("IP Verified");

        const savedIP =
          localStorage.getItem(IP_KEY);

        if (!savedIP) {
          localStorage.setItem(
            IP_KEY,
            currentIP
          );
        } else if (savedIP !== currentIP) {
          localStorage.setItem(
            IP_KEY,
            currentIP
          );
        }
      })
      .catch(() => {
        setClientIP("LOCAL-IP");
        setIpStatus("Local IP Mode");

        if (!localStorage.getItem(IP_KEY)) {
          localStorage.setItem(
            IP_KEY,
            "LOCAL-IP"
          );
        }
      });
  }, []);

  useEffect(() => {
    if (step !== 2 || otpTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setOtpTimer((value) => value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, otpTimer]);

  const getCustomers = () => {
    return JSON.parse(
      localStorage.getItem(CUSTOMER_KEY) ||
        JSON.stringify(DEFAULT_CUSTOMERS)
    );
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const resetFields = () => {
    setName("");
    setMobile("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    setSelectedCustomer(null);
    setStep(1);
    setOtpTimer(30);
    clearMessages();
  };

  const changeRole = (value) => {
    setRole(value);
    setMode("login");
    resetFields();
  };

  const switchMode = (value) => {
    setMode(value);
    resetFields();
  };

  const selectCustomer = (customer) => {
    setEmail(customer.email);
    setPassword(customer.password);
    setSelectedCustomer(customer);
    clearMessages();
  };

  const registerCurrentIP = () => {
    const currentIP = clientIP || "LOCAL-IP";

    const oldIP =
      localStorage.getItem(IP_KEY);

    if (!oldIP) {
      localStorage.setItem(
        IP_KEY,
        currentIP
      );
    } else if (oldIP !== currentIP) {
      localStorage.setItem(
        IP_KEY,
        currentIP
      );
    }

    return true;
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    clearMessages();

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!mobile.trim() || mobile.length !== 10) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (!email.trim()) {
      setError(
        "Please enter your email."
      );
      return;
    }

    if (!email.includes("@")) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Password and confirm password do not match."
      );
      return;
    }

    const customers = getCustomers();

    const existingUser = customers.find(
      (customer) =>
        customer.email.toLowerCase() ===
        email.trim().toLowerCase()
    );

    if (existingUser) {
      setError(
        "This email is already registered."
      );
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      otp: "444444",
      boughtProduct: "Fresh Vegetables",
      boughtIcon: "🥦"
    };

    const updatedCustomers = [
      ...customers,
      newCustomer
    ];

    localStorage.setItem(
      CUSTOMER_KEY,
      JSON.stringify(updatedCustomers)
    );

    registerCurrentIP();

    setSuccess(
      "Registration successful! You can now login."
    );

    setTimeout(() => {
      setMode("login");
      setName("");
      setMobile("");
      setPassword("");
      setConfirmPassword("");
      setSuccess("");
      setEmail(newCustomer.email);
    }, 1200);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!email.trim() || !password.trim()) {
      setError(
        "Please enter email and password."
      );
      return;
    }

    setLoading(true);

    let currentUser = null;

    if (role === "admin") {
      if (
        email.trim().toLowerCase() ===
          ADMIN_ACCOUNT.email &&
        password === ADMIN_ACCOUNT.password
      ) {
        currentUser = ADMIN_ACCOUNT;
      }
    } else {
      const customers = getCustomers();

      currentUser = customers.find(
        (customer) =>
          customer.email ===
            email.trim().toLowerCase() &&
          customer.password === password
      );
    }

    if (!currentUser) {
      setError(
        role === "admin"
          ? "Invalid admin email or password."
          : "Invalid customer email or password."
      );

      setLoading(false);
      return;
    }

    registerCurrentIP();

    setSelectedCustomer(
      role === "customer"
        ? currentUser
        : null
    );

    setStep(2);
    setOtp("");
    setOtpTimer(30);

    setSuccess(
      "Login verified. Enter your 2FA verification code."
    );

    setLoading(false);
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    clearMessages();

    if (otp.length !== 6) {
      setError(
        "Please enter a valid 6-digit OTP."
      );
      return;
    }

    const validOTP =
      role === "admin"
        ? ADMIN_ACCOUNT.otp
        : selectedCustomer?.otp;

    if (otp !== validOTP) {
      setError(
        "Invalid OTP. Please try again."
      );
      return;
    }

    registerCurrentIP();

    if (role === "admin") {
      localStorage.setItem(
        "groceryxUserRole",
        "admin"
      );

      localStorage.removeItem(
        "groceryxCurrentCustomer"
      );

      localStorage.setItem(
        "groceryxNotifications",
        JSON.stringify([
          {
            id: Date.now(),
            title: "Admin Login",
            message:
              "Admin successfully logged in.",
            time:
              new Date().toISOString(),
            read: false
          }
        ])
      );

      onLoginSuccess("admin");
      return;
    }

    const customerData = {
      id: selectedCustomer.id,
      name: selectedCustomer.name,
      email: selectedCustomer.email,
      mobile:
        selectedCustomer.mobile || "",
      boughtProduct:
        selectedCustomer.boughtProduct,
      boughtIcon:
        selectedCustomer.boughtIcon
    };

    localStorage.setItem(
      "groceryxCurrentCustomer",
      JSON.stringify(customerData)
    );

    localStorage.setItem(
      "groceryxUserRole",
      "customer"
    );

    const notifications = [
      {
        id: Date.now(),
        title: "Welcome to GroceryX",
        message:
          `Welcome ${selectedCustomer.name}!`,
        time:
          new Date().toISOString(),
        read: false
      },
      {
        id: Date.now() + 1,
        title:
          "Personalized Recommendations",
        message:
          `New products recommended because you bought ${selectedCustomer.boughtProduct}.`,
        time:
          new Date().toISOString(),
        read: false
      },
      {
        id: Date.now() + 2,
        title: "Special Offer",
        message:
          "Fresh groceries and daily essentials are available at special prices.",
        time:
          new Date().toISOString(),
        read: false
      }
    ];

    localStorage.setItem(
      "groceryxNotifications",
      JSON.stringify(notifications)
    );

    onLoginSuccess("customer");
  };

  const resendOTP = () => {
    setOtp("");
    setOtpTimer(30);
    clearMessages();

    setSuccess(
      "A new verification code has been sent."
    );
  };

  return (
    <div className="login-overlay">

      <div className="login-box">

        <button
          className="login-close"
          onClick={onCancel}
        >
          ×
        </button>

        {step === 1 && (
          <>
            <div className="login-header">

              <div className="login-logo">
                🛒
              </div>

              <h1>
                GroceryX
              </h1>

              <p>
                Fresh groceries at your fingertips
              </p>

            </div>

            <div className="role-buttons">

              <button
                className={
                  role === "customer"
                    ? "role-button active"
                    : "role-button"
                }
                onClick={() =>
                  changeRole("customer")
                }
              >
                👤 Customer
              </button>

              <button
                className={
                  role === "admin"
                    ? "role-button active"
                    : "role-button"
                }
                onClick={() =>
                  changeRole("admin")
                }
              >
                🛡️ Admin
              </button>

            </div>

            {mode === "login" && (
              <>
                <form onSubmit={handleLogin}>

                  <div className="form-group">

                    <label>
                      Email Address
                    </label>

                    <div className="input-box">

                      <span>📧</span>

                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                          setEmail(
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>

                  <div className="form-group">

                    <label>
                      Password
                    </label>

                    <div className="input-box">

                      <span>🔒</span>

                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                          setPassword(
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>

                  <button
                    className="login-button"
                    type="submit"
                    disabled={loading}
                  >
                    {loading
                      ? "Checking..."
                      : "Continue to Login →"}
                  </button>

                </form>

                {role === "customer" && (
                  <div className="demo-customers">

                    <h3>
                      Quick Customer Login
                    </h3>

                    <div className="customer-grid">

                      {getCustomers()
                        .slice(0, 3)
                        .map(
                          (customer) => (
                            <button
                              className="customer-card"
                              key={customer.id}
                              onClick={() =>
                                selectCustomer(
                                  customer
                                )
                              }
                            >

                              <span>
                                {
                                  customer.boughtIcon
                                }
                              </span>

                              <strong>
                                {
                                  customer.name
                                }
                              </strong>

                              <small>
                                {
                                  customer.boughtProduct
                                }
                              </small>

                            </button>
                          )
                        )}

                    </div>

                  </div>
                )}

                {role === "admin" && (
                  <div className="admin-info">
                    🛡️ Admin access includes
                    stock, products and
                    management dashboard.
                  </div>
                )}

                {role === "customer" && (
                  <div className="register-link">

                    <span>
                      New to GroceryX?
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        switchMode(
                          "register"
                        )
                      }
                    >
                      ✨ Create New Account
                    </button>

                  </div>
                )}
              </>
            )}

            {mode === "register" &&
              role === "customer" && (
                <form
                  onSubmit={
                    handleRegistration
                  }
                >

                  <div className="form-group">

                    <label>
                      Full Name
                    </label>

                    <div className="input-box">

                      <span>👤</span>

                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) =>
                          setName(
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>

                  <div className="form-group">

                    <label>
                      Mobile Number
                    </label>

                    <div className="input-box">

                      <span>📱</span>

                      <input
                        type="tel"
                        maxLength="10"
                        placeholder="Enter 10-digit mobile number"
                        value={mobile}
                        onChange={(e) =>
                          setMobile(
                            e.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                      />

                    </div>

                  </div>

                  <div className="form-group">

                    <label>
                      Email Address
                    </label>

                    <div className="input-box">

                      <span>📧</span>

                      <input
                        type="email"
                        placeholder="Create your email"
                        value={email}
                        onChange={(e) =>
                          setEmail(
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>

                  <div className="form-group">

                    <label>
                      Password
                    </label>

                    <div className="input-box">

                      <span>🔒</span>

                      <input
                        type="password"
                        placeholder="Minimum 6 characters"
                        value={password}
                        onChange={(e) =>
                          setPassword(
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>

                  <div className="form-group">

                    <label>
                      Confirm Password
                    </label>

                    <div className="input-box">

                      <span>🔐</span>

                      <input
                        type="password"
                        placeholder="Re-enter your password"
                        value={
                          confirmPassword
                        }
                        onChange={(e) =>
                          setConfirmPassword(
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>

                  <button
                    className="login-button"
                    type="submit"
                  >
                    Create Account →
                  </button>

                  <div className="register-link">

                    <span>
                      Already have an account?
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        switchMode(
                          "login"
                        )
                      }
                    >
                      Login
                    </button>

                  </div>

                </form>
              )}

            {error && (
              <div className="login-message error">
                ❌ {error}
              </div>
            )}

            {success && (
              <div className="login-message success">
                ✅ {success}
              </div>
            )}

            <div className="security-row">

              <span>
                🔐 Secure Login
              </span>

              <span>
                🛡️ 2FA Protected
              </span>

              <span>
                🌐 IP Protected
              </span>

            </div>

          </>
        )}

        {step === 2 && (
          <div className="otp-screen">

            <div className="login-header">

              <div className="login-logo">
                🔐
              </div>

              <h1>
                Verify Identity
              </h1>

              <p>
                Enter your 6-digit verification
                code
              </p>

            </div>

            <div className="otp-user">

              <div className="otp-user-icon">
                👤
              </div>

              <div>

                <strong>
                  {role === "admin"
                    ? ADMIN_ACCOUNT.name
                    : selectedCustomer?.name}
                </strong>

                <span>
                  {role === "admin"
                    ? ADMIN_ACCOUNT.email
                    : selectedCustomer?.email}
                </span>

              </div>

            </div>

            <form
              onSubmit={verifyOTP}
            >

              <div className="form-group">

                <label>
                  Verification Code
                </label>

                <div className="input-box otp-box">

                  <span>🔢</span>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength="6"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                  />

                </div>

              </div>

              <div className="timer-row">

                {otpTimer > 0
                  ? `Code expires in ${otpTimer}s`
                  : "Code expired"}

              </div>

              <button
                className="verify-button"
                type="submit"
              >
                Verify & Continue →
              </button>

            </form>

            <div className="otp-actions">

              <button
                className="back-button"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                  clearMessages();
                }}
              >
                ← Back
              </button>

              <button
                className="back-button"
                onClick={resendOTP}
              >
                Resend Code
              </button>

            </div>

            {error && (
              <div className="login-message error">
                ❌ {error}
              </div>
            )}

            {success && (
              <div className="login-message success">
                ✅ {success}
              </div>
            )}

            <div className="login-footer">
              🔒 Two-factor authentication
              and IP monitoring enabled.
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Login;