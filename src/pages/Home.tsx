import { Link } from "react-router-dom";
import homePageVideo from "../video/homePage.mp4";
import { useEffect, useRef, useState } from "react";
import tkLogo from "../photos/tkLogo.jpg";

function Home() {

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set the playback speed to 50%
    }
  }, []);

  return (
    <div className="flex h-screen fixed h-full">
      <nav className="w-64 bg-[#d1fae5] text-gray-800 p-5 shadow-2xl rounded-r-3xl  ">
        <div className="flex items-center mb-5">
          <img src={tkLogo} alt="Logo" className="w-12 h-12 rounded-full" /> {/* Adjust size as needed */}
          <h2 className="text-3xl font-bold text-teal-700 ml-3">Dashboard</h2> {/* Added margin for spacing */}
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
              className="block text-lg text-teal-700 bg-white hover:bg-teal-400 hover:text-white px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
            >
              <i className="fas fa-wrench mr-3"></i>Orders
            </a>
          </li>
        </ul>
      </nav>


      <div className="flex-1 bg-gray-50 p-0">
  <div className="relative h-full w-full">
    <video
      ref={videoRef}
      src={homePageVideo}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
      style={{ opacity: 0.75 }} // Adjust this value for more or less transparency
    />
    {/* Dark overlay for better contrast */}
    <div className="absolute inset-0 bg-black opacity-60" />
  </div>

  <div className="absolute right-60 h-16 w-50" style={{ top: '350px' }}>
    <h1 className="text-5xl font-bold text-white drop-shadow-lg">
      <span
        className="bg-lime-600 text-white px-20 py-7 rounded-lg shadow-lg transform transition-transform duration-300"
        style={{ opacity: 0.7 }}
      >
        TK Point of Sale System
      </span>
    </h1>
  </div>
</div>

    </div>
  )
}

export default Home;