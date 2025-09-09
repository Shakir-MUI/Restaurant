import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

/**
 * Signup.jsx — Restaurant Website
 * Tech: React + Bootstrap + Axios + Firebase Realtime DB (REST)
 *
 * Assumptions / Wiring:
 * 1) Ensure Bootstrap CSS is loaded in index.html or index.js:
 *    import 'bootstrap/dist/css/bootstrap.min.css';
 * 2) Routes: Add route in App.jsx => <Route path="/signup" element={<Signup />} />
 * 3) Replace BASE_URL with your Firebase RTDB URL (ends with ...firebaseio.com)
 * 4) On success => shows alert + navigates to /signin
 * 5) Password rule: minimum 6 characters (edit validator() to enforce exactly 6 digits if you prefer)
 */

const BASE_URL = "https://e-commerce-77db0-default-rtdb.firebaseio.com"; // no trailing slash

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const err = {};

    // Name
    if (!form.name.trim()) err.name = "Name is required";

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!form.email) err.email = "Email is required";
    else if (!emailRegex.test(form.email)) err.email = "Enter a valid email";

    // Address
    if (!form.address.trim()) err.address = "Address is required";

    // Password: at least 6 chars (edit here to enforce exactly 6 digits)
    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 6)
      err.password = "Password must be at least 6 characters";

    // Confirm Password
    if (form.password !== form.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      // 1) Check if email already exists
      const { data: users } = await axios.get(`${BASE_URL}/users.json`);
      const list = users ? Object.values(users) : [];
      const exists = list.some((u) => u.email?.toLowerCase() === form.email.toLowerCase());
      if (exists) {
        setErrors({ email: "Email already registered. Please sign in." });
        setLoading(false);
        return;
      }

      // 2) Create new user (simple demo — do NOT store plain passwords in production)
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        password: form.password, // hash in real apps
        createdAt: new Date().toISOString(),
        role: "customer",
      };

      await axios.post(`${BASE_URL}/users.json`, payload);

      alert("Signup successful! Welcome to our restaurant 🍽️");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0ea5e9 100%)",
    }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="p-4 p-md-5" style={{ background: "#0ea5e9" }}>
                <h2 className="text-white fw-bold m-0">Create your account</h2>
                <p className="text-white-50 mb-0">Order delicious food in minutes</p>
              </div>

              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={onChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={onChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      name="address"
                      rows="3"
                      className={`form-control ${errors.address ? "is-invalid" : ""}`}
                      placeholder="Door no, Street, City, Pincode"
                      value={form.address}
                      onChange={onChange}
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="Minimum 6 characters"
                      value={form.password}
                      onChange={onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      placeholder="Re-enter password"
                      value={form.confirmPassword}
                      onChange={onChange}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark w-100 py-2 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Sign up"}
                  </button>

                  <div className="text-center mt-3">
                    <small className="text-muted">
                      Already have an account? <Link to="/signin">Sign in</Link>
                    </small>
                  </div>
                </form>
              </div>
            </div>

            <p className="text-center text-white-50 mt-3 mb-0">
              By signing up, you agree to our <span className="text-white">Terms</span> &
              <span className="text-white"> Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
