// ------------------ src/pages/Checkout.jsx ------------------
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const updateQty = (id, delta) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePayment = () => {
    navigate("/payment", { state: { total } }); 
    // alert(`✅ Payment Successful! Total Paid: ₹${total}`);
    // localStorage.removeItem("cart");
    // navigate("/"); // Go back to home
  };

  if (!cart.length) {
    return (
      <div
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-white"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0ea5e9 100%)",
        }}
      >
        <h3>Your cart is empty 🛒</h3>
        <Link to="/menu" className="btn btn-light mt-3">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0ea5e9 100%)",
      }}
    >
      <div className="container bg-white rounded-4 shadow p-4">
        <h2 className="fw-bold mb-4">🛒 Checkout</h2>

        {cart.map((item) => (
          <div
            key={item.id}
            className="d-flex align-items-center justify-content-between border-bottom py-3"
          >
            <div className="d-flex align-items-center">
              <img
                src={item.img || item.image}
                alt={item.name}
                style={{ width: 70, height: 70, borderRadius: 10 }}
              />
              <div className="ms-3">
                <h6 className="fw-bold m-0">{item.name}</h6>
                <p className="m-0 text-muted">₹{item.price}</p>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => updateQty(item.id, -1)}
              >
                -
              </button>
              <span className="mx-2">{item.qty}</span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => updateQty(item.id, 1)}
              >
                +
              </button>
              <button
                className="btn btn-sm btn-danger ms-3"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-between align-items-center mt-4">
          <h4>Total: ₹{total}</h4>
          <button className="btn btn-success btn-lg" onClick={handlePayment}>
            Proceed to Payment 💳
          </button>
        </div>
      </div>
    </div>
  );
}










// import React, { useContext } from "react";
// import { CartContext } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const { cart, removeFromCart, clearCart, getTotal } = useContext(CartContext);
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     if (cart.length === 0) {
//       alert("🛑 Cart is empty");
//       return;
//     }
//     alert(`✅ Order placed!\nTotal: ₹${getTotal()}\nEstimated delivery: 30 min 🚴`);
//     clearCart();
//     navigate("/payment");
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="fw-bold mb-4">🛒 Checkout</h2>
//       {cart.length === 0 ? (
//         <p>No items in cart</p>
//       ) : (
//         <>
//           <ul className="list-group mb-3">
//             {cart.map((item, i) => (
//               <li
//                 key={i}
//                 className="list-group-item d-flex justify-content-between align-items-center"
//               >
//                 <span>
//                   {item.name} - ₹{item.price}
//                 </span>
//                 <button
//                   className="btn btn-sm btn-danger"
//                   onClick={() => removeFromCart(item.name)}
//                 >
//                   ❌ Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <h4 className="fw-bold mb-3">Total: ₹{getTotal()}</h4>
//           <button className="btn btn-success" onClick={handleCheckout}>
//             ✅ Place Order
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
