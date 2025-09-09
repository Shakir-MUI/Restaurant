// ------------------ src/pages/Juice.jsx ------------------
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FIREBASE_DB_URL } from "../firebase.js";

const BASE_URL = FIREBASE_DB_URL.replace(/\/$/, "");

const fallbackJuiceItems = [
  {
    id: "ju1",
    name: "Fresh Orange Juice",
    price: 80,
    description: "Freshly squeezed oranges full of Vitamin C.",
    image: "https://static.vecteezy.com/system/resources/previews/030/273/762/large_2x/the-benefits-of-drinking-orange-juice-ai-generated-free-photo.jpg",
  },
  {
    id: "ju2",
    name: "Watermelon Juice",
    price: 70,
    description: "Cool and refreshing watermelon juice.",
    image: "https://img.freepik.com/premium-photo/cup-watermelon-juice-with-splash-black-reflective-studio-background_762785-122009.jpg",
  },
  {
    id: "ju3",
    name: "Mango Shake",
    price: 100,
    description: "Seasonal mango shake with ice cream.",
    image: "https://img.freepik.com/premium-photo/mango-smoothie-dark-background_582637-7662.jpg",
  },
  {
    id: "ju4",  
    name: "Pineapple Juice",
    price: 90,
    description: "Tangy pineapple juice with a tropical punch.",
    image: "https://img.freepik.com/premium-photo/glass-pineapple-juice-with-fresh-background_564992-531.jpg",
  },
  {
    id: "ju5",
    name: "Apple Juice",
    price: 85,
    description: "Sweet and crisp apple juice.",
    image: "https://static.vecteezy.com/system/resources/previews/030/623/981/non_2x/apple-juice-image-hd-free-photo.jpg",
  },
  {
    id: "ju6",
    name: "Lemon Mint Cooler",
    price: 75,
    description: "Fresh lime juice with mint and soda.",
    image: "https://image.freepik.com/free-photo/refreshing-mojito-with-lime-mint-ice-glass_275899-968.jpg",
  },
  {
    id: "ju7",
    name: "Strawberry Shake",
    price: 110,
    description: "Creamy shake with fresh strawberries.",
    image: "https://img.freepik.com/premium-photo/glass-strawberry-smoothie-bowl-strawberries_865967-141226.jpg",
  },
  {
    id: "ju8",
    name: "Grape Juice",
    price: 95,
    description: "Juicy grapes blended into a refreshing drink.",
    image: "https://img.freepik.com/premium-photo/grape-juice-clear-glass_1234738-201630.jpg",
  },
  {
    id: "ju9",
    name: "Coconut Water",
    price: 60,
    description: "Natural tender coconut water.",
    image: "https://img.freepik.com/premium-photo/coconut-water-fresh-cocktail-natural-coconut_786587-404.jpg",
  },
  {
    id: "ju10",
    name: "Kiwi Juice",
    price: 120,
    description: "Exotic kiwi juice packed with antioxidants.",
    image: "https://weirdsmoothies.com/wp-content/uploads/2024/01/image-212-1024x702.jpeg",
  },
  {
    id: "ju11",
    name: "Pomegranate Juice",
    price: 130,
    description: "Rich in iron and vitamins.",
    image: "https://img.freepik.com/premium-photo/pomegranate-juice_98908-2329.jpg",
  },
  {
    id: "ju12",
    name: "Cold Coffee",
    price: 100,
    description: "Chilled coffee blended with milk & ice.",
    image: "https://coffeemodern.com/wp-content/uploads/2021/12/F1-2.jpg",
  },
  {
    id: "ju13",
    name: "Banana Shake",
    price: 90,
    description: "Energy-packed banana milkshake.",
    image: "https://i.ytimg.com/vi/BDoW40Basfs/maxresdefault.jpg",
  },
  {
    id: "ju14",
    name: "Mixed Fruit Juice",
    price: 140,
    description: "Blend of seasonal fruits in one glass.",
    image: "https://img.freepik.com/premium-photo/mixed-berry-smoothie-with-spinach-photo-realistic-still-life-photo-overhead-shot-ai-generated_29654-4052.jpg",
  },
  {
    id: "ju15",
    name: "Tender Lime Soda",
    price: 60,
    description: "Refreshing lime soda with salt/sugar.",
    image: "https://tse1.mm.bing.net/th/id/OIP.lSEAqHZATOmHSPyS7h0NeAHaE7?r=0&w=626&h=417&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

export default function Juice() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [toast, setToast] = useState("");

  // Load items and likes from localStorage
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/menu/juice.json`);
        if (!alive) return;
        let arr = data ? (Array.isArray(data) ? data : Object.values(data)) : fallbackJuiceItems;
        // Load likes from localStorage
        const savedLikes = JSON.parse(localStorage.getItem("JuiceLikes") || "{}");
        arr = arr.map(item => ({
          ...item,
          likes: savedLikes[item.id] || 0,
        }));
        setItems(arr);
      } catch (e) {
        console.error("Juice fetch error:", e);
        const savedLikes = JSON.parse(localStorage.getItem("JuiceLikes") || "{}");
        const arr = fallbackJuiceItems.map(item => ({
          ...item,
          likes: savedLikes[item.id] || 0,
        }));
        setItems(arr);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // ✅ Add to cart with qty support
  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex((c) => c.id === item.id);
    if (idx > -1) {
      cart[idx].qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    setToast(`${item.name} added to cart 🛒`);
    setTimeout(() => setToast(""), 2500);
  };

  // ✅ Handle likes
  const handleLike = (itemId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        const newLikes = item.likes + 1;
        return { ...item, likes: newLikes };
      }
      return item;
    });
    setItems(updatedItems);

    // Save likes in localStorage
    const savedLikes = JSON.parse(localStorage.getItem("JuiceLikes") || "{}");
    savedLikes[itemId] = (savedLikes[itemId] || 0) + 1;
    localStorage.setItem("JuiceLikes", JSON.stringify(savedLikes));
  };

  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center text-white"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0ea5e9 100%)",
        }}
      >
        <div className="spinner-border" role="status" />
        <span className="ms-3">Loading refreshing juices...</span>
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
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-end flex-wrap mb-4">
          <div>
            <h1 className="text-white fw-bold m-0">🥤 Refreshing Juices</h1>
            <p className="text-white-50 m-0">Stay fresh and hydrated with our natural juices!</p>
          </div>
          <Link
            to="/checkout"
            className="btn btn-light fw-semibold shadow-sm px-4 py-2"
          >
            Go to Checkout
          </Link>
        </div>

        {/* Grid */}
        <div className="row g-4">
          {items.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-lg-4">
              <div
                className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden"
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  transform:
                    hovered === item.id ? "translateY(-8px) scale(1.03)" : "none",
                  boxShadow:
                    hovered === item.id
                      ? "0 8px 25px rgba(0,0,0,0.4)"
                      : "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: 220, objectFit: "cover" }}
                />
                <div className="card-body bg-dark text-white d-flex flex-column">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <p className="card-text text-white-50 small flex-grow-1">
                    {item.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="badge bg-success fs-6">
                      ₹{item.price}
                    </span>
                    <button
                      className="btn btn-sm btn-warning fw-semibold text-dark"
                      onClick={() => addToCart(item)}
                    >
                      + Add
                    </button>
                  </div>
                  <div className="mt-2 d-flex align-items-center justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-light"
                      onClick={() => handleLike(item.id)}
                    >
                      ❤️ Like
                    </button>
                    <span>{item.likes} {item.likes === 1 ? "Like" : "Likes"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back */}
        <div className="text-center mt-5">
          <p className="text-white-50 mb-1">Want more options?</p>
          <Link to="/menu" className="btn btn-outline-light px-4 py-2">
            Back to Menu
          </Link>
        </div>
      </div>

      {/* ✅ Toast */}
      {toast && (
        <div
          className="position-fixed bottom-0 end-0 m-3 p-3 bg-success text-white rounded shadow"
          style={{ zIndex: 9999 }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}










// // ------------------ src/pages/Juice.jsx ------------------
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const BASE_URL = "https://e-commerce-77db0-default-rtdb.firebaseio.com";

// export default function Juice() {
//   const [juices, setJuices] = useState([]);

//   // Load from Firebase or fallback
//   useEffect(() => {
//     async function fetchJuices() {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/menu/juice.json`);
//         if (data) {
//           setJuices(Object.values(data));
//         } else {
//           setJuices(defaultJuices);
//         }
//       } catch (err) {
//         console.error(err);
//         setJuices(defaultJuices);
//       }
//     }
//     fetchJuices();
//   }, []);

//   const addToCart = (item) => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart.push(item);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert(`${item.name} added to cart ✅`);
//   };

//   return (
//     <div
//       className="min-vh-100 py-5"
//       style={{
//         background: "linear-gradient(135deg, #065f46 0%, #059669 35%, #34d399 100%)",
//       }}
//     >
//       <div className="container">
//         <h1 className="fw-bold text-center text-white mb-4">🥤 Refreshing Juices</h1>
//         <p className="text-center text-white-50 mb-5">
//           Stay fresh and hydrated with our natural juices!
//         </p>

//         <div className="row g-4">
//           {juices.map((item, i) => (
//             <div key={i} className="col-12 col-md-6 col-lg-4">
//               <div
//                 className="card h-100 shadow-lg border-0 rounded-4 overflow-hidden"
//                 style={{ transition: "transform 0.3s", cursor: "pointer" }}
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="card-img-top"
//                   style={{ height: "220px", objectFit: "cover" }}
//                 />
//                 <div className="card-body bg-dark text-white">
//                   <h5 className="card-title fw-bold">{item.name}</h5>
//                   <p className="card-text text-white-50">{item.description}</p>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="fw-bold">₹{item.price}</span>
//                     <button
//                       className="btn btn-sm btn-success"
//                       onClick={() => addToCart(item)}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-5">
//           <Link to="/checkout" className="btn btn-warning px-4 fw-semibold">
//             🛒 Go to Checkout
//           </Link>
//           <Link to="/menu" className="btn btn-light ms-3 px-4 fw-semibold">
//             🔙 Back to Menu
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// const defaultJuices = [
//   {
//     name: "Fresh Orange Juice",
//     price: 80,
//     description: "Freshly squeezed oranges full of Vitamin C.",
//     image: "https://images.unsplash.com/photo-1577803645773-f96470509666",
//   },
//   {
//     name: "Watermelon Juice",
//     price: 70,
//     description: "Cool and refreshing watermelon juice.",
//     image: "https://images.unsplash.com/photo-1622037025290-f5f364a7e06a",
//   },
//   {
//     name: "Mango Shake",
//     price: 100,
//     description: "Seasonal mango shake with ice cream.",
//     image: "https://images.unsplash.com/photo-1622484219556-997e228ee2f2",
//   },
//   {
//     name: "Pineapple Juice",
//     price: 90,
//     description: "Tangy pineapple juice with a tropical punch.",
//     image: "https://images.unsplash.com/photo-1613477131388-01dfbb0f29ea",
//   },
//   {
//     name: "Apple Juice",
//     price: 85,
//     description: "Sweet and crisp apple juice.",
//     image: "https://images.unsplash.com/photo-1566393028639-6b4e1f6a9c55",
//   },
//   {
//     name: "Lemon Mint Cooler",
//     price: 75,
//     description: "Fresh lime juice with mint and soda.",
//     image: "https://images.unsplash.com/photo-1617196038449-7d7ecf90a962",
//   },
//   {
//     name: "Strawberry Shake",
//     price: 110,
//     description: "Creamy shake with fresh strawberries.",
//     image: "https://images.unsplash.com/photo-1621996346568-8e2f518f4d6a",
//   },
//   {
//     name: "Grape Juice",
//     price: 95,
//     description: "Juicy grapes blended into a refreshing drink.",
//     image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
//   },
//   {
//     name: "Coconut Water",
//     price: 60,
//     description: "Natural tender coconut water.",
//     image: "https://images.unsplash.com/photo-1590080876098-f98d93e1a6f0",
//   },
//   {
//     name: "Kiwi Juice",
//     price: 120,
//     description: "Exotic kiwi juice packed with antioxidants.",
//     image: "https://images.unsplash.com/photo-1626082899250-1c96f8c7c1cf",
//   },
//   {
//     name: "Pomegranate Juice",
//     price: 130,
//     description: "Rich in iron and vitamins.",
//     image: "https://images.unsplash.com/photo-1610970878454-ef43f9c14847",
//   },
//   {
//     name: "Cold Coffee",
//     price: 100,
//     description: "Chilled coffee blended with milk & ice.",
//     image: "https://images.unsplash.com/photo-1589998059171-988d887df646",
//   },
//   {
//     name: "Banana Shake",
//     price: 90,
//     description: "Energy-packed banana milkshake.",
//     image: "https://images.unsplash.com/photo-1622037025290-f5f364a7e06a",
//   },
//   {
//     name: "Mixed Fruit Juice",
//     price: 140,
//     description: "Blend of seasonal fruits in one glass.",
//     image: "https://images.unsplash.com/photo-1617196038539-7c8d6d63f0f5",
//   },
//   {
//     name: "Tender Lime Soda",
//     price: 60,
//     description: "Refreshing lime soda with salt/sugar.",
//     image: "https://images.unsplash.com/photo-1617817088481-46f72ae06e3d",
//   },
// ];
