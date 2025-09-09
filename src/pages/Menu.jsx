// ------------------ src/pages/Menu.jsx ------------------
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  const categories = [
    {
      key: "veg",
      name: "Veg Dishes",
      path: "/menu/veg",
      img: "https://img.freepik.com/premium-photo/indian-state-food_940863-2344.jpg",
    },
    {
      key: "nonveg",
      name: "Non-Veg Dishes",
      path: "/menu/nonveg",
      img: "https://img.freepik.com/premium-photo/tandoori-chicken-indian-food-photography_1037600-169.jpg",
    },
    {
      key: "dessert",
      name: "Desserts",
      path: "/menu/dessert",
      img: "https://img.freepik.com/premium-photo/closeup-photo-delicious-set-desserts-with-fruits-restaurant-background-high-quality_599292-2594.jpg",
    },
    {
      key: "juice",
      name: "Refreshing Juices",
      path: "/menu/juice",
      img: "https://img.freepik.com/premium-photo/berries-juice-with-restaurant-background_741910-11947.jpg",
    },
    {
      key: "combo",
      name: "Combo Offers",
      path: "/menu/combo",
      img: "https://img.freepik.com/premium-photo/indian-cuisine-food-table-restaurant_663838-132.jpg?w=740",
    },
  ];

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0ea5e9 100%)",
      }}
    >
      <div className="container text-center">
        <h1 className="fw-bold text-white mb-4">🍽️ Explore Our Menu</h1>
        <p className="text-white-50 mb-5">
          Choose from our wide range of dishes and satisfy your cravings.
        </p>

        <div className="row g-4">
          {categories.map((cat) => (
            <div key={cat.key} className="col-12 col-md-6 col-lg-4">
              <div
                className="card shadow-lg border-0 rounded-4 overflow-hidden h-100"
                style={{ cursor: "pointer", transition: "transform 0.3s" }}
                onClick={() => navigate(cat.path)} // ✅ navigate properly here
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body bg-dark text-white">
                  <h4 className="card-title fw-bold">{cat.name}</h4>
                  <p className="card-text text-white-50">
                    Tap to explore {cat.name.toLowerCase()}.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}










// // ------------------ src/pages/Menu.jsx ------------------
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function Menu() {
  
//   const navigate = useNavigate();

//   const categories = [
//     {
//       key: "veg",
//       name: "Veg Dishes",
//       img: "https://images.unsplash.com/photo-1604909053195-9f6e6bb6a6c8",
//     },
//     {
//       key: "nonveg",
//       name: "Non-Veg Dishes",
//       img: "https://images.unsplash.com/photo-1603133872878-684f4111e243",
//     },
//     {
//       key: "dessert",
//       name: "Desserts",
//       img: "https://images.unsplash.com/photo-1601979031896-6f3b90c9c9f6",
//     },
//     {
//       key: "juice",
//       name: "Refreshing Juices",
//       img: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
//     },
//     {
//       key: "combo",
//       name: "Combo Offers",
//       img: "https://images.unsplash.com/photo-1601924582971-bff2e9be1a82",
//     },
//   ];

//   // Example dishes for each category
//   const dishes = {
//     veg: navigate("/veg"),
        
//     nonveg: navigate("/nonveg"),
    
//     dessert: navigate("/dessert"),
    
//     juice: navigate("/juice"),

//     combo: navigate("/combo"),
//   };

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedDish, setSelectedDish] = useState(null);

//   return (
//     <div
//       className="min-vh-100 py-5"
//       style={{
//         background: "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0ea5e9 100%)",
//       }}
//     >
//       <div className="container text-center">
//         {/* Title */}
//         <h1 className="fw-bold text-white mb-4">🍽️ Explore Our Menu</h1>
//         <p className="text-white-50 mb-5">
//           Choose from our wide range of dishes and satisfy your cravings.
//         </p>

//         {/* If no category selected → show categories */}
//         {!selectedCategory && (
//           <div className="row g-4">
//             {categories.map((cat) => (
//               <div key={cat.key} className="col-12 col-md-6 col-lg-4">
//                 <div
//                   className="card shadow-lg border-0 rounded-4 overflow-hidden h-100"
//                   style={{ cursor: "pointer", transition: "transform 0.3s" }}
//                   onClick={() => setSelectedCategory(cat.key)}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.transform = "scale(1.05)")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.transform = "scale(1)")
//                   }
//                 >
//                   <img
//                     src={cat.img}
//                     alt={cat.name}
//                     className="card-img-top"
//                     style={{ height: "220px", objectFit: "cover" }}
//                   />
//                   <div className="card-body bg-dark text-white">
//                     <h4 className="card-title fw-bold">{cat.name}</h4>
//                     <p className="card-text text-white-50">
//                       Tap to explore {cat.name.toLowerCase()}.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* If category selected → show dishes */}
//         {selectedCategory && (
//           <div>
//             <button
//               className="btn btn-outline-light mb-4"
//               onClick={() => setSelectedCategory(null)}
//             >
//               ⬅ Back to Categories
//             </button>
//             <div className="row g-4">
//               {dishes[selectedCategory].map((dish, i) => (
//                 <div key={i} className="col-md-4">
//                   <div
//                     className="card shadow-sm border-0 h-100 dish-card"
//                     style={{
//                       cursor: "pointer",
//                       transition: "transform 0.3s, box-shadow 0.3s",
//                     }}
//                     onClick={() => setSelectedDish(dish)}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "scale(1.05)";
//                       e.currentTarget.style.boxShadow =
//                         "0 8px 20px rgba(0,0,0,0.3)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "scale(1)";
//                       e.currentTarget.style.boxShadow = "none";
//                     }}
//                   >
//                     <img
//                       src={dish.img}
//                       className="card-img-top"
//                       alt={dish.name}
//                       style={{ height: "200px", objectFit: "cover" }}
//                     />
//                     <div className="card-body bg-dark text-white">
//                       <h5 className="card-title">{dish.name}</h5>
//                       <p className="card-text text-success fw-bold">
//                         ₹{dish.price}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Dish detail popup */}
//         {selectedDish && (
//           <div
//             className="modal fade show d-block"
//             style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
//           >
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">{selectedDish.name}</h5>
//                   <button
//                     className="btn-close"
//                     onClick={() => setSelectedDish(null)}
//                   ></button>
//                 </div>
//                 <div className="modal-body text-center">
//                   <img
//                     src={selectedDish.img}
//                     alt={selectedDish.name}
//                     className="img-fluid rounded mb-3"
//                   />
//                   <h5 className="fw-bold text-success">₹{selectedDish.price}</h5>
//                   <p className="text-muted">
//                     Delicious {selectedDish.name}, freshly prepared for you.
//                   </p>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setSelectedDish(null)}
//                   >
//                     Close
//                   </button>
//                   <button className="btn btn-success">🛒 Add to Cart</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
