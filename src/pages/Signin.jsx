// ------------------ src/pages/Signin.jsx ------------------
// ------------------ src/pages/Signin.jsx ------------------
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Get users data from Firebase
      const res = await axios.get(
        "https://e-commerce-77db0-default-rtdb.firebaseio.com/users.json"
      );

      const users = res.data ? Object.values(res.data) : [];

      // ✅ Check if user exists
      const user = users.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (user) {
        alert("Signin Successful ✅");
        localStorage.setItem("user", JSON.stringify(user));

        // 👉 Redirect to Home page
        navigate("/");
      } else {
        alert("❌ Invalid email or password");
      }
    } catch (error) {
      console.error("Signin Error:", error);
      alert("Error signing in. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b 40%, #0ea5e9)",
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">🔑 Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>
        <p className="mt-3 text-center">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}










// // ------------------ src/pages/Signin.jsx ------------------
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { FIREBASE_DB_URL } from "../firebase.js";

// const BASE_URL = FIREBASE_DB_URL.replace(/\/$/, ""); // remove trailing slash if any

// export default function Signin() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     const err = {};
//     if (!form.name.trim()) err.name = "Name is required";
//     if (!form.email.trim()) err.email = "Email is required";
//     if (!form.password.trim()) err.password = "Password is required";
//     else if (form.password.length < 6)
//       err.password = "Password must be at least 6 characters";
//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       setLoading(true);

//       // Get all users from Firebase
//       const { data: users } = await axios.get(`${BASE_URL}/users.json`);
//       const list = users ? Object.values(users) : [];

//       // Find user with matching email + password
//       const user = list.find(
//         (u) =>
//           u.email?.toLowerCase() === form.email.toLowerCase() &&
//           u.password === form.password &&
//           u.name?.toLowerCase() === form.name.toLowerCase()
//       );

//       if (user) {
//         alert(`Signin successful 🎉 Welcome back, ${user.name}`);
//         // Store session (simple way)
//         localStorage.setItem("user", JSON.stringify(user));
//         navigate("/");
//       } else {
//         alert("Invalid credentials. Please try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Signin failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-vh-100 d-flex align-items-center"
//       style={{
//         background:
//           "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #22c55e 100%)",
//       }}
//     >
//       <div className="container py-5">
//         <div className="row justify-content-center">
//           <div className="col-12 col-md-8 col-lg-6">
//             <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
//               <div className="p-4 p-md-5" style={{ background: "#22c55e" }}>
//                 <h2 className="text-white fw-bold m-0">Welcome Back</h2>
//                 <p className="text-white-50 mb-0">
//                   Sign in to continue ordering
//                 </p>
//               </div>

//               <div className="card-body p-4 p-md-5">
//                 <form onSubmit={handleSubmit} noValidate>
//                   <div className="mb-3">
//                     <label className="form-label">Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       className={`form-control ${errors.name ? "is-invalid" : ""}`}
//                       placeholder="Enter your name"
//                       value={form.name}
//                       onChange={onChange}
//                     />
//                     {errors.name && (
//                       <div className="invalid-feedback">{errors.name}</div>
//                     )}
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       className={`form-control ${errors.email ? "is-invalid" : ""}`}
//                       placeholder="you@example.com"
//                       value={form.email}
//                       onChange={onChange}
//                     />
//                     {errors.email && (
//                       <div className="invalid-feedback">{errors.email}</div>
//                     )}
//                   </div>

//                   <div className="mb-4">
//                     <label className="form-label">Password</label>
//                     <input
//                       type="password"
//                       name="password"
//                       className={`form-control ${errors.password ? "is-invalid" : ""}`}
//                       placeholder="Enter your password"
//                       value={form.password}
//                       onChange={onChange}
//                     />
//                     {errors.password && (
//                       <div className="invalid-feedback">{errors.password}</div>
//                     )}
//                   </div>

//                   <button
//                     type="submit"
//                     className="btn btn-success w-100 py-2 fw-semibold"
//                     disabled={loading}
//                   >
//                     {loading ? "Signing in..." : "Sign in"}
//                   </button>

//                   <div className="text-center mt-3">
//                     <small className="text-muted">
//                       Don't have an account? <Link to="/signup">Sign up</Link>
//                     </small>
//                   </div>
//                 </form>
//               </div>
//             </div>

//             <p className="text-center text-white-50 mt-3 mb-0">
//               Secure login powered by{" "}
//               <span className="text-white">Firebase Realtime DB</span>.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
