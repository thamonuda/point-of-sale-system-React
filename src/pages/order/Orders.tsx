import axios from "axios";
import { useEffect, useState } from "react";
import OrdersType from "../../types/OrdersType";
import tkLogo from "../../photos/tkLogo.jpg";
import { useAuth } from "../../context/AuthContext";

function Orders() {

  const {isAuthenticated,jwtToken} = useAuth();

  const [expandedOrders, setExpandedOrders] = useState<{ [key: number]: boolean }>({});
  const [orders, setOrders] = useState<OrdersType[]>([]);

  const config = {
    headers: {
        Authorization: `Bearer ${jwtToken}`
    }
}


  async function loadOrders() {
    try {
      console.log(config);
      const response = await axios.get("http://localhost:9002/order",config);
      console.log("Orders loaded:", response.data); // Debugging log
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  }

  useEffect(() => {
    if(isAuthenticated){
    loadOrders();
    }
  }, [isAuthenticated]);

  // Function to toggle the expanded state of a specific order
  function toggleExpand(orderId: number) {
    setExpandedOrders((prevExpandedOrders) => ({
      ...prevExpandedOrders,
      [orderId]: !prevExpandedOrders[orderId],
    }));
  }

  return (
    <div className="font-sans antialiased bg-gradient-to-r from-green-100 to-blue-100">
    <div className="flex h-screen">
      <nav className="w-64 bg-[#d1fae5] text-gray-800 p-5 shadow-2xl rounded-r-3xl fixed h-full">
        <div className="flex items-center mb-5">
          <img src={tkLogo} alt="Logo" className="w-12 h-12 rounded-full" />
          <h2 className="text-3xl font-bold text-teal-700 ml-3">Dashboard</h2>
        </div>
        <ul className="space-y-8">
          {[
            { href: "/", label: "Home", icon: "fas fa-tags" },
            { href: "/category", label: "Categories", icon: "fas fa-box" },
            { href: "/items", label: "Items", icon: "fas fa-tags" },
            { href: "/stock", label: "Stock", icon: "fas fa-cogs" },
            { href: "/createOrders", label: "Create Orders", icon: "fas fa-wrench" },
            { href: "/orders", label: "Orders", icon: "fas fa-wrench", isActive: true },
          ].map(({ href, label, icon, isActive }) => (
            <li key={label}>
              <a
                href={href}
                className={`block text-lg ${
                  isActive ? "text-white bg-teal-400" : "text-teal-700 bg-white"
                } hover:bg-teal-400 hover:text-white px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105`}
              >
                <i className={`${icon} mr-3`}></i>{label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
  
      <div className="flex-1 bg-gray-50 p-12 ml-64">
        <h1 className="text-5xl font-extrabold mb-6 text-teal-700">Welcome to the Orders</h1>
        <p className="text-xl text-gray-700">You Can See Orders.</p>
  
        <div className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 p-8 rounded-lg shadow-2xl">
          <p className="text-slate-800 text-2xl font-bold mb-4">Orders</p>
  
          <div>
            {orders.map((order) => (
              <div
                key={order.id}
                className={`m-2 p-4 rounded-lg relative overflow-hidden shadow-lg transition-transform duration-300 ease-in-out ${
                  expandedOrders[order.id] ? "bg-yellow-400" : "bg-yellow-300"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
                }}
                style={{
                  transform: expandedOrders[order.id] ? "translateY(-5px) scale(1.02)" : "translateY(0)",
                }}
                onClick={() => toggleExpand(order.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-800 font-bold text-lg">ID: {order.id}</p>
                    <p className="text-gray-800 font-bold text-lg">Items: {order.getItems}</p>
                    <p className="text-gray-800 font-bold text-lg">Total Price: Rs{order.totalPrice}</p>
                    <p className="text-gray-800 font-bold text-lg">Order Date: {new Date(order.orderDateTime).toLocaleString()}</p>
                  </div>
                  <div className="cursor-pointer">
                    <div
                      className="bg-blue-500 rounded-full w-8 h-8 flex justify-center items-center text-white text-lg shadow-lg transition-transform duration-200"
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      {expandedOrders[order.id] ? "▲" : "▼"}
                    </div>
                  </div>
                </div>
                {expandedOrders[order.id] && (
                  <div className="mt-2 bg-blue-50 p-2 rounded-lg shadow-md">
                    <p className="text-gray-800 font-bold mb-2">Ordered Products:</p>
                    <ul>
                      {order.orderedProducts.map((product, idx) => (
                        <li key={idx} className="text-gray-700 text-sm">
                          {product.name} - Rs{product.priceOneUnit} (Category: {product.category.name})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Orders;
