// ------------------ src/pages/Veg.jsx ------------------
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FIREBASE_DB_URL } from "../firebase.js";
import { useNavigate } from "react-router-dom";

const BASE_URL = FIREBASE_DB_URL.replace(/\/$/, "");

const fallbackVegItems = [
  {
    id: "veg1",
    name: "Paneer Butter Masala",
    price: 199,
    desc: "Cottage cheese in creamy tomato gravy",
    img: "https://tse1.mm.bing.net/th/id/OIP.fgEb3K-H9k8ovUMpQhnQxgHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    likes: 0
  },
  {
    id: "veg2",
    name: "Veg Biryani",
    price: 179,
    desc: "Aromatic basmati rice with mixed veggies",
    img: "https://media.istockphoto.com/id/1363306860/photo/veg-biryani.jpg?s=612x612&w=0&k=20&c=HCRg_H6VqfL07tF7RYDXedJrjQyqQsUtGiaSF_4L8Yw=",
    likes: 0
  },
  {
    id: "veg3",
    name: "Chole Bhature",
    price: 159,
    desc: "Spiced chickpeas with fried bread",
    img: "https://i.cdn.newsbytesapp.com/images/l24220240122105227.jpeg",
    likes: 0  
  },
  {
    id: "veg4",
    name: "Masala Dosa",
    price: 129,
    desc: "Crispy dosa stuffed with spiced potato",
    img: "https://images.news18.com/ibnkhabar/uploads/2021/08/masala-dosa-recipe.jpg",
    likes: 0
  },
  {
    id: "veg5",
    name: "Veg Fried Rice",
    price: 149,
    desc: "Indo-Chinese style fried rice",
    img: "https://i.pinimg.com/originals/2b/ac/ff/2bacffe492fef24edf51eb403bbfeff7.jpg",
    likes: 0
  },
  {
    id: "veg6",
    name: "Aloo Paratha",
    price: 99,
    desc: "Stuffed flatbread with spiced potato",
    img: "https://t4.ftcdn.net/jpg/06/68/58/61/360_F_668586164_V1Q1L8ChxDSVc9d0QbFZk1wfylNmV83p.jpg",
    likes: 0
  },
  {
    id: "veg7",
    name: "Veg Manchurian",
    price: 169,
    desc: "Crispy veg balls in tangy sauce",
    img: "https://img.freepik.com/premium-photo/veg-chicken-manchurian-with-gravy_729149-107829.jpg",
    likes: 0
  },
  {
    id: "veg8",
    name: "Mushroom Masala",
    price: 179,
    desc: "Mushrooms in rich onion‑tomato gravy",
    img: "https://www.palatesdesire.com/wp-content/uploads/2020/03/Mushroom_masala-1536x1025.jpg",
    likes: 0
  },
  {
    id: "veg9",
    name: "Dal Makhani",
    price: 159,
    desc: "Slow‑cooked black lentils, buttery",
    img: "https://wallpaperaccess.com/full/10568916.jpg",
    likes: 0
  },
  {
    id: "veg10",
    name: "Kadai Vegetable",
    price: 169,
    desc: "Mixed veggies tossed with kadai spices",
    img: "https://cdn.tasteatlas.com/images/dishes/d24aa6fbf6024a2c94de28fadb965701.jpeg?mw=1300",
    likes: 0
  },
  {
    id: "veg11",
    name: "Paneer Tikka",
    price: 199,
    desc: "Tandoor‑grilled paneer with spices",
    img: "https://tse2.mm.bing.net/th/id/OIP.-ndMbbnDa5vPzgLYrBbLMgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    likes: 0
  },
  {
    id: "veg12",
    name: "Veg Pulao",
    price: 139,
    desc: "Fragrant rice with veggies & spices",
    img: "https://kohinoor-joy.com/wp-content/uploads/2020/11/veg-pulao-1068x601.jpg",
    likes: 0
  },
  {
    id: "veg13",
    name: "Sambar Rice",
    price: 119,
    desc: "Comforting south‑Indian classic",
    img: "https://img.freepik.com/free-photo/sambar-rice-sambar-sadam-one-pot-meal-from-south-indian-state-tamil-nadu-kerala_466689-75208.jpg?size=626&ext=jpg",
    likes: 0
  },
  {
    id: "veg14",
    name: "Gobi 65",
    price: 149,
    desc: "Crispy cauliflower fritters",
    img: "https://as1.ftcdn.net/v2/jpg/04/18/04/38/1000_F_418043809_e3jOBjYVMSllkE6AGxCnD9BRmxiBDuRi.jpg",
    likes: 0
  },
  {
    id: "veg15",
    name: "Palak Paneer",
    price: 189,
    desc: "Spinach gravy with paneer cubes",
    img: "https://img.freepik.com/premium-photo/palak-paneer-delight_729149-8270.jpg",
    likes: 0
  },
];

export default function Veg() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  // Load items and likes from localStorage
  // useEffect(() => {
  //   let alive = true;
  //   (async () => {
  //     try {
  //       const { data } = await axios.get(`${BASE_URL}/menu/veg.json`);
  //       if (!alive) return;
  //       let arr = data ? (Array.isArray(data) ? data : Object.values(data)) : fallbackVegItems;
  //       // Load likes from localStorage
  //       const savedLikes = JSON.parse(localStorage.getItem("vegLikes") || "{}");
  //       arr = arr.map(item => ({
  //         ...item,
  //         likes: savedLikes[item.id] || 0,
  //       }));
  //       setItems(arr);
  //     } catch (e) {
  //       console.error("Veg fetch error:", e);
  //       const savedLikes = JSON.parse(localStorage.getItem("vegLikes") || "{}");
  //       const arr = fallbackVegItems.map(item => ({
  //         ...item,
  //         likes: savedLikes[item.id] || 0,
  //       }));
  //       setItems(arr);
  //     } finally {
  //       if (alive) setLoading(false);
  //     }
  //   })();
  //   return () => {
  //     alive = false;
  //   };
  // }, []);
  useEffect(() => {
  let alive = true;
  (async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/menu/veg.json`);
      if (!alive) return;
      const arr = data ? Object.values(data) : fallbackVegItems.map(i => ({ ...i, likes: 0 }));
      setItems(arr);
    } catch (e) {
      console.error("Veg fetch error:", e);
      const arr = fallbackVegItems.map(i => ({ ...i, likes: 0 }));
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

    // Redirect to checkout
    // navigate("/checkout");
  };

  
  // ✅ Handle likes
const handleLike = async (itemId) => {
  const updatedItems = items.map(item => {
    if (item.id === itemId) {
      const newLikes = item.likes + 1;
      return { ...item, likes: newLikes };
    }
    return item;
  });
  setItems(updatedItems);

  // Save likes in Firebase
  try {
    await axios.patch(`${BASE_URL}/menu/veg/${itemId}.json`, {
      likes: updatedItems.find(i => i.id === itemId).likes
    });
  } catch (err) {
    console.error("Failed to update likes:", err);
  }
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
        <span className="ms-3">Loading veg dishes...</span>
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
            <h1 className="text-white fw-bold m-0">🥗 Veg Dishes</h1>
            <p className="text-white-50 m-0">Fresh · Delicious · 15 varieties</p>
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
                  src={item.img}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: 220, objectFit: "cover" }}
                />
                <div className="card-body bg-dark text-white d-flex flex-column">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <p className="card-text text-white-50 small flex-grow-1">
                    {item.desc}
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










// // ------------------ src/pages/Veg.jsx ------------------
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { FIREBASE_DB_URL } from "../firebase.js";

// const BASE_URL = FIREBASE_DB_URL.replace(/\/$/, "");

// // Fallback 15 veg items (used if Firebase has no data yet)
// const fallbackVegItems = [
//   {
//     id: "veg1",
//     name: "Paneer Butter Masala",
//     price: 199,
//     desc: "Cottage cheese in creamy tomato gravy",
//     img: "https://images.unsplash.com/photo-1606756790138-261b8f9d9b20",
//   },
//   {
//     id: "veg2",
//     name: "Veg Biryani",
//     price: 179,
//     desc: "Aromatic basmati rice with mixed veggies",
//     img: "https://images.unsplash.com/photo-1604908554027-27f8f3f0d37c",
//   },
//   {
//     id: "veg3",
//     name: "Chole Bhature",
//     price: 159,
//     desc: "Spiced chickpeas with fried bread",
//     img: "https://images.unsplash.com/photo-1625944523172-28a741b93d47",
//   },
//   {
//     id: "veg4",
//     name: "Masala Dosa",
//     price: 129,
//     desc: "Crispy dosa stuffed with spiced potato",
//     img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
//   },
//   {
//     id: "veg5",
//     name: "Veg Fried Rice",
//     price: 149,
//     desc: "Indo‑Chinese style fried rice",
//     img: "https://images.unsplash.com/photo-1604908553623-c1e1b9e69d81",
//   },
//   {
//     id: "veg6",
//     name: "Aloo Paratha",
//     price: 99,
//     desc: "Stuffed flatbread with spiced potato",
//     img: "https://images.unsplash.com/photo-1615486363878-40e9a4b2b3df",
//   },
//   {
//     id: "veg7",
//     name: "Palak Paneer",
//     price: 189,
//     desc: "Spinach gravy with paneer cubes",
//     img: "https://images.unsplash.com/photo-1625944523749-9a2b815b3155",
//   },
//   {
//     id: "veg8",
//     name: "Veg Manchurian",
//     price: 169,
//     desc: "Crispy veg balls in tangy sauce",
//     img: "https://images.unsplash.com/photo-1625944523040-1f7a8d98ac24",
//   },
//   {
//     id: "veg9",
//     name: "Mushroom Masala",
//     price: 179,
//     desc: "Mushrooms in rich onion‑tomato gravy",
//     img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305",
//   },
//   {
//     id: "veg10",
//     name: "Dal Makhani",
//     price: 159,
//     desc: "Slow‑cooked black lentils, buttery",
//     img: "https://images.unsplash.com/photo-1596797038530-2c107229f596",
//   },
//   {
//     id: "veg11",
//     name: "Kadai Vegetable",
//     price: 169,
//     desc: "Mixed veggies tossed with kadai spices",
//     img: "https://images.unsplash.com/photo-1625944523841-6d5c23ec9a22",
//   },
//   {
//     id: "veg12",
//     name: "Paneer Tikka",
//     price: 199,
//     desc: "Tandoor‑grilled paneer with spices",
//     img: "https://images.unsplash.com/photo-1625944522852-9e5aa0fba3b4",
//   },
//   {
//     id: "veg13",
//     name: "Veg Pulao",
//     price: 139,
//     desc: "Fragrant rice with veggies & spices",
//     img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
//   },
//   {
//     id: "veg14",
//     name: "Sambar Rice",
//     price: 119,
//     desc: "Comforting south‑Indian classic",
//     img: "https://images.unsplash.com/photo-1574484284002-952d92456975",
//   },
//   {
//     id: "veg15",
//     name: "Gobi 65",
//     price: 149,
//     desc: "Crispy cauliflower fritters",
//     img: "https://images.unsplash.com/photo-1544025162-d76694265947",
//   },
// ];

// export default function Veg() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hovered, setHovered] = useState(null);

//   useEffect(() => {
//     let alive = true;
//     (async () => {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/menu/veg.json`);
//         if (!alive) return;
//         if (data) {
//           // data can be an object (keyed by firebase) or an array
//           const arr = Array.isArray(data) ? data : Object.values(data);
//           setItems(arr);
//         } else {
//           setItems(fallbackVegItems);
//         }
//       } catch (e) {
//         console.error("Veg fetch error:", e);
//         setItems(fallbackVegItems);
//       } finally {
//         if (alive) setLoading(false);
//       }
//     })();
//     return () => {
//       alive = false;
//     };
//   }, []);

//   const addToCart = (item) => {
//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const idx = cart.findIndex((c) => c.id === item.id);
//     if (idx > -1) {
//       cart[idx].qty += 1;
//     } else {
//       cart.push({ ...item, qty: 1 });
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert(`${item.name} added to cart 🛒`);
//   };

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center text-white" style={{
//         background: "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0ea5e9 100%)",
//       }}>
//         <div className="spinner-border" role="status" />
//         <span className="ms-3">Loading veg dishes...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100 py-5" style={{
//       background: "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0ea5e9 100%)",
//     }}>
//       <div className="container">
//         <div className="d-flex justify-content-between align-items-end flex-wrap mb-4">
//           <div>
//             <h1 className="text-white fw-bold m-0">Veg Dishes</h1>
//             <p className="text-white-50 m-0">15 varieties · Fresh · Delicious</p>
//           </div>
//           <Link to="/checkout" className="btn btn-light fw-semibold shadow">
//             Go to Checkout
//           </Link>
//         </div>

//         <div className="row g-4">
//           {items.map((item) => (
//             <div key={item.id} className="col-12 col-sm-6 col-lg-4">
//               <div
//                 className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden"
//                 onMouseEnter={() => setHovered(item.id)}
//                 onMouseLeave={() => setHovered(null)}
//                 style={{
//                   transition: "transform 0.25s ease, box-shadow 0.25s ease",
//                   transform: hovered === item.id ? "translateY(-6px) scale(1.02)" : "none",
//                 }}
//               >
//                 <img
//                   src={item.img}
//                   alt={item.name}
//                   className="card-img-top"
//                   style={{ height: 200, objectFit: "cover" }}
//                 />
//                 <div className="card-body bg-dark text-white d-flex flex-column">
//                   <h5 className="card-title fw-bold">{item.name}</h5>
//                   <p className="card-text text-white-50 small flex-grow-1">{item.desc}</p>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="badge bg-success fs-6">₹{item.price}</span>
//                     <button
//                       className="btn btn-sm btn-primary fw-semibold"
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
//           <p className="text-white-50 mb-1">Want more options?</p>
//           <Link to="/menu" className="btn btn-outline-light">Back to Menu</Link>
//         </div>
//       </div>
//     </div>
//   );
// }
