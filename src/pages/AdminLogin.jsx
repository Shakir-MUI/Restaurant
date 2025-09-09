// Go to /admin-login → Enter

// Email: admin@restaurant.com

// Password: admin123

// On success → Redirects to /admin (Admin Dashboard).

// Wrong credentials → Shows error alert.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// For now, we hardcode admin credentials
const ADMIN_EMAIL = "admin@restaurant.com";
const ADMIN_PASSWORD = "admin123";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      alert("✅ Admin login successful!");
      navigate("/admin");
    } else {
      alert("❌ Invalid admin credentials!");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #22c55e 100%)",
      }}
    >
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "400px" }}>
        <h2 className="fw-bold text-center mb-4">🔐 Admin Login</h2>
        <form onSubmit={handleAdminLogin}>
          <div className="mb-3">
            <label className="form-label">Admin Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Admin Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 mt-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
