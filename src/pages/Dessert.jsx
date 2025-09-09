// ------------------ src/pages/Dessert.jsx ------------------
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FIREBASE_DB_URL } from "../firebase.js";

const BASE_URL = FIREBASE_DB_URL.replace(/\/$/, "");

const fallbackDessertItems = [
  {
    id: "des1",
    name: "Chocolate Brownie",
    price: 120,
    description: "Rich, fudgy brownie with a dark chocolate base.",
    image: "https://tse3.mm.bing.net/th/id/OIP.cA1m1gjR3AQ4JxbsyFwuUwHaE7?r=0&w=626&h=417&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "des2",
    name: "Vanilla Ice Cream",
    price: 90,
    description: "Classic creamy vanilla delight.",
    image: "https://th.bing.com/th/id/R.a292c98c23776a2a09a7ca6ebfa75e76?rik=SOQ345dwv0okHg&riu=http%3a%2f%2fwww.baltana.com%2ffiles%2fwallpapers-18%2fVanilla-Ice-Cream-Wallpaper-HD-46971.jpg&ehk=VP6577j6suKHgUjMfCQbLCgkJNeBVXneq91i5ChFEBQ%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: "des3",
    name: "Strawberry Cheesecake",
    price: 150,
    description: "Creamy cheesecake topped with fresh strawberries.",
    image: "https://i.pinimg.com/originals/69/51/8b/69518b319eece273857ba83595b9f56b.jpg",
  },
  {
    id: "des4",
    name: "Gulab Jamun",
    price: 100,
    description: "Soft milk-solid balls soaked in sugar syrup.",
    image: "https://img.freepik.com/premium-photo/tasty-gulab-jamuns-white-background_787273-3418.jpg",
  },
  {
    id: "des5",
    name: "Rasmalai",
    price: 130,
    description: "Spongy rasgullas in rich saffron milk.",
    image: "https://th.bing.com/th/id/R.f5f842cb91597146df97a40f962fa699?rik=Ovkff7B2O5HSTA&riu=http%3a%2f%2fwww.rachnas-kitchen.com%2fwp-content%2fuploads%2f2016%2f02%2fimage-4.jpeg&ehk=RrNlaewVhN38uYqx70k0WkNrcx3RyP%2fJzrFRJ76PQP8%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: "des6",
    name: "Chocolate Lava Cake",
    price: 160,
    description: "Molten chocolate cake with gooey center.",
    image: "https://img.freepik.com/premium-photo/rich-chocolate-lava-cake-with-molten-center_1169880-61905.jpg",
  },
  {
    id: "des7",
    name: "Fruit Salad with Ice Cream",
    price: 110,
    description: "Seasonal fruits topped with vanilla scoop.",
    image: "https://img.freepik.com/premium-photo/delicious-fruit-salad-glass-with-ice-cream_841543-18533.jpg",
  },
  {
    id: "des8",
    name: "Kesar Kulfi",
    price: 90,
    description: "Traditional Indian saffron-flavored kulfi.",
    image: "https://cdn.mygingergarlickitchen.com/images/800px/800px-how-to-make-mango-kulfi-recipe-video-anupama-paliwal-my-ginger-garlic-kitchen-12.jpg",
  },
  {
    id: "des9",
    name: "Apple Pie",
    price: 140,
    description: "Crispy pie crust filled with apple and cinnamon.",
    image: "https://cdn.pixabay.com/photo/2022/10/13/21/12/apple-pie-7519981_1280.jpg",
  },
  {
    id: "des10",
    name: "Carrot Halwa",
    price: 100,
    description: "Traditional gajar ka halwa with nuts.",
    image: "https://www.ruchikrandhap.com/wp-content/uploads/2010/03/Gajar-Ka-Halwa_1.jpg",
  },
  {
    id: "des11",
    name: "Tiramisu",
    price: 180,
    description: "Coffee-flavored Italian dessert.",
    image: "https://static.vecteezy.com/system/resources/previews/033/790/663/non_2x/a-slice-of-tiramisu-on-a-plate-with-coffee-and-nuts-ai-generated-photo.jpg",
  },
  {
    id: "des12",
    name: "Panna Cotta",
    price: 170,
    description: "Italian creamy dessert with fruit topping.",
    image: "https://i.pinimg.com/originals/8e/95/5d/8e955dfd648d8bd9e68a782cca3fee67.jpg",
  },
  {
    id: "des13",
    name: "Donut",
    price: 80,
    description: "Soft and fluffy donut with glaze.",
    image: "https://cdn.pixabay.com/photo/2023/04/15/11/58/donuts-7927510_1280.jpg",
  },
  {
    id: "des14",
    name: "Mango Mousse",
    price: 140,
    description: "Light and fluffy mousse made with fresh mango.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/029/857/205/small_2x/of-mango-mousse-as-a-dish-in-a-high-end-restaurant-generative-ai-photo.jpg",
  },
  {
    id: "des15",
    name: "Black Forest Cake",
    price: 160,
    description: "Chocolate sponge layered with cream and cherries.",
    image: "https://img.freepik.com/premium-photo/chocolate-cake-with-cherry-generative-ai-content_959800-1547.jpg",
  },
];

export default function Dessert() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [toast, setToast] = useState("");

  // Load items and likes from localStorage
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/menu/dessert.json`);
        if (!alive) return;
        let arr = data ? (Array.isArray(data) ? data : Object.values(data)) : fallbackDessertItems;
        // Load likes from localStorage
        const savedLikes = JSON.parse(localStorage.getItem("DessertLikes") || "{}");
        arr = arr.map(item => ({
          ...item,
          likes: savedLikes[item.id] || 0,
        }));
        setItems(arr);
      } catch (e) {
        console.error("Dessert fetch error:", e);
        const savedLikes = JSON.parse(localStorage.getItem("DessertLikes") || "{}");
        const arr = fallbackDessertItems.map(item => ({
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
    const savedLikes = JSON.parse(localStorage.getItem("DessertLikes") || "{}");
    savedLikes[itemId] = (savedLikes[itemId] || 0) + 1;
    localStorage.setItem("DessertLikes", JSON.stringify(savedLikes));
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
        <span className="ms-3">Loading sweety desserts...</span>
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
            <h1 className="text-white fw-bold m-0">🍨 Dessert </h1>
            <p className="text-white-50 m-0">Sweeten your day with our delicious desserts!</p>
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










// // ------------------ src/pages/Dessert.jsx ------------------
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const BASE_URL = "https://e-commerce-77db0-default-rtdb.firebaseio.com";

// export default function Dessert() {
//   const [desserts, setDesserts] = useState([]);

//   // Load from Firebase or fallback to default
//   useEffect(() => {
//     async function fetchDesserts() {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/menu/dessert.json`);
//         if (data) {
//           setDesserts(Object.values(data));
//         } else {
//           setDesserts(defaultDesserts);
//         }
//       } catch (err) {
//         console.error(err);
//         setDesserts(defaultDesserts);
//       }
//     }
//     fetchDesserts();
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
//         background: "linear-gradient(135deg, #581c87 0%, #9333ea 35%, #f472b6 100%)",
//       }}
//     >
//       <div className="container">
//         <h1 className="fw-bold text-center text-white mb-4">🍨 Desserts</h1>
//         <p className="text-center text-white-50 mb-5">
//           Sweeten your day with our delicious desserts!
//         </p>

//         <div className="row g-4">
//           {desserts.map((item, i) => (
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

// const defaultDesserts = [
//   {
//     name: "Chocolate Brownie",
//     price: 120,
//     description: "Rich, fudgy brownie with a dark chocolate base.",
//     image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
//   },
//   {
//     name: "Vanilla Ice Cream",
//     price: 90,
//     description: "Classic creamy vanilla delight.",
//     image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
//   },
//   {
//     name: "Strawberry Cheesecake",
//     price: 150,
//     description: "Creamy cheesecake topped with fresh strawberries.",
//     image: "https://images.unsplash.com/photo-1603022202744-3a4509d14e06",
//   },
//   {
//     name: "Gulab Jamun",
//     price: 100,
//     description: "Soft milk-solid balls soaked in sugar syrup.",
//     image: "https://images.unsplash.com/photo-1630382226486-2e6ad6f9b59a",
//   },
//   {
//     name: "Rasmalai",
//     price: 130,
//     description: "Spongy rasgullas in rich saffron milk.",
//     image: "https://images.unsplash.com/photo-1668235384068-541f6274955d",
//   },
//   {
//     name: "Chocolate Lava Cake",
//     price: 160,
//     description: "Molten chocolate cake with gooey center.",
//     image: "https://images.unsplash.com/photo-1630396593541-8b27c12075b1",
//   },
//   {
//     name: "Fruit Salad with Ice Cream",
//     price: 110,
//     description: "Seasonal fruits topped with vanilla scoop.",
//     image: "https://images.unsplash.com/photo-1617196038539-7c8d6d63f0f5",
//   },
//   {
//     name: "Kesar Kulfi",
//     price: 90,
//     description: "Traditional Indian saffron-flavored kulfi.",
//     image: "https://images.unsplash.com/photo-1668235232401-93588c55e2b3",
//   },
//   {
//     name: "Apple Pie",
//     price: 140,
//     description: "Crispy pie crust filled with apple and cinnamon.",
//     image: "https://images.unsplash.com/photo-1605478268165-59a3b02aa8a1",
//   },
//   {
//     name: "Carrot Halwa",
//     price: 100,
//     description: "Traditional gajar ka halwa with nuts.",
//     image: "https://images.unsplash.com/photo-1606851214159-3c9615d1a710",
//   },
//   {
//     name: "Tiramisu",
//     price: 180,
//     description: "Coffee-flavored Italian dessert.",
//     image: "https://images.unsplash.com/photo-1590080875695-9b4e408d2cf0",
//   },
//   {
//     name: "Panna Cotta",
//     price: 170,
//     description: "Italian creamy dessert with fruit topping.",
//     image: "https://images.unsplash.com/photo-1626082905254-f2ef749398a2",
//   },
//   {
//     name: "Donut",
//     price: 80,
//     description: "Soft and fluffy donut with glaze.",
//     image: "https://images.unsplash.com/photo-1606312610075-798b9ebf9924",
//   },
//   {
//     name: "Mango Mousse",
//     price: 140,
//     description: "Light and fluffy mousse made with fresh mango.",
//     image: "https://images.unsplash.com/photo-1590080875855-8366a68aa3b4",
//   },
//   {
//     name: "Black Forest Cake",
//     price: 160,
//     description: "Chocolate sponge layered with cream and cherries.",
//     image: "https://images.unsplash.com/photo-1626082738409-91b8e88a72b5",
//   },
// ];
