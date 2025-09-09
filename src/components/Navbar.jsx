// ------------------ src/components/Navbar.jsx ------------------
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("user");
    alert("🚪 Signed out successfully!");
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/home">
          🍴 Foodies Restaurant
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/menu">
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reviews">
                Reviews
              </Link>
            </li>
          </ul>
          <button onClick={handleSignout} className="btn btn-outline-light">
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
