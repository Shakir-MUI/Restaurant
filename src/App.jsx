// ------------------ src/App.jsx ------------------
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import Reviews from "./pages/Reviews";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";

import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

// ✅ Import category pages
import Veg from "./pages/Veg";
import NonVeg from "./pages/NonVeg";
import Dessert from "./pages/Dessert";
import Juice from "./pages/Juice";
import Combo from "./pages/Combo";

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = ["/signin", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          {/* Auth */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<OrderSuccess />} />

          {/* Category pages */}
          <Route path="/menu/veg" element={<Veg />} />
          <Route path="/menu/nonveg" element={<NonVeg />} />
          <Route path="/menu/dessert" element={<Dessert />} />
          <Route path="/menu/juice" element={<Juice />} />
          <Route path="/menu/combo" element={<Combo />} />

          {/* Admin */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />

          {/* Default fallback */}
          <Route path="*" element={<Home />} /> 
        </Routes>
      </Layout>
    </CartProvider>
  );
}










// ------------------ src/App.jsx ------------------
// import React from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import { CartProvider } from "./context/CartContext";

// import Signin from "./pages/Signin";
// import Signup from "./pages/Signup";
// import Home from "./pages/Home";
// import Menu from "./pages/Menu";
// import Checkout from "./pages/Checkout";
// import Reviews from "./pages/Reviews";
// import AdminLogin from "./pages/AdminLogin";
// import Admin from "./pages/Admin";

// import Veg from "./pages/Veg";
// import NonVeg from "./pages/NonVeg";
// import Dessert from "./pages/Dessert";
// import Juice from "./pages/Juice";
// import Combo from "./pages/Combo";

// // Fake auth check → replace with Firebase auth state later
// const isAuthenticated = () => {
//   return localStorage.getItem("user"); // ✅ check if user signed in
// };

// function Layout({ children }) {
//   const location = useLocation();
//   const hideNavbar = ["/signin", "/signup"].includes(location.pathname);

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       {children}
//     </>
//   );
// }

// export default function App() {
//   return (
//     <CartProvider>
//       <Layout>
//         <Routes>
//           {/* Default route → show Signin first */}
//           <Route path="/" element={<Navigate to="/signin" />} />

//           {/* Auth */}
//           <Route path="/signin" element={<Signin />} />
//           <Route path="/signup" element={<Signup />} />

//           {/* Public Pages (no signin required) */}
//           <Route path="/menu" element={<Menu />} />
//           <Route path="/reviews" element={<Reviews />} />
//           <Route path="/veg" element={<Veg />} />
//           <Route path="/nonveg" element={<NonVeg />} />
//           <Route path="/dessert" element={<Dessert />} />
//           <Route path="/juice" element={<Juice />} />
//           <Route path="/combo" element={<Combo />} />

//           {/* Protected Pages (signin required) */}
//           <Route
//             path="/home"
//             element={isAuthenticated() ? <Home /> : <Navigate to="/signin" />}
//           />
//           <Route
//             path="/checkout"
//             element={isAuthenticated() ? <Checkout /> : <Navigate to="/signin" />}
//           />

//           {/* Admin */}
//           <Route path="/admin-login" element={<AdminLogin />} />
//           <Route path="/admin" element={<Admin />} />

//           {/* Catch all → signin */}
//           <Route path="*" element={<Navigate to="/signin" />} />
//         </Routes>
//       </Layout>
//     </CartProvider>
//   );
// }










// import React from "react";
// import {
//   Routes,
//   Route,
//   useLocation,
//   Outlet,
// } from "react-router-dom";

// import Navbar from "./components/Navbar";

// import Signup from "./pages/Signup";
// import Signin from "./pages/Signin";
// import Home from "./pages/Home";
// import Menu from "./pages/Menu";
// import Checkout from "./pages/Checkout";
// import Reviews from "./pages/Reviews";
// import AdminLogin from "./pages/AdminLogin";
// import Admin from "./pages/Admin";

// // Layout wrapper
// function Layout() {
//   const location = useLocation();
//   const hideNavbar = ["/signin", "/signup"].includes(location.pathname);

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       <Outlet />
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Routes>
//       {/* Pages with Navbar */}
//       <Route element={<Layout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/menu" element={<Menu />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/reviews" element={<Reviews />} />
//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/admin" element={<Admin />} />
//       </Route>

//       {/* Auth pages (no Navbar) */}
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/signin" element={<Signin />} />

//       {/* Catch-all redirect */}
//       <Route path="*" element={<Signin />} />
//     </Routes>
//   );
// }