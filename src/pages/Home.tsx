import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import tkLogo from "../photos/tkLogo.jpg";
import home_1 from "../photos/home-1.jpg";
import home_2 from "../photos/home-2.jpg";
import home_3 from "../photos/home-3.jpg";
import home_4 from "../photos/home-4.jpg";
import home_5 from "../photos/home-5.jpg";
import home_6 from "../photos/home-6.jpg";
import { useAuth } from "../context/AuthContext";




function Home() {

  const [userName,setUserName] = useState<String>("");
  const { isAuthenticated, jwtToken } = useAuth();



  useEffect(() => {
    if (isAuthenticated) {
        const storedUsername = localStorage.getItem("username"); // Corrected key
        if (storedUsername) {
            setUserName(storedUsername);
        }
    }
}, [isAuthenticated]);

  
  const images = [home_1,home_2,home_3,home_4,home_5,home_6]; // Include all images here
  const captions = [
<p
  key="caption1"
  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 flex flex-col items-center p-8 text-white font-bold text-center"
>
  <h1 className="whitespace-nowrap text-4xl md:text-7xl">Hi, {userName}</h1>
  <h1 className="whitespace-nowrap text-lg md:text-6xl mt-4 md:mt-8">Welcome to Our Super Market</h1>
  <button
        key="button"
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className=" whitespace-nowrap mt-20 mb-10 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        Log Out
      </button></p>
,
    <p key="caption2"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 flex flex-col items-center  text-white font-bold text-center"
    >
      <h1 className="whitespace-nowrap text-lg md:text-6xl">You Want to Add New Admin?</h1>
      <button
        key="button"
        onClick={() => navigate("/signUp")}
        className=" whitespace-nowrap mt-10 mb-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        Add Admin
      </button>
</p>,
    <p
    key="caption3"
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 flex flex-col items-center rounded text-white font-bold text-center"
  >
    <h1 className="whitespace-nowrap text-lg md:text-6xl">
      You Want to Create Orders?
    </h1>
    <button
      key="button"
      onClick={() => navigate("/createOrders")}
      className=" whitespace-nowrap mt-10 mb-7 bg-red-600 text-white px-3 py-3 rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      Create Order
    </button>
  </p>,
    <p
    key="caption4"
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 flex flex-col items-center rounded text-white font-bold text-center"
  >
    <h1 className="whitespace-nowrap text-lg md:text-6xl">
      You Want to Add Items?
    </h1>
    <button
      key="button"
      onClick={() => navigate("/items")}
      className=" whitespace-nowrap mt-10 mb-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      Add Items
    </button>
  </p>,
    <p
    key="caption5"
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 flex flex-col items-center rounded text-white font-bold text-center"
  >
    <h1 className="whitespace-nowrap text-lg md:text-6xl">
      You Want to See Categories?
    </h1>
    <button
      key="button"
      onClick={() => navigate("/category")}
      className=" whitespace-nowrap mt-10 mb-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      See Categories
    </button>
  </p>,
    <p
      key="caption6"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 flex flex-col items-center rounded text-white font-bold text-center"
    >
      <h1 className="whitespace-nowrap text-lg md:text-6xl">
        You Want to See Orders?
      </h1>
      <button
        key="button"
        onClick={() => navigate("/orders")}
        className=" whitespace-nowrap mt-10 mb-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        See Order
      </button>
    </p>
  ]; // Add captions corresponding to each image
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <body className="font-sans antialiased bg-gradient-to-r from-green-100 to-blue-100">
        <div className="flex h-screen">
          <nav className="w-64 bg-[#d1fae5] text-gray-800 p-5 shadow-2xl rounded-r-3xl">
            <div className="flex items-center mb-5">
              <img src={tkLogo} alt="Logo" className="w-12 h-12 rounded-full" />
              <h2 className="text-3xl font-bold text-teal-700 ml-3">Dashboard</h2>
            </div>
            <ul className="space-y-8">
              <li>
                <a
                  href="/"
                  className="block text-lg text-white bg-teal-400 px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"

                >
                  <i className="fas fa-tags mr-3"></i>Home
                </a>
              </li>
              <li>
                <a
                  href="/category"
                  className="block text-lg text-teal-700 bg-white hover:bg-teal-400 hover:text-white px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"

                >
                  <i className="fas fa-tags mr-3"></i>Categories
                </a>
              </li>
              <li>
                <a
                  href="/items"
                  className="block text-lg text-teal-700 bg-white hover:bg-teal-400 hover:text-white px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
                >
                  <i className="fas fa-box mr-3"></i>Items
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
                  className="block text-lg text-teal-700 bg-white hover:bg-teal-400 hover:text-white px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
                >
                  <i className="fas fa-wrench mr-3"></i>Orders
                </a>
              </li>
            </ul>
          </nav>

          {/* Image Carousel Section */}
          <div className="flex-1 bg-gray-50 p-12 relative">
            <div className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-lg shadow-2xl relative">
              <div>
                <img
                  src={images[currentImageIndex]}
                  alt="Descriptive Text"
                  className="w-full h-[545px] rounded-md shadow-md"
                />
<div
  className="absolute inset-0 rounded-md bg-slate-400 opacity-70"
  style={{ filter: 'brightness(0.3)' }}
></div>


                {/* Overlay arrow buttons */}
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button
                    onClick={handlePreviousImage}
                    className=" text-white text-4xl p-2 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    &#171; {/* Left arrow (Unicode) */}
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="text-white text-4xl p-2 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    &#187; {/* Right arrow (Unicode) */}
                  </button>
                </div>
                {/* Caption Text in the Middle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl  bg-opacity-50 p-4 rounded">
                  {captions[currentImageIndex]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Home;


