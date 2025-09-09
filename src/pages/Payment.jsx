// ------------------ src/pages/Payment.jsx ------------------
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const total = location.state?.total || 0;

  const [name, setName] = useState("");
  const [method, setMethod] = useState("");

  const handleConfirm = () => {
    if (!name || !method) {
      alert("⚠️ Please enter your name and select a payment method.");
      return;
    }
    
    // if (method === "Cash on Delivery") {
    //   alert(`✅ Order placed successfully!\n\n${name}, your order will be delivered with Cash on Delivery 🚚💵`);
    // } else {
    //   alert(`✅ Payment of ₹${total} via ${method} by ${name} was successful! 🎉`);
    // }

    localStorage.removeItem("cart"); // empty cart
    
    // navigate("/"); // go home

    // redirect to success page with details
    navigate("/success", { state: { name, method, total } });
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b, #0ea5e9)" }}>
      <div className="bg-white rounded-4 shadow p-5" style={{ width: "400px" }}>
        <h2 className="fw-bold text-center mb-4">💳 Payment</h2>
        <p className="text-center fs-5 mb-4">Total Amount: <b>₹{total}</b></p>

        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <select
            className="form-select"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          >
            <option value="">-- Select --</option>
            <option value="UPI">UPI</option>
            <option value="Debit/Credit Card">Debit/Credit Card</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        {/* Dynamic Button Text */}
        <button
          onClick={handleConfirm}
          className="btn btn-success w-100 fw-bold"
        >
          {method === "Cash on Delivery"
            ? "🚚 Place an Order"
            : `Pay ₹${total}`}
        </button>


      </div>
    </div>
  );
}










// import React, { useState } from "react";

// export default function Payment() {
//   const [method, setMethod] = useState("");

//   const handlePay = () => {
//     if (!method) {
//       alert("⚠️ Please select a payment method");
//       return;
//     }
//     alert(`💳 Payment successful via ${method}!\nThank you for ordering 🍴`);
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="fw-bold mb-4">💳 Payment</h2>
//       <div className="form-check">
//         <input
//           type="radio"
//           className="form-check-input"
//           name="payment"
//           id="upi"
//           value="UPI"
//           onChange={(e) => setMethod(e.target.value)}
//         />
//         <label htmlFor="upi" className="form-check-label">UPI</label>
//       </div>
//       <div className="form-check">
//         <input
//           type="radio"
//           className="form-check-input"
//           name="payment"
//           id="card"
//           value="Card"
//           onChange={(e) => setMethod(e.target.value)}
//         />
//         <label htmlFor="card" className="form-check-label">Debit/Credit Card</label>
//       </div>
//       <div className="form-check">
//         <input
//           type="radio"
//           className="form-check-input"
//           name="payment"
//           id="cod"
//           value="Cash on Delivery"
//           onChange={(e) => setMethod(e.target.value)}
//         />
//         <label htmlFor="cod" className="form-check-label">Cash on Delivery</label>
//       </div>
//       <button className="btn btn-primary mt-3" onClick={handlePay}>
//         Pay Now
//       </button>
//     </div>
//   );
// }










// // ------------------ src/pages/Payment.jsx ------------------
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Payment() {
//   const [cart, setCart] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   // Calculate total price
//   const getTotal = () => {
//     return cart.reduce((total, item) => total + item.price, 0);
//   };

//   const handlePayment = () => {
//     if (!paymentMethod) {
//       alert("⚠️ Please select a payment method!");
//       return;
//     }
//     if (cart.length === 0) {
//       alert("🛒 Your cart is empty. Add items first.");
//       navigate("/menu");
//       return;
//     }

//     // Clear cart after successful order
//     localStorage.removeItem("cart");

//     alert(
//       `✅ Payment Successful!\n\nYour order has been placed.\nExpected delivery: 30–40 minutes 🚚`
//     );
//     navigate("/home");
//   };

//   return (
//     <div
//       className="min-vh-100 py-5"
//       style={{
//         background: "linear-gradient(135deg, #1e293b 0%, #334155 40%, #06b6d4 100%)",
//       }}
//     >
//       <div className="container">
//         <h1 className="fw-bold text-center text-white mb-4">💳 Payment</h1>

//         {cart.length === 0 ? (
//           <p className="text-center text-white-50">
//             Your cart is empty. Please add items before proceeding.
//           </p>
//         ) : (
//           <div className="card shadow-lg border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "500px" }}>
//             <h4 className="fw-semibold mb-3">Order Summary</h4>
//             <ul className="list-group mb-3">
//               {cart.map((item, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   {item.name}
//                   <span>₹{item.price}</span>
//                 </li>
//               ))}
//               <li className="list-group-item d-flex justify-content-between fw-bold">
//                 Total <span>₹{getTotal()}</span>
//               </li>
//             </ul>

//             <h5 className="mb-3">Choose Payment Method:</h5>
//             <div className="form-check mb-2">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="UPI"
//                 id="upi"
//                 className="form-check-input"
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />
//               <label htmlFor="upi" className="form-check-label">📱 UPI</label>
//             </div>

//             <div className="form-check mb-2">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="Card"
//                 id="card"
//                 className="form-check-input"
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />
//               <label htmlFor="card" className="form-check-label">💳 Credit / Debit Card</label>
//             </div>

//             <div className="form-check mb-3">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="COD"
//                 id="cod"
//                 className="form-check-input"
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />
//               <label htmlFor="cod" className="form-check-label">🚚 Cash on Delivery</label>
//             </div>

//             <button
//               className="btn btn-success w-100 fw-semibold"
//               onClick={handlePayment}
//             >
//               ✅ Confirm Payment
//             </button>

//             <Link to="/checkout" className="btn btn-outline-light w-100 mt-3 fw-semibold">
//               🔙 Back to Checkout
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
