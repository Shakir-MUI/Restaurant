import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <p className="mb-1">Contact Us On </p>
      <p className="mb-1"> <a href="">📧 Email: myrestaurant@gmail.com</a></p>
      <p className="mb-1"> <a href="">📱 WhatsApp: +91 98765 43210</a></p>
      <p className="mb-2">
        Delivery Partners: <strong>Swiggy</strong> & <strong>Zomato</strong>
      </p>
      <p className="mb-0 small text-white-50">
        © {new Date().getFullYear()} MyRestaurant. All Rights Reserved.
      </p>
    </footer>
  );
}
