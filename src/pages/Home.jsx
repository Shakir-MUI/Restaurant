// ------------------ src/pages/Home.jsx ------------------
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #0ea5e9 100%)",
        color: "white",
      }}
    >
      <div className="container text-center py-5">
        <h1 className="fw-bold display-4 mb-3">🍴 Welcome to The Golden Bite Restaurant</h1>
        <p className="lead mb-4">
          Delicious Veg, Non-Veg, Desserts, Juices & Combo offers.  
          Order online and get it delivered via <span className="fw-bold">Swiggy</span> or <span className="fw-bold">Zomato</span>.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/menu" className="btn btn-light btn-lg fw-semibold shadow">
            View Menu
          </Link>
          <Link to="/checkout" className="btn btn-success btn-lg fw-semibold shadow">
            Checkout
          </Link>
          <Link to="/reviews" className="btn btn-warning btn-lg fw-semibold shadow">
            Customer Reviews
          </Link>
        </div>

        <div className="mt-5">
          <h3 className="fw-bold">Our Delivery Partners</h3>
          <div className="d-flex justify-content-center gap-4 mt-3">
            <a href="https://www.swiggy.com" target="_blank" rel="noreferrer">
              <img
                src="https://cdn.pnggallery.com/wp-content/uploads/swiggy-logo-02.png"
                alt="Swiggy"
                width="120"
              />
            </a>
            <a href="https://www.zomato.com" target="_blank" rel="noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/600px-Zomato_logo.png"
                alt="Zomato"
                width="120"
              />
            </a>
          </div>
        </div>

        <footer className="mt-5 text-white-50">
          <h2 className="mb-3" style={{ color: "white" }}>Contact Us On:</h2>
          <div className="d-flex justify-content-center gap-4">
            {/* Gmail */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=thegoldenbite07@gmail.com"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
                alt="Gmail"
                width="50"
                title="Send us an email"
              />
            </a>

            {/* WhatsApp */}
            <a
              href="https://api.whatsapp.com/send?phone=919952876617&text=Hello%20The%20Golden%20Bite%20Restaurant!"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                width="50"
                title="Chat with us on WhatsApp"
              />
            </a>
          </div>
          <div className="mt-3">
            <p className="mb-1">thegoldenbite07@gmail.com</p>
            <p className="mb-0">WhatsApp: +91 99528 76617</p>
          </div>
          <p className="mt-4 mb-0">&copy; {new Date().getFullYear()} The Golden Bite Restaurant. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
