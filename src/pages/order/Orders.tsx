import axios from "axios";
import { useEffect, useState } from "react";
import OrdersType from "../../types/OrdersType";
import tkLogo from "../../photos/tkLogo.jpg";
import { useAuth } from "../../context/AuthContext";

function Orders() {
  const [expandedOrders, setExpandedOrders] = useState<{ [key: number]: boolean }>({});
  const [orders, setOrders] = useState<OrdersType[]>([]);

  const { isAuthenticated, jwtToken } = useAuth();
  
  const config = {
    headers: {
        Authorization: `Bearer ${jwtToken}`
    }
}

  async function loadOrders() {
    try {
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
    <div>
      <div className="font-sans antialiased bg-gradient-to-r from-green-100 to-blue-100">
        <div className="flex h-screen">
          <div className="flex h-screen fixed h-full">
            <nav className="w-64 bg-[#d1fae5] text-gray-800 p-5 shadow-2xl rounded-r-3xl">
            <div className="flex items-center mb-5">
                                <img src={tkLogo} alt="Logo" className="w-12 h-12 rounded-full" /> {/* Adjust size as needed */}
                                <h2 className="text-3xl font-bold text-teal-700 ml-3">Dashboard</h2> {/* Added margin for spacing */}
                            </div>
              <ul className="space-y-8">
                <li>
                  <a
                    href="/"
                    className="block text-lg text-teal-700 bg-white hover:bg-teal-400 hover:text-white px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
                  >
                    <i className="fas fa-tags mr-3"></i>Home
                  </a>
                </li>
                <li>
                  <a
                    href="/category"
                    className="block text-lg text-teal-700 bg-white hover:bg-teal-400 hover:text-white px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
                  >
                    <i className="fas fa-box mr-3"></i>Categories
                  </a>
                </li>
                <li>
                  <a
                    href="/items"
                    className="block text-lg text-teal-700 bg-white hover:bg-teal-400 hover:text-white px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
                  >
                    <i className="fas fa-tags mr-3"></i>Items
                  </a>
                </li>
                <li>
                  <a
                    href="/stock"
                    className="block text-lg text-teal-700 bg-white hover:bg-teal-400 hover:text-white px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
                  >
                    <i className="fas fa-cogs mr-3"></i>Stock
                  </a>
                </li>
                <li>
                  <a
                    href="/createOrders"
                    className="block text-lg text-teal-700 bg-white hover:bg-teal-400 hover:text-white px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
                  >
                    <i className="fas fa-wrench mr-3"></i>Create Orders
                  </a>
                </li>
                <li>
                  <a
                    href="/orders"
                    className="block text-lg text-white bg-teal-400 px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
                  >
                    <i className="fas fa-wrench mr-3"></i>Orders
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div
            className="flex-1 bg-gray-50 p-12"
            style={{ paddingLeft: "320px" }}
          >
            <h1 className="text-5xl font-extrabold mb-6 text-teal-700">
              Welcome to the Orders
            </h1>
            <p className="text-xl text-gray-700 ">You Can See Orders.</p>

            <div className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 p-8 rounded-lg shadow-2xl">
              <p className="text-slate-800 text-2xl font-bold mb-4">Orders</p>

              <div>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      margin: "10px",
                      padding: "15px",
                      backgroundColor: expandedOrders[order.id]
                        ? "rgb(252 211 77)"
                        : "rgb(253 230 138)",
                      borderRadius: "12px",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                      transition:
                        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      cursor: "pointer",
                      transform: expandedOrders[order.id]
                        ? "translateY(-5px) scale(1.02)"
                        : "translateY(0)",
                      minWidth: "250px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 15px 30px rgba(0, 0, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 10px 20px rgba(0, 0, 0, 0.2)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            color: "#333",
                            fontWeight: "700",
                            fontSize: "16px",
                          }}
                        >
                          ID: {order.id}
                        </p>
                        <p
                          style={{
                            color: "#333",
                            fontWeight: "700",
                            fontSize: "16px",
                          }}
                        >
                          Items: {order.getItems}
                        </p>
                        <p
                          style={{
                            color: "#333",
                            fontWeight: "700",
                            fontSize: "16px",
                          }}
                        >
                          Total Price: Rs{order.totalPrice}
                        </p>
                        <p
                          style={{
                            color: "#333",
                            fontWeight: "700",
                            fontSize: "16px",
                          }}
                        >
                          Order Date:{" "}
                          {new Date(order.orderDateTime).toLocaleString()}
                        </p>
                      </div>
                      <div onClick={() => toggleExpand(order.id)} style={{ cursor: "pointer" }}>
                        <div
                          style={{
                            backgroundColor: "#4A90E2",
                            borderRadius: "50%",
                            width: "35px",
                            height: "35px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontSize: "18px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                            transition: "transform 0.2s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.1)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        >
                          {expandedOrders[order.id] ? "▲" : "▼"}
                        </div>
                      </div>
                    </div>
                    {expandedOrders[order.id] && (
                      <div
                        style={{
                          marginTop: "10px",
                          backgroundColor: "#f0faff",
                          padding: "10px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <p
                          style={{
                            color: "#333",
                            fontWeight: "bold",
                            marginBottom: "8px",
                          }}
                        >
                          Ordered Products:
                        </p>
                        <ul>
                          {order.orderedProducts.map((product, idx) => (
                            <li
                              key={idx}
                              style={{ color: "#333", fontSize: "14px" }}
                            >
                              {product.name}  (Category :-
                              {product.category.name} )
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
    </div>
  );
}

export default Orders;
