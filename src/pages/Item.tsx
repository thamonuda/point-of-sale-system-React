import { useEffect, useState } from "react";
import axios from "axios";
import ItemType from "../types/ItemType"; // Ensure correct path
import '../animations.css';
import CategoryType from "../types/CategoryType";
import tkLogo from "../photos/tkLogo.jpg";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

function Items() {

  const {isAuthenticated,jwtToken} = useAuth();
  
  const [items, setItems] = useState<ItemType[]>([]); // Initialize state to store items
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemEditing, setItemEditing] = useState<ItemType | null>(null);
  const [itemName, setItemName] = useState<string>("");
  const [priceOneUnit, setPriceOneUnit] = useState<number >(0);
  const [category, setCategory] = useState<string>("Select Category");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [id, setId] = useState<number | null>();
  const [quantity, setQuantity] = useState<number >(0);
  const [unit, setUnit] = useState<String>("Select Unit");
  const [formattedQuantity, setFormattedQuantity] = useState<string>("N/A");
  const [allCategories, setAllCategories] = useState<CategoryType[]>([]); // State for categories


  const config = {
    headers: {
        Authorization: `Bearer ${jwtToken}`
    }
}


  async function loadCategories() {
    try {
      const response = await axios.get("http://localhost:9002/categories",config);
      console.log("Categories loaded:", response.data); // Debugging log
      setAllCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  }

  async function loadItems() {
    try {
      const response = await axios.get("http://localhost:9002/items",config);
      console.log("Items loaded:", response.data); // Debugging log
      setItems(response.data); // Set the fetched data to state
    } catch (error) {
      console.error("Error fetching items", error);
    }
  }
  useEffect(() => {
    if(isAuthenticated){
    loadCategories() ,loadItems(); // Call the function to load items
    }
  }, [isAuthenticated]); // Empty dependency array means this effect runs once after initial render


  function handleRowClick(item: ItemType): void {
      console.log("Editing Item:", item); // Log the item being edited
      setItemEditing(item);
      setItemName(item.name);
      setCategory(item.category.name);
      setPriceOneUnit(item.priceOneUnit);
      setQuantity(item.stock.quantity);
      setUnit(item.stock.unit);
      setId(item.itemId);
      setCategoryId(item.category.cateId);
      setFormattedQuantity(item.stock.formattedQuantity ?? "N/A");
  
      // Show confirmation message
      Swal.fire({
          title: 'Editing Item',
          text: `You are now editing ${item.name}.`,
          icon: 'info',
          confirmButtonText: 'OK',
      });
  }
  
  function handleItemName(event: any) {
    setItemName(event.target.value);
  }

  function handleCategory(event: any) {
    setCategory(event.target.value);
  }

  

  async function handleUpdate() {
      if (!id) {
          console.error("No category Id available for updating");
          return;
      }
  
      const data = {
          name: itemName,
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
          setCategory("Select Category");
          setItemName("");
          setItemEditing(null);
          setPriceOneUnit(0);
          setId(null);
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
      }
  }
  
  function handleCategoryId(event:any) {
    const selectedCategoryId = parseInt(event.target.value); // Convert the value to a number
    setCategoryId(selectedCategoryId);
  }
  

  async function handleCreate() {
    if(itemName !=null){
      const data = {
        name: itemName,
        priceOneUnit: priceOneUnit,
        category_Id: categoryId,
        quantity: quantity,
        unit: unit
      }
      try {
        const response = await axios.post("http://localhost:9002/items", data,config);
        console.log("Item created:", response);
        loadItems();
        setCategory("Select Category");
        setItemName("");
        setItemEditing(null);
        setPriceOneUnit(0);
        setId(null);
        setQuantity(0);
        setUnit("Select Unit");
        setFormattedQuantity("N/A");
  
      } catch (error) {
        console.error("Error creating item", error);
  
      }
    }
   
  }

  function handleUnit(event: any) {
    setUnit(event.target.value);
  };

  function handleQuantity(event: any) {
    setQuantity(event.target.value);
  };
  function handlePriceOneUnit(event: any) {
    setPriceOneUnit(event.target.value);
  };

  async function handleDelete(itemId: number) {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete this item!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
        try {
            const response = await axios.delete(`http://localhost:9002/items/${itemId}`,config);
            console.log(response);
            loadItems(); // Refresh the list after deletion
            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    } else {
        console.log("Delete action was canceled.");
    }
}
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
                  className="block text-lg text-white bg-teal-400 px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
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
          </div>

          <div className="flex-1 bg-gray-50 p-12" style={{ paddingLeft: '320px' }}>
            <h1 className="text-5xl font-extrabold mb-6 text-teal-700">Welcome to the Items</h1>
            <p className="text-xl text-gray-700 ">You Can Create or Edit Items.</p>
            <h6 className="text-sm text-gray-500 mb-6">(Click Table Row for Edit Item.)</h6>

            {/* Updated Item List with flex-wrap */}
            <div className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 p-8 rounded-lg shadow-2xl">
              <p className="text-slate-800 text-2xl font-bold mb-4">Items</p>
              {items.length > 0 ? (
               <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden table-fade-in">
               <thead>
                 <tr className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 text-white uppercase text-sm leading-normal">
                   <th className="py-4 px-6 text-left font-bold">Name</th>
                   <th className="py-4 px-6 text-left font-bold">Price</th>
                   <th className="py-4 px-6 text-left font-bold">Category</th>
                   <th className="py-4 px-6 text-left font-bold">Stock</th>
                   <th className="py-4 px-6 text-left font-bold">Remove</th> {/* Fixed typo */}
                 </tr>
               </thead>
               <tbody className="text-gray-800 text-sm">
                 {items.map((item, index) => (
                   <tr
                     key={item.itemId}
                     onClick={() => handleRowClick(item)} // Add onClick handler
                     className={`${index % 2 === 0 ? "bg-blue-50" : "bg-white"} 
                                 border-b border-gray-200 transition-transform 
                                 duration-300 ease-in-out transform hover:scale-105 
                                 hover:shadow-lg hover:bg-blue-100 cursor-pointer`}
                   >
                     <td className="py-4 px-6 text-left">
                       <span className="font-semibold text-indigo-700">{item.name}</span>
                     </td>
                     <td className="py-4 px-6 text-left">
                       <span className="font-semibold text-blue-600">
                         {item.priceOneUnit}{" "}
                         {item.stock ? (
                           item.stock.unit === "KG" ? "Per 1 KG" :
                           item.stock.unit === "ML" ? "Per 1 ML" :
                           item.stock.unit === "UNIT" ? "Per 1 UNIT" : ""
                         ) : (
                           "Unit not available"
                         )}
                       </span>
                     </td>
                     <td className="py-4 px-6 text-left font-semibold text-purple-700">
                       {item.category.name}
                     </td>
                     <td className="py-4 px-6 text-left font-semibold">
                       {item.stock ? item.stock.formattedQuantity : "N/A"}
                     </td>
                     <td className="py-4 px-6 text-left">
                       {/* Delete button */}
                       <button
                         onClick={(e) => {
                           e.stopPropagation(); // Prevent row click
                           handleDelete(item.itemId); // Trigger delete function
                         }}
                         className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
                       >
                         Delete
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
             

              ) : (
                <p className="text-white">No items available.</p>
              )}
            </div>


            {/* Form to Create or Update Items */}
            <div className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 p-8 rounded-lg shadow-2xl my-7">
              <p className="text-slate-800 text-2xl font-bold mb-4">
                {itemEditing ? "Edit Item" : "Create Item"}
              </p>
              <div>
                <form>
                  <label style={{ fontWeight: '500' }} className="text-slate-600 font-sm block mb-2">Item Name</label>
                  <input
                    type="text"
                    className="text-slate-600 font-sm block mb-3 w-80 p-2 border border-slate-300 rounded-lg"
                    onChange={handleItemName}
                    value={itemName}
                    required
                  />
                  <label style={{ fontWeight: '500' }} className="text-slate-600 font-sm block mb-2">Select Category </label>
                  <select
                    value={categoryId.toString()} // Convert categoryId to string for value
                    onChange={handleCategoryId}
                    className="border border-gray-300 rounded p-2 w-80 bg-white cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    {allCategories.map((category) => (
                      <option key={category.cateId} value={category.cateId}>
                        {category.name}
                      </option>
                    ))}
                  </select>

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
                  <label className="text-gray-700 font-bold">{quantity}{unit}</label>

                  <label style={{ fontWeight: '500' }} className="text-slate-600 font-sm block mb-2">PRICE ONE {unit}</label>
                  <input
                    type="text"
                    className="text-slate-600 font-sm  mb-3 w-80 p-2 border border-slate-300 rounded-lg mr-9"
                    onChange={handlePriceOneUnit}
                    value={priceOneUnit ?? "null"}
                    required

                  />



                  {itemEditing ? (
                    <button
                      type="button"
                      className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm block"
                      onClick={handleUpdate}
                    >
                      Update Item
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm"
                      onClick={handleCreate}
                    >
                      Create Item
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Items;


