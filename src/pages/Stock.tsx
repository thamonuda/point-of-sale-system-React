import axios from "axios";
import { useEffect, useState } from "react";
import StockType from "../types/StockType";
import ItemType from "../types/ItemType";
import Swal from "sweetalert2";
import tkLogo from "../photos/tkLogo.jpg";
import { useAuth } from "../context/AuthContext";


function Stock() {

  const {isAuthenticated,jwtToken} = useAuth();
  
  const [stock, setStock] = useState<StockType[]>([]);
  const [items, setItems] = useState<ItemType[]>([]);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [priceOneUnit, setPriceOneUnit] = useState<number >(0);
  const [unit, setUnit] = useState<String>("Select Unit");
  const [formattedQuantity, setFormattedQuantity] = useState<string>("N/A");
  const [name,setName] = useState<String>("Select Item");
  const [quantity,setQuantity] = useState<number | string>("Select Item");
  const [id, setId] = useState<number | null>();

  const config = {
    headers: {
        Authorization: `Bearer ${jwtToken}`
    }
}

  // Function to load items
  async function loadItems() {
    try {
      const response = await axios.get("http://localhost:9002/items",config);
      console.log("Items loaded:", response.data); // Debugging log
      setItems(response.data); // Set the fetched data to state
    } catch (error) {
      console.error("Error fetching items", error);
    }
  }


  // Function to load stock
  async function loadStock() {
    try {
      const response = await axios.get("http://localhost:9002/stock",config);
      console.log("Stock loaded:", response.data); // Debugging log
      setStock(response.data);
      // Set the fetched data to state
    } catch (error) {
      console.error("Error fetching stock", error);
    }
  }

  // useEffect to load data when the component mounts
  useEffect(() => {
    if(isAuthenticated){
    loadItems(); // Call loadItems
    loadStock(); // Call loadStock
    }
  }, [isAuthenticated]); // Empty dependency array to run once on mount




  function handleRowClick(item:ItemType): void {
    console.log(stock);
    console.log(item);
    setName(item.name);
    setQuantity(item.stock.quantity)
    setUnit(item.stock.unit);
    setFormattedQuantity(item.stock.formattedQuantity);
    setId(item.itemId);
    setPriceOneUnit(item.priceOneUnit);
    setCategoryId(item.category.cateId);

  }
  function handleQuantity(event: any) {
    setQuantity(event.target.value);
  };

    function handleUnit(event: any) {
    setUnit(event.target.value);
  };


  async function handleUpdate() {
    

  const data = {
      name: name,
      priceOneUnit: priceOneUnit,
      category_Id: categoryId,
      quantity: quantity,
      unit: unit,
  };

  try {
      const response = await axios.put(`http://localhost:9002/items/${id}`, data,config);
      console.log("Item update:", response);
      
      // Success message
      await Swal.fire({
          title: 'Success!',
          text: 'Item updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
      });

      loadItems();
      setCategoryId(0);
      setName("Select Item")
      setPriceOneUnit(0);
      setQuantity(0);
      setUnit("Select Unit");
      setFormattedQuantity("N/A");
  } catch (error) {
      console.error("Error updating item", error);
      
      // Error message
      await Swal.fire({
          title: 'Error!',
          text: 'There was an issue updating the item.',
          icon: 'error',
          confirmButtonText: 'OK',
      });
  }  }

  return (
    <div>
      <div className="font-sans antialiased bg-gradient-to-r from-green-100 to-blue-100">
        <div className="flex h-screen  ">
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
                    className="block text-lg text-white bg-teal-400 px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
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
          </div>

          <div className="flex-1 bg-gray-50 p-12" style={{ paddingLeft: '320px' }}>
            <h1 className="text-5xl font-extrabold mb-6 text-teal-700">Welcome to the Stock</h1>
            <p className="text-xl text-gray-700 ">You Can See and Edit Stock.</p>
            <h6 className="text-sm text-gray-500 mb-6">(Click Table Row for Edit Stock.)</h6>

            {/* Updated Item List with flex-wrap */}
            <div className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 p-8 rounded-lg shadow-2xl">
              <p className="text-slate-800 text-2xl font-bold mb-4">Stock</p>
              <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden table-fade-in">
               <thead>
                 <tr className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 text-white uppercase text-sm leading-normal">
                   <th className="py-4 px-6 text-left font-bold">Item</th>
                   <th className="py-4 px-6 text-left font-bold">Stock</th>
                 </tr>
               </thead>
               <tbody className="text-gray-800 text-sm">
  {items.map((item, index) => (
    <tr
      key={item.itemId}
      onClick={() => handleRowClick(item)} // Updated onClick handler
      className={`${index % 2 === 0 ? "bg-blue-50" : "bg-white"} 
                  border-b border-gray-200 transition-transform 
                  duration-300 ease-in-out transform hover:scale-105 
                  hover:shadow-lg hover:bg-blue-100 cursor-pointer`}
    >
      <td className="py-4 px-6 text-left">
        <span className="font-semibold text-indigo-700">{item.name}</span>
      </td>
      <td className="py-4 px-6 text-left font-semibold text-purple-700">
        {item.stock.formattedQuantity}
      </td>
    </tr>
  ))}
</tbody>
             </table>

            </div>


            {/* Form to Create or Update Items */}
            <div className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 p-8 rounded-lg shadow-2xl my-7">
              <p className="text-slate-800 text-2xl font-bold mb-4">
                Update Stock
              </p>
              <div>
                <form>

                <label style={{ fontWeight: '500' }} className="text-slate-600 font-sm block mb-2">Item Name</label>
                  <label className="text-slate-600 font-sm block mb-3 w-80 p-2 border border-slate-300 rounded-lg">
                    {name}
                  </label>

                  <label style={{ fontWeight: '500' }} className="text-slate-600 font-sm block mb-2">Select Unit</label>
                  <select
                    value={unit.toString()}
                    onChange={handleUnit}
                    className="border border-gray-300 rounded p-2 w-80 bg-white cursor-pointer"
                  >
                    <option value="">Select Unit</option>
                    <option value="KG">KG</option>
                    <option value="ML">ML</option>
                    <option value="UNIT">UNIT</option>
                  </select>
                  <label style={{ fontWeight: '500' }} className="text-slate-600 block mb-2">Quantity</label>
                  <input
                    type="text"
                    className="text-slate-600 font-sm  mb-3 w-80 p-2 border border-slate-300 rounded-lg mr-9"
                    onChange={handleQuantity}
                    value={quantity ?? "null"}
                    required

                  />
                  <label style={{ fontWeight: '500' }} className="text-slate-600  mb-2">{formattedQuantity}</label>

                  <button
                      type="button"
                      className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm block"
                      onClick={handleUpdate}
                    >
                      Update Item
                    </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stock;

