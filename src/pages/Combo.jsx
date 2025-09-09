// ------------------ src/pages/Combo.jsx ------------------
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FIREBASE_DB_URL } from "../firebase.js";
import { useNavigate } from "react-router-dom";

const BASE_URL = FIREBASE_DB_URL.replace(/\/$/, "");

const fallbackComboItems = [
  {
    id: "co1",
    name: "Veg Combo Delight",
    price: 250,
    description: "Paneer butter masala with sweet Gulab Jamun and Mango Shake",
    images: [
      "https://tse1.mm.bing.net/th/id/OIP.fgEb3K-H9k8ovUMpQhnQxgHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://img.freepik.com/premium-photo/tasty-gulab-jamuns-white-background_787273-3418.jpg",
      "https://img.freepik.com/premium-photo/mango-smoothie-dark-background_582637-7662.jpg"
    ]
  },
  {
    id: "co2",
    name: "South Indian Veg Combo",
    price: 220,
    description: "Masala Dosa with Carrot Halwa and Coconut Water",
    images: [
      "https://images.news18.com/ibnkhabar/uploads/2021/08/masala-dosa-recipe.jpg",
      "https://www.ruchikrandhap.com/wp-content/uploads/2010/03/Gajar-Ka-Halwa_1.jpg",
      "https://img.freepik.com/premium-photo/coconut-water-fresh-cocktail-natural-coconut_786587-404.jpg"
    ]
  },
  {
    id: "co3",
    name: "Non-Veg Combo Feast",
    price: 350,
    description: "Chicken biryani with yummy Rasmalai and Lemon Mint Cooler",
    images: [
      "https://img.freepik.com/premium-photo/indian-chicken-biryani-bowl_1045959-2177.jpg",
      "https://th.bing.com/th/id/R.f5f842cb91597146df97a40f962fa699?rik=Ovkff7B2O5HSTA&riu=http%3a%2f%2fwww.rachnas-kitchen.com%2fwp-content%2fuploads%2f2016%2f02%2fimage-4.jpeg&ehk=RrNlaewVhN38uYqx70k0WkNrcx3RyP%2fJzrFRJ76PQP8%3d&risl=&pid=ImgRaw&r=0",
      "https://image.freepik.com/free-photo/refreshing-mojito-with-lime-mint-ice-glass_275899-968.jpg"
    ]
  },
  {
    id: "co4",
    name: "BBQ Chicken Combo",
    price: 380,
    description: "Grilled chicken with Chocolate Brownie and Cold Coffee",
    images: [
      "https://img.freepik.com/premium-photo/grilled-chicken-wings-barbecue-grill-with-flames-smokegenerative-ai_221128-10158.jpg",
      "https://tse3.mm.bing.net/th/id/OIP.cA1m1gjR3AQ4JxbsyFwuUwHaE7?r=0&w=626&h=417&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://coffeemodern.com/wp-content/uploads/2021/12/F1-2.jpg"
    ]
  },
  {
    id: "co5",
    name: "Royal Veg Combo",
    price: 280,
    description: "Veg biryani with Black Forest Cake and Strawberry Shake",
    images: [
      "https://media.istockphoto.com/id/1363306860/photo/veg-biryani.jpg?s=612x612&w=0&k=20&c=HCRg_H6VqfL07tF7RYDXedJrjQyqQsUtGiaSF_4L8Yw=",
      "https://img.freepik.com/premium-photo/chocolate-cake-with-cherry-generative-ai-content_959800-1547.jpg",
      "https://img.freepik.com/premium-photo/glass-strawberry-smoothie-bowl-strawberries_865967-141226.jpg"
    ]
  },
  {
    id: "co6",
    name: "Mutton Combo Special",
    price: 420,
    description: "Mutton curry with Mango Mousse and Mixed Fruit Juice",
    images: [
      "https://im.whatshot.in/img/2022/Apr/prchi-palwe-3omlwzkkt0y-unsplash-cropped-1-1649339020-1649402982.jpg",
      "https://static.vecteezy.com/system/resources/thumbnails/029/857/205/small_2x/of-mango-mousse-as-a-dish-in-a-high-end-restaurant-generative-ai-photo.jpg",
      "https://img.freepik.com/premium-photo/mixed-berry-smoothie-with-spinach-photo-realistic-still-life-photo-overhead-shot-ai-generated_29654-4052.jpg"
    ]
  },
  {
    id: "co7",
    name: "Paneer Tikka Combo",
    price: 280,
    description: "Paneer tikka with Tiramisu and Mango Shake.",
    images: [
      "https://tse2.mm.bing.net/th/id/OIP.-ndMbbnDa5vPzgLYrBbLMgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://static.vecteezy.com/system/resources/previews/033/790/663/non_2x/a-slice-of-tiramisu-on-a-plate-with-coffee-and-nuts-ai-generated-photo.jpg",
      "https://img.freepik.com/premium-photo/mango-smoothie-dark-background_582637-7662.jpg"
    ]
  },
  {
    id: "co8",
    name: "Chole Bhature Combo",
    price: 240,
    description: "Chole bhature with Vanilla Ice Cream and Pineapple Juice.",
    images: [
      "https://i.cdn.newsbytesapp.com/images/l24220240122105227.jpeg",
      "https://th.bing.com/th/id/R.a292c98c23776a2a09a7ca6ebfa75e76?rik=SOQ345dwv0okHg&riu=http%3a%2f%2fwww.baltana.com%2ffiles%2fwallpapers-18%2fVanilla-Ice-Cream-Wallpaper-HD-46971.jpg&ehk=VP6577j6suKHgUjMfCQbLCgkJNeBVXneq91i5ChFEBQ%3d&risl=&pid=ImgRaw&r=0",
      "https://img.freepik.com/premium-photo/glass-pineapple-juice-with-fresh-background_564992-531.jpg"
    ]
  },
  {
    id: "co9",
    name: "Butter Chicken Combo",
    price: 320,
    description: "Butter chicken with Panna Cotta and Apple Juice.",
    images: [
      "https://img.freepik.com/premium-photo/compilation-mouthwatering-butter-chicken-images-stock-photo-portfolio_198067-493824.jpg",
      "https://i.pinimg.com/originals/8e/95/5d/8e955dfd648d8bd9e68a782cca3fee67.jpg",
      "https://static.vecteezy.com/system/resources/previews/030/623/981/non_2x/apple-juice-image-hd-free-photo.jpg"
    ]
  },
  {
    id: "co10",
    name: "Fish Fry Combo",
    price: 350,
    description: "Fish fry with Strawberry Cheesecake and Tender Lime Soda.",
    images: [
      "https://as1.ftcdn.net/v2/jpg/04/64/44/30/1000_F_464443092_bG4XIDtAyJwLk3HQeoK096on3BuTFIWW.jpg",
      "https://i.pinimg.com/originals/69/51/8b/69518b319eece273857ba83595b9f56b.jpg",
      "https://tse1.mm.bing.net/th/id/OIP.lSEAqHZATOmHSPyS7h0NeAHaE7?r=0&w=626&h=417&rs=1&pid=ImgDetMain&o=7&rm=3"
    ]
  },
  {
    id: "co11",
    name: "Egg Curry Combo",
    price: 240,
    description: "Egg curry with Apple Pie and Grape Juice.",
    images: [
      "https://lifestyletoppings.com/wp-content/uploads/2023/04/Egg-Curry.jpg",
      "https://cdn.pixabay.com/photo/2022/10/13/21/12/apple-pie-7519981_1280.jpg",
      "https://img.freepik.com/premium-photo/grape-juice-clear-glass_1234738-201630.jpg"
    ]
  },
  {
    id: "co12",
    name: "Palak Paneer Combo",
    price: 230,
    description: "Palak Paneer and Fruit Salad with Ice Cream then Orange Juice.",
    images: [
      "https://img.freepik.com/premium-photo/palak-paneer-delight_729149-8270.jpg",
      "https://img.freepik.com/premium-photo/delicious-fruit-salad-glass-with-ice-cream_841543-18533.jpg",
      "https://static.vecteezy.com/system/resources/previews/030/273/762/large_2x/the-benefits-of-drinking-orange-juice-ai-generated-free-photo.jpg"
    ]
  },
  {
    id: "co13",
    name: "Aloo Paratha Combo",
    price: 199,
    description: "Aloo Paratha with Donut and Banana Shake",
    images: [
      "https://t4.ftcdn.net/jpg/06/68/58/61/360_F_668586164_V1Q1L8ChxDSVc9d0QbFZk1wfylNmV83p.jpg",
      "https://cdn.pixabay.com/photo/2023/04/15/11/58/donuts-7927510_1280.jpg",
      "https://i.ytimg.com/vi/BDoW40Basfs/maxresdefault.jpg"
    ]
  },
  {
    id: "co14",
    name: "Prawn Masala Combo",
    price: 429,
    description: "Prawn Masala with Kesar Kulfi and Kiwi Juice",
    images: [
      "https://img.freepik.com/premium-photo/plate-prawns-with-red-sauce-chilies-black-background_398492-4378.jpg",
      "https://cdn.mygingergarlickitchen.com/images/800px/800px-how-to-make-mango-kulfi-recipe-video-anupama-paliwal-my-ginger-garlic-kitchen-12.jpg",
      "https://weirdsmoothies.com/wp-content/uploads/2024/01/image-212-1024x702.jpeg"
    ]
  },
  {
    id: "co15",
    name: "Mutton Biryani Combo",
    price: 499,
    description: "Mutton Biryani with Chocolate Lava Cake and Watermelon Juice",
    images: [
      "https://img.freepik.com/premium-photo/mutton-biryani-with-biryani-masala-side_1169880-92382.jpg",
      "https://img.freepik.com/premium-photo/rich-chocolate-lava-cake-with-molten-center_1169880-61905.jpg",
      "https://img.freepik.com/premium-photo/cup-watermelon-juice-with-splash-black-reflective-studio-background_762785-122009.jpg"
    ]
  }
];

export default function Combo() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  // Load items and likes from localStorage
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/menu/combo.json`);
        if (!alive) return;
        let arr = data ? (Array.isArray(data) ? data : Object.values(data)) : fallbackComboItems;
        // Load likes from localStorage
        const savedLikes = JSON.parse(localStorage.getItem("ComboLikes") || "{}");
        arr = arr.map(item => ({
          ...item,
          likes: savedLikes[item.id] || 0,
        }));
        setItems(arr);
      } catch (e) {
        console.error("Combo fetch error:", e);
        const savedLikes = JSON.parse(localStorage.getItem("ComboLikes") || "{}");
        const arr = fallbackComboItems.map(item => ({
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
    const savedLikes = JSON.parse(localStorage.getItem("ComboLikes") || "{}");
    savedLikes[itemId] = (savedLikes[itemId] || 0) + 1;
    localStorage.setItem("ComboLikes", JSON.stringify(savedLikes));
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
        <span className="ms-3">Loading Combo dishes...</span>
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
        <div className="d-flex justify-content-between align-items-end flex-wrap mb-4">
          <div>
            <h1 className="text-white fw-bold m-0">🥗🍹 Combo Offers</h1>
            <p className="text-white-50 m-0">
              Perfect meal packs with dessert & juice included!
            </p>
          </div>
          <Link
            to="/checkout"
            className="btn btn-light fw-semibold shadow-sm px-4 py-2"
          >
            Go to Checkout
          </Link>
        </div>

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
                {/* Carousel */}
                <div
                  id={`carousel${item.id}`}
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {item.images.map((image, idx) => (
                      <div
                        key={idx}
                        className={`carousel-item ${idx === 0 ? "active" : ""}`}
                      >
                        <img
                          src={image}
                          className="d-block w-100"
                          alt={item.name}
                          style={{ height: 220, objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#carousel${item.id}`}
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#carousel${item.id}`}
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>

                <div className="card-body bg-dark text-white d-flex flex-column">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <p className="card-text text-white-50 small flex-grow-1">
                    {item.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="badge bg-success fs-6">₹{item.price}</span>
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

        <div className="text-center mt-5">
          <p className="text-white-50 mb-1">Want more options?</p>
          <Link to="/menu" className="btn btn-outline-light px-4 py-2">
            Back to Menu
          </Link>
        </div>
      </div>

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










// ------------------ src/pages/Combo.jsx ------------------
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { FIREBASE_DB_URL } from "../firebase.js";
// import { useNavigate } from "react-router-dom";

// const BASE_URL = FIREBASE_DB_URL.replace(/\/$/, "");

// const fallbackComboItems = [
//   {
//     id: "co1",
//     name: "Veg Combo Delight",
//     price: 250,
//     description: "Paneer butter masala + Gulab Jamun + Mango Shake",
//     image: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
//   },
//   {
//     id: "co2",
//     name: "South Indian Veg Combo",
//     price: 220,
//     description: "Idli & Dosa + Carrot Halwa + Filter Coffee",
//     image: "https://images.unsplash.com/photo-1617191519105-d87c0bbd10b6",
//   },
//   {
//     id: "co3",
//     name: "Non-Veg Combo Feast",
//     price: 350,
//     description: "Chicken biryani + Rasmalai + Fresh Lime Soda",
//     image: "https://images.unsplash.com/photo-1603133872878-684f4111e243",
//   },
//   {
//     id: "co4",
//     name: "BBQ Chicken Combo",
//     price: 380,
//     description: "Grilled chicken + Chocolate Brownie + Cold Coffee",
//     image: "https://images.unsplash.com/photo-1604909053195-9f6e6bb6a6c8",
//   },
//   {
//     id: "co5",
//     name: "Royal Veg Combo",
//     price: 280,
//     description: "Veg biryani + Black Forest Cake + Strawberry Shake",
//     image: "https://images.unsplash.com/photo-1603022202744-3a4509d14e06",
//   },
//   {
//     id: "co6",
//     name: "Mutton Combo Special",
//     price: 420,
//     description: "Mutton curry + Rasgulla + Pomegranate Juice",
//     image: "https://images.unsplash.com/photo-1603133872878-684f4111e243",
//   },
//   {
//     id: "co7",
//     name: "Paneer Butter Masala Combo",
//     price: 280,
//     description: "Paneer butter masala + naan + rasmalai + mango juice.",
//     image: "https://images.unsplash.com/photo-1622445272395-5e4d2ff6b6d7",
//   },
//   {
//     id: "co8",
//     name: "Chole Bhature Combo",
//     price: 240,
//     description: "Chole bhature + jalebi + sweet lassi.",
//     image: "https://images.unsplash.com/photo-1601050690597-1a0212a64a81",
//   },
//   {
//     id: "co9",
//     name: "Butter Chicken Combo",
//     price: 320,
//     description: "Butter chicken + naan + rasgulla + mango lassi.",
//     image: "https://images.unsplash.com/photo-1598514982264-dbbdbb5c1d68",
//   },
//   {
//     id: "co10",
//     name: "Fish Fry Combo",
//     price: 350,
//     description: "Fish fry + rice + rasmalai + lime soda.",
//     image: "https://images.unsplash.com/photo-1589307003381-1d77cf5f3f8c",
//   },
//   {
//     id: "co11",
//     name: "Egg Curry Combo",
//     price: 240,
//     description: "Egg curry + rice + jalebi + lemon soda.",
//     image: "https://images.unsplash.com/photo-1617196038530-47e9c7b3c6ad",
//   },
//   {
//     id: "co12",
//     name: "Veg Fried Rice Combo",
//     price: 230,
//     description: "Veg fried rice + manchurian + brownie + orange juice.",
//     image: "https://images.unsplash.com/photo-1604908176792-b8b9d5a3e3b6",
//   },
//   {
//     id: "co13",
//     name: "Aloo Paratha Combo",
//     price: 199,
//     description: "Aloo Paratha + Kheer + Buttermilk",
//     image: "https://images.unsplash.com/photo-1627308595378-3caa9c7a3b3e",
//   },
//   {
//     id: "co14",
//     name: "Prawn Masala Combo",
//     price: 429,
//     description: "Prawn Masala + Ice Cream Sundae + Mango Juice",
//     image: "https://images.unsplash.com/photo-1626074386425-6d8e86d51a09",
//   },
//   {
//     id: "co15",
//     name: "Biryani Combo",
//     price: 499,
//     description: "Biryani + Gulab Jamun + Sweet Lassi",
//     image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
//   }
// ];

// export default function Combo() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hovered, setHovered] = useState(null);
//   const [toast, setToast] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     let alive = true;
//     (async () => {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/menu/combo.json`);
//         if (!alive) return;
//         if (data) {
//           const arr = Array.isArray(data) ? data : Object.values(data);
//           setItems(arr);
//         } else {
//           setItems(fallbackComboItems);
//         }
//       } catch (e) {
//         console.error("Combo fetch error:", e);
//         setItems(fallbackComboItems);
//       } finally {
//         if (alive) setLoading(false);
//       }
//     })();
//     return () => {
//       alive = false;
//     };
//   }, []);

//   // ✅ Add to cart with qty support
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

//     // Redirect to checkout
//     // navigate("/checkout");
//   };

//   if (loading) {
//     return (
//       <div
//         className="min-vh-100 d-flex align-items-center justify-content-center text-white"
//         style={{
//           background:
//             "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0ea5e9 100%)",
//         }}
//       >
//         <div className="spinner-border" role="status" />
//         <span className="ms-3">Loading Combo dishes...</span>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-vh-100 py-5"
//       style={{
//         background:
//           "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0ea5e9 100%)",
//       }}
//     >
//       <div className="container">
//         {/* Header */}
//         <div className="d-flex justify-content-between align-items-end flex-wrap mb-4">
//           <div>
//             <h1 className="text-white fw-bold m-0">🥗🍹 Combo Offers</h1>
//             <p className="text-white-50 m-0">Perfect meal packs with dessert & juice included!</p>
//           </div>
//           <Link
//             to="/checkout"
//             className="btn btn-light fw-semibold shadow-sm px-4 py-2"
//           >
//             Go to Checkout
//           </Link>
//         </div>

//         {/* Grid */}
//         <div className="row g-4">
//           {items.map((item) => (
//             <div key={item.id} className="col-12 col-sm-6 col-lg-4">
//               <div
//                 className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden"
//                 onMouseEnter={() => setHovered(item.id)}
//                 onMouseLeave={() => setHovered(null)}
//                 style={{
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                   transform:
//                     hovered === item.id ? "translateY(-8px) scale(1.03)" : "none",
//                   boxShadow:
//                     hovered === item.id
//                       ? "0 8px 25px rgba(0,0,0,0.4)"
//                       : "0 4px 12px rgba(0,0,0,0.2)",
//                 }}
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="card-img-top"
//                   style={{ height: 220, objectFit: "cover" }}
//                 />
//                 <div className="card-body bg-dark text-white d-flex flex-column">
//                   <h5 className="card-title fw-bold">{item.name}</h5>
//                   <p className="card-text text-white-50 small flex-grow-1">
//                     {item.description}
//                   </p>
//                   <div className="d-flex justify-content-between align-items-center mt-2">
//                     <span className="badge bg-success fs-6">
//                       ₹{item.price}
//                     </span>
//                     <button
//                       className="btn btn-sm btn-warning fw-semibold text-dark"
//                       onClick={() => addToCart(item)}
//                     >
//                       + Add
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Back */}
//         <div className="text-center mt-5">
//           <p className="text-white-50 mb-1">Want more options?</p>
//           <Link to="/menu" className="btn btn-outline-light px-4 py-2">
//             Back to Menu
//           </Link>
//         </div>
//       </div>

//       {/* ✅ Toast */}
//       {toast && (
//         <div
//           className="position-fixed bottom-0 end-0 m-3 p-3 bg-success text-white rounded shadow"
//           style={{ zIndex: 9999 }}
//         >
//           {toast}
//         </div>
//       )}
//     </div>
//   );
// }









// // ------------------ src/pages/Combo.jsx ------------------
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const BASE_URL = "https://e-commerce-77db0-default-rtdb.firebaseio.com";

// export default function Combo() {
//   const [combos, setCombos] = useState([]);

//   // Load from Firebase or fallback
//   useEffect(() => {
//     async function fetchCombos() {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/menu/combos.json`);
//         if (data) {
//           setCombos(Object.values(data));
//         } else {
//           setCombos(defaultCombos);
//         }
//       } catch (err) {
//         console.error(err);
//         setCombos(defaultCombos);
//       }
//     }
//     fetchCombos();
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
//         background: "linear-gradient(135deg, #7c2d12 0%, #ea580c 35%, #fbbf24 100%)",
//       }}
//     >
//       <div className="container">
//         <h1 className="fw-bold text-center text-white mb-4">🥗🍹 Combo Offers</h1>
//         <p className="text-center text-white-50 mb-5">
//           Perfect meal packs with dessert & juice included!
//         </p>

//         <div className="row g-4">
//           {combos.map((item, i) => (
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

// const defaultCombos = [
//   {
//     name: "Veg Combo Delight",
//     price: 250,
//     description: "Paneer butter masala + Gulab Jamun + Mango Shake",
//     image: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
//   },
//   {
//     name: "South Indian Veg Combo",
//     price: 220,
//     description: "Idli & Dosa + Carrot Halwa + Filter Coffee",
//     image: "https://images.unsplash.com/photo-1617191519105-d87c0bbd10b6",
//   },
//   {
//     name: "Non-Veg Combo Feast",
//     price: 350,
//     description: "Chicken biryani + Rasmalai + Fresh Lime Soda",
//     image: "https://images.unsplash.com/photo-1603133872878-684f4111e243",
//   },
//   {
//     name: "BBQ Chicken Combo",
//     price: 380,
//     description: "Grilled chicken + Chocolate Brownie + Cold Coffee",
//     image: "https://images.unsplash.com/photo-1604909053195-9f6e6bb6a6c8",
//   },
//   {
//     name: "Royal Veg Combo",
//     price: 280,
//     description: "Veg biryani + Black Forest Cake + Strawberry Shake",
//     image: "https://images.unsplash.com/photo-1603022202744-3a4509d14e06",
//   },
//   {
//     name: "Mutton Combo Special",
//     price: 420,
//     description: "Mutton curry + Rasgulla + Pomegranate Juice",
//     image: "https://images.unsplash.com/photo-1603133872878-684f4111e243",
//   },
// ];
