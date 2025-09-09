import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://e-commerce-77db0-default-rtdb.firebaseio.com";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "" });

  const navigate = useNavigate();

  // 👉 Sign Out handler
  const handleSignout = () => {
    alert("👋 Signed out successfully!");
    navigate("/admin-login");
  };

  // Fetch users, orders, and menu
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Users
        const { data: usersData } = await axios.get(`${BASE_URL}/users.json`);
        setUsers(usersData ? Object.values(usersData) : []);

        // Orders
        const { data: ordersData } = await axios.get(`${BASE_URL}/orders.json`);
        setOrders(ordersData ? Object.values(ordersData) : []);

        // Menu items
        const { data: menuData } = await axios.get(`${BASE_URL}/menu.json`);
        setMenuItems(menuData ? Object.values(menuData) : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Add new menu item
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price || !newItem.category) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/menu.json`, newItem);
      setMenuItems([...menuItems, newItem]);
      alert("✅ Item added successfully!");
      setNewItem({ name: "", price: "", category: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add item");
    }
  };

  // Delete menu item
  const handleDeleteItem = async (name) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/menu.json`);
      if (data) {
        const entry = Object.entries(data).find(([_, item]) => item.name === name);
        if (entry) {
          await axios.delete(`${BASE_URL}/menu/${entry[0]}.json`);
          setMenuItems(menuItems.filter((item) => item.name !== name));
          alert("🗑️ Item deleted successfully!");
        }
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete item");
    }
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #22c55e 100%)",
      }}
    >
      <div className="container text-white">
        {/* Dashboard Header with Sign Out */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">⚙️ Admin Dashboard</h1>
          <button className="btn btn-danger" onClick={handleSignout}>
            🚪 Sign Out
          </button>
        </div>

        {/* Users */}
        <div className="card shadow-lg border-0 rounded-4 mb-5">
          <div className="card-body">
            <h4 className="fw-semibold mb-3">👥 Registered Users</h4>
            {users.length > 0 ? (
              <ul className="list-group">
                {users.map((user, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between">
                    <span>
                      {user.name} ({user.email})
                    </span>
                    <small className="text-muted">{user.address}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found</p>
            )}
          </div>
        </div>

        {/* Orders */}
        <div className="card shadow-lg border-0 rounded-4 mb-5">
          <div className="card-body">
            <h4 className="fw-semibold mb-3">📦 Orders</h4>
            {orders.length > 0 ? (
              <ul className="list-group">
                {orders.map((order, i) => (
                  <li key={i} className="list-group-item">
                    <strong>{order.customer}</strong> ordered {order.items?.length || 0} items
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found</p>
            )}
          </div>
        </div>

        {/* Menu Management */}
        <div className="card shadow-lg border-0 rounded-4 mb-5">
          <div className="card-body">
            <h4 className="fw-semibold mb-3">🍽️ Manage Menu</h4>

            {/* Add Item */}
            <form className="row g-3 mb-4" onSubmit={handleAddItem}>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                  <option value="">Category</option>
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                  <option value="dessert">Dessert</option>
                  <option value="juice">Juice</option>
                  <option value="combo">Combo</option>
                </select>
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-success w-100">
                  ➕ Add
                </button>
              </div>
            </form>

            {/* Item List */}
            {menuItems.length > 0 ? (
              <ul className="list-group">
                {menuItems.map((item, i) => (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {item.name} - ₹{item.price} ({item.category})
                    </span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteItem(item.name)}
                    >
                      ❌ Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No menu items found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}










// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const BASE_URL = "https://e-commerce-77db0-default-rtdb.firebaseio.com";

// export default function Admin() {
//   const [users, setUsers] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [newItem, setNewItem] = useState({ name: "", price: "", category: "" });
  

//   // Fetch users, orders, and menu
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Users
//         const { data: usersData } = await axios.get(`${BASE_URL}/users.json`);
//         setUsers(usersData ? Object.values(usersData) : []);

//         // Orders
//         const { data: ordersData } = await axios.get(`${BASE_URL}/orders.json`);
//         setOrders(ordersData ? Object.values(ordersData) : []);

//         // Menu items
//         const { data: menuData } = await axios.get(`${BASE_URL}/menu.json`);
//         setMenuItems(menuData ? Object.values(menuData) : []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, []);

//   // Add new menu item
//   const handleAddItem = async (e) => {
//     e.preventDefault();
//     if (!newItem.name || !newItem.price || !newItem.category) {
//       alert("⚠️ Please fill all fields");
//       return;
//     }

//     try {
//       await axios.post(`${BASE_URL}/menu.json`, newItem);
//       setMenuItems([...menuItems, newItem]);
//       alert("✅ Item added successfully!");
//       setNewItem({ name: "", price: "", category: "" });
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to add item");
//     }
//   };

//   // Delete menu item
//   const handleDeleteItem = async (name) => {
//     try {
//       // Firebase doesn't give id in Object.values → need to match manually
//       const { data } = await axios.get(`${BASE_URL}/menu.json`);
//       if (data) {
//         const entry = Object.entries(data).find(([_, item]) => item.name === name);
//         if (entry) {
//           await axios.delete(`${BASE_URL}/menu/${entry[0]}.json`);
//           setMenuItems(menuItems.filter((item) => item.name !== name));
//           alert("🗑️ Item deleted successfully!");
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to delete item");
//     }
//   };

//   return (
//     <div
//       className="min-vh-100 py-5"
//       style={{
//         background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #22c55e 100%)",
//       }}
//     >
//       <div className="container text-white">
//         <h1 className="fw-bold text-center mb-5">⚙️ Admin Dashboard</h1>

//         {/* Users */}
//         <div className="card shadow-lg border-0 rounded-4 mb-5">
//           <div className="card-body">
//             <h4 className="fw-semibold mb-3">👥 Registered Users</h4>
//             {users.length > 0 ? (
//               <ul className="list-group">
//                 {users.map((user, i) => (
//                   <li key={i} className="list-group-item d-flex justify-content-between">
//                     <span>
//                       {user.name} ({user.email})
//                     </span>
//                     <small className="text-muted">{user.address}</small>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No users found</p>
//             )}
//           </div>
//         </div>

//         {/* Orders */}
//         <div className="card shadow-lg border-0 rounded-4 mb-5">
//           <div className="card-body">
//             <h4 className="fw-semibold mb-3">📦 Orders</h4>
//             {orders.length > 0 ? (
//               <ul className="list-group">
//                 {orders.map((order, i) => (
//                   <li key={i} className="list-group-item">
//                     <strong>{order.customer}</strong> ordered {order.items?.length || 0} items
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No orders found</p>
//             )}
//           </div>
//         </div>

//         {/* Menu Management */}
//         <div className="card shadow-lg border-0 rounded-4 mb-5">
//           <div className="card-body">
//             <h4 className="fw-semibold mb-3">🍽️ Manage Menu</h4>

//             {/* Add Item */}
//             <form className="row g-3 mb-4" onSubmit={handleAddItem}>
//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Item Name"
//                   value={newItem.name}
//                   onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//                 />
//               </div>
//               <div className="col-md-3">
//                 <input
//                   type="number"
//                   className="form-control"
//                   placeholder="Price"
//                   value={newItem.price}
//                   onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
//                 />
//               </div>
//               <div className="col-md-3">
//                 <select
//                   className="form-select"
//                   value={newItem.category}
//                   onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//                 >
//                   <option value="">Category</option>
//                   <option value="veg">Veg</option>
//                   <option value="nonveg">Non-Veg</option>
//                   <option value="dessert">Dessert</option>
//                   <option value="juice">Juice</option>
//                   <option value="combo">Combo</option>
//                 </select>
//               </div>
//               <div className="col-md-2">
//                 <button type="submit" className="btn btn-success w-100">
//                   ➕ Add
//                 </button>
//               </div>
//             </form>

//             {/* Item List */}
//             {menuItems.length > 0 ? (
//               <ul className="list-group">
//                 {menuItems.map((item, i) => (
//                   <li
//                     key={i}
//                     className="list-group-item d-flex justify-content-between align-items-center"
//                   >
//                     <span>
//                       {item.name} - ₹{item.price} ({item.category})
//                     </span>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleDeleteItem(item.name)}
//                     >
//                       ❌ Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No menu items found</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
