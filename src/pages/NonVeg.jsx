// ------------------ src/pages/NonVeg.jsx ------------------
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FIREBASE_DB_URL } from "../firebase.js";

const BASE_URL = FIREBASE_DB_URL.replace(/\/$/, "");

const fallbackNonVegItems = [
  {
    id: "non1",
    name: "Chicken Biryani",
    price: 249,
    desc: "Aromatic rice with tender chicken pieces",
    img: "https://img.freepik.com/premium-photo/indian-chicken-biryani-bowl_1045959-2177.jpg",
  },
  {
    id: "non2",
    name: "Butter Chicken",
    price: 279,
    desc: "Creamy tomato gravy with juicy chicken",
    img: "https://img.freepik.com/premium-photo/compilation-mouthwatering-butter-chicken-images-stock-photo-portfolio_198067-493824.jpg",
  },
  {
    id: "non3",
    name: "Mutton Curry",
    price: 299,
    desc: "Slow-cooked mutton in spicy curry",
    img: "https://im.whatshot.in/img/2022/Apr/prchi-palwe-3omlwzkkt0y-unsplash-cropped-1-1649339020-1649402982.jpg",
  },
  {
    id: "non4",
    name: "Fish Fry",
    price: 229,
    desc: "Crispy fried fish with masala coating",
    img: "https://as1.ftcdn.net/v2/jpg/04/64/44/30/1000_F_464443092_bG4XIDtAyJwLk3HQeoK096on3BuTFIWW.jpg",
  },
  {
    id: "non5",
    name: "Prawn Masala",
    price: 269,
    desc: "Juicy prawns in spicy onion-tomato masala",
    img: "https://img.freepik.com/premium-photo/plate-prawns-with-red-sauce-chilies-black-background_398492-4378.jpg",
  },
  {
    id: "non6",
    name: "Chicken 65",
    price: 199,
    desc: "Spicy deep-fried chicken starter",
    img: "https://static.toiimg.com/photo/msid-60425532/60425532.cms",
  },
  {
    id: "non7",
    name: "Grilled Chicken",
    price: 259,
    desc: "Tandoor-grilled chicken with spices",
    img: "https://img.freepik.com/premium-photo/grilled-chicken-wings-barbecue-grill-with-flames-smokegenerative-ai_221128-10158.jpg",
  },
  {
    id: "non8",
    name: "Egg Curry",
    price: 149,
    desc: "Boiled eggs in spicy curry gravy",
    img: "https://lifestyletoppings.com/wp-content/uploads/2023/04/Egg-Curry.jpg",
  },
  {
    id: "non9",
    name: "Chicken Shawarma",
    price: 179,
    desc: "Middle Eastern-style chicken wrap",
    img: "https://housing.com/news/wp-content/uploads/2023/12/Best-places-for-shawarma-in-Hyderabad-f.jpg",
  },
  {
    id: "non10",
    name: "Fish Curry",
    price: 239,
    desc: "Tangy fish curry with spices",
    img: "https://tse1.mm.bing.net/th/id/OIP.eQeca1oWmN4P9d7zTFctKwHaE8?r=0&w=1024&h=683&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: "non11",
    name: "Chicken Kebab",
    price: 219,
    desc: "Succulent chicken skewers grilled",
    img: "https://img.pikbest.com/wp/202343/delicious-chicken-shashlik-on-a-textured-gray-background-mouthwatering-culinary-concept_9981462.jpg!bw700",
  },
  {
    id: "non12",
    name: "Crab Masala",
    price: 289,
    desc: "Spicy crab cooked in masala",
    img: "https://chefdeenaskitchen.com/wp-content/uploads/2024/01/A7300343-1024x577.jpg",
  },
  {
    id: "non13",
    name: "Chicken Fried Rice",
    price: 169,
    desc: "Chinese-style rice with chicken",
    img: "https://static.vecteezy.com/system/resources/thumbnails/026/604/888/small_2x/nasi-goreng-indonesian-traditional-food-fried-rice-chicken-with-eggs-and-spicy-spices-by-frying-concept-by-ai-generated-free-photo.jpg",
  },
  {
    id: "non14",
    name: "Mutton Biryani",
    price: 289,
    desc: "Flavorful biryani with mutton",
    img: "https://img.freepik.com/premium-photo/mutton-biryani-with-biryani-masala-side_1169880-92382.jpg",
  },
  {
    id: "non15",
    name: "Tandoori Chicken",
    price: 259,
    desc: "Classic tandoor-roasted chicken",
    img: "https://img.freepik.com/premium-photo/sensory-delight-tandoori-chicken-s-smoky-essence-clay_818261-17963.jpg",
  },
];

export default function Veg() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [toast, setToast] = useState("");

  // Load items and likes from localStorage
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/menu/nonveg.json`);
        if (!alive) return;
        let arr = data ? (Array.isArray(data) ? data : Object.values(data)) : fallbackNonVegItems;
        // Load likes from localStorage
        const savedLikes = JSON.parse(localStorage.getItem("NonVegLikes") || "{}");
        arr = arr.map(item => ({
          ...item,
          likes: savedLikes[item.id] || 0,
        }));
        setItems(arr);
      } catch (e) {
        console.error("NonVeg fetch error:", e);
        const savedLikes = JSON.parse(localStorage.getItem("NonVegLikes") || "{}");
        const arr = fallbackNonVegItems.map(item => ({
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
    const savedLikes = JSON.parse(localStorage.getItem("NonVegLikes") || "{}");
    savedLikes[itemId] = (savedLikes[itemId] || 0) + 1;
    localStorage.setItem("NonVegLikes", JSON.stringify(savedLikes));
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
        <span className="ms-3">Loading non-veg dishes...</span>
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
            <h1 className="text-white fw-bold m-0">🍴 Non Veg Dishes</h1>
            <p className="text-white-50 m-0">15 varieties · Juicy · Flavorful</p>
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










// // ------------------ src/pages/NonVeg.jsx ------------------
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { FIREBASE_DB_URL } from "../firebase.js";
// import { useNavigate } from "react-router-dom";

// const BASE_URL = FIREBASE_DB_URL.replace(/\/$/, "");

// // Fallback 15 non-veg items
// const fallbackNonVegItems = [
//   {
//     id: "non1",
//     name: "Chicken Biryani",
//     price: 249,
//     desc: "Aromatic rice with tender chicken pieces",
//     img: "https://images.unsplash.com/photo-1601050690597-ffd02c7a72bc",
//   },
//   {
//     id: "non2",
//     name: "Butter Chicken",
//     price: 279,
//     desc: "Creamy tomato gravy with juicy chicken",
//     img: "https://images.unsplash.com/photo-1630323316548-cd10f83e5101",
//   },
//   {
//     id: "non3",
//     name: "Mutton Curry",
//     price: 299,
//     desc: "Slow-cooked mutton in spicy curry",
//     img: "https://images.unsplash.com/photo-1625944522966-6c9dc32d8a56",
//   },
//   {
//     id: "non4",
//     name: "Fish Fry",
//     price: 229,
//     desc: "Crispy fried fish with masala coating",
//     img: "https://images.unsplash.com/photo-1625944522856-b8d4f60f80e4",
//   },
//   {
//     id: "non5",
//     name: "Prawn Masala",
//     price: 269,
//     desc: "Juicy prawns in spicy onion-tomato masala",
//     img: "https://images.unsplash.com/photo-1625944523333-c9e05de7975c",
//   },
//   {
//     id: "non6",
//     name: "Chicken 65",
//     price: 199,
//     desc: "Spicy deep-fried chicken starter",
//     img: "https://images.unsplash.com/photo-1625944523947-62e8a52f4a4e",
//   },
//   {
//     id: "non7",
//     name: "Grilled Chicken",
//     price: 259,
//     desc: "Tandoor-grilled chicken with spices",
//     img: "https://images.unsplash.com/photo-1625944523495-4a63d9c1f7d1",
//   },
//   {
//     id: "non8",
//     name: "Egg Curry",
//     price: 149,
//     desc: "Boiled eggs in spicy curry gravy",
//     img: "https://images.unsplash.com/photo-1625944523387-bf587f7eecca",
//   },
//   {
//     id: "non9",
//     name: "Chicken Shawarma",
//     price: 179,
//     desc: "Middle Eastern-style chicken wrap",
//     img: "https://images.unsplash.com/photo-1625944523279-9483bfb5a77c",
//   },
//   {
//     id: "non10",
//     name: "Fish Curry",
//     price: 239,
//     desc: "Tangy fish curry with spices",
//     img: "https://images.unsplash.com/photo-1625944523165-3c73a5443d10",
//   },
//   {
//     id: "non11",
//     name: "Chicken Kebab",
//     price: 219,
//     desc: "Succulent chicken skewers grilled",
//     img: "https://images.unsplash.com/photo-1625944522953-4bff81ed07a6",
//   },
//   {
//     id: "non12",
//     name: "Crab Masala",
//     price: 289,
//     desc: "Spicy crab cooked in masala",
//     img: "https://images.unsplash.com/photo-1625944523672-1e5c8f3d14d1",
//   },
//   {
//     id: "non13",
//     name: "Chicken Fried Rice",
//     price: 169,
//     desc: "Chinese-style rice with chicken",
//     img: "https://images.unsplash.com/photo-1603133872519-67ff7edb7f84",
//   },
//   {
//     id: "non14",
//     name: "Mutton Biryani",
//     price: 289,
//     desc: "Flavorful biryani with mutton",
//     img: "https://images.unsplash.com/photo-1603133872759-ff7b90e1c2b7",
//   },
//   {
//     id: "non15",
//     name: "Tandoori Chicken",
//     price: 259,
//     desc: "Classic tandoor-roasted chicken",
//     img: "https://images.unsplash.com/photo-1625944523539-43e4417dbe09",
//   },
// ];

// export default function NonVeg() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hovered, setHovered] = useState(null);
//   const [toast, setToast] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     let alive = true;
//     (async () => {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/menu/nonveg.json`);
//         if (!alive) return;
//         if (data) {
//           const arr = Array.isArray(data) ? data : Object.values(data);
//           setItems(arr);
//         } else {
//           setItems(fallbackNonVegItems);
//         }
//       } catch (e) {
//         console.error("NonVeg fetch error:", e);
//         setItems(fallbackNonVegItems);
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

//     setToast(`${item.name} added to cart 🛒`);
//     setTimeout(() => setToast(""), 2500);
    
//     // alert(`${item.name} added to cart 🛒`);
//   };

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center text-white" style={{
//         background: "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0ea5e9 100%)",
//       }}>
//         <div className="spinner-border" role="status" />
//         <span className="ms-3">Loading non-veg dishes...</span>
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
//             <h1 className="text-white fw-bold m-0">Non-Veg Dishes</h1>
//             <p className="text-white-50 m-0">15 varieties · Juicy · Flavorful</p>
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
//           <p className="text-white-50 mb-1">Back to all categories</p>
//           <Link to="/menu" className="btn btn-outline-light">Back to Menu</Link>
//         </div>
//       </div>
//     </div>
//   );
// }
