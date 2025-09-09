// ------------------ src/pages/OrderSuccess.jsx ------------------
import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function OrderSuccess() {
  const location = useLocation();
  const { name, method, total } = location.state || {};

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b, #0ea5e9)",
        color: "white",
      }}
    >
      <div className="bg-dark rounded-4 shadow-lg p-5 text-center" style={{ maxWidth: "500px" }}>
        {/* Success Animation (Emoji style) */}
        <div style={{ fontSize: "60px" }}>🎉✅</div>
        <h2 className="fw-bold mt-3">Order Successful!</h2>
        <p className="text-white-50">
          Thank you <b>{name}</b>, your order has been placed.
        </p>

        {/* <div className="bg-light text-dark rounded-3 p-3 my-4">
          <p className="m-1"><b>Payment Method:</b> {method}</p>
          <p className="m-1"><b>Total Paid:</b> ₹{total}</p>
        </div> */}

        <Link to="/" className="btn btn-primary fw-bold">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
