import { useState, useEffect } from "react";
import CategoryType from "../types/CategoryType";
import axios from "axios";
import Swal from "sweetalert2";
import tkLogo from "../photos/tkLogo.jpg";
import { useAuth } from "../context/AuthContext";

function Category() {

  const {isAuthenticated,jwtToken} = useAuth();
  
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryEditing, setCategoryEditing] = useState<CategoryType | null>(null);
  const [cateId, setCateId] = useState<number | undefined>();

  const config = {
    headers: {
        Authorization: `Bearer ${jwtToken}`
    }
}

  // Load categories from the API
  async function loadCategories() {
    try {
      const response = await axios.get("http://localhost:9002/categories",config);
      console.log("Categories loaded:", response.data); // Debugging log
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  }

  useEffect(() => {
    if(isAuthenticated){
    loadCategories();
    }
  }, [isAuthenticated]);

  // Set the category to edit
  function handleCategoryClick(category: CategoryType): void {
    console.log("Editing category:", category); // Debugging log
    setCategoryEditing(category);
    setCategoryName(category.name);
    setCateId(category.cateId);

    // Show an alert when clicking on a category
    Swal.fire({
      title: `Editing ${category.name}`,
      text: "You can now edit this category.",
      icon: "info",
      confirmButtonText: "OK",
    });
  }

  function handleCategoryName(event: any) {
    setCategoryName(event.target.value);
  }

  // Submit new category to the API
  async function handleSubmit() {
    const data = { name: categoryName };

    try {
      const response = await axios.post("http://localhost:9002/categories", data,config);
      console.log("Category created:", response); // Debugging log
      loadCategories(); // Reload categories after successful submission
      setCategoryName(""); // Reset the input field

      // Show success alert for creating a category
      Swal.fire({
        title: "Success!",
        text: "Category created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error creating category", error);
    }
  }

  // Update existing category
  async function handleUpdate() {
    console.log("Updating category with cateId:", cateId);

    if (!cateId) {
      console.error("No category cateId available for updating");
      return;
    }

    const data = { name: categoryName };

    try {
      const response = await axios.put(`http://localhost:9002/categories/${cateId}`, data,config);
      console.log("Update response:", response); // Debugging log
      loadCategories(); // Reload categories after successful update
      setCategoryEditing(null);
      setCategoryName(""); // Reset the input field
      setCateId(undefined); // Clear the cateId after updating

      // Show success alert for updating a category
      Swal.fire({
        title: "Success!",
        text: "Category updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating category", error);
    }
  }

  return (
    <div>
      <body className="font-sans antialiased bg-gradient-to-r from-green-100 to-blue-100">
        <div className="flex h-screen">
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
                  className="block text-lg text-white bg-teal-400 px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
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

          <div className="flex-1 bg-gray-50 p-12">
            <h1 className="text-5xl font-extrabold mb-6 text-teal-700">Welcome to the Categories</h1>
            <p className="text-xl text-gray-700 mb-6">You Can Create or Edit Categories.</p>

            <div className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 p-8 rounded-lg shadow-2xl">
              <p className="text-slate-800 text-2xl font-bold mb-4">Categories</p>
              <div>
                <ul className="flex flex-wrap gap-4">
                  {categories.map((category) => {
                    console.log("Category object:", category); // Log each category object
                    return (
                      <li
                        key={category.cateId}
                        className="bg-white text-teal-600 font-semibold px-2 py-1 my-1 rounded-full shadow-sm w-32 h-12 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 p-8 rounded-lg shadow-2xl my-7">
              <p className="text-slate-800 text-2xl font-bold mb-4">
                {categoryEditing ? "Edit Category" : "Create Category"}
              </p>
              <div>
                <form>
                  <label className="text-slate-600 font-sm block mb-2">Category Name</label>
                  <input
                    type="text"
                    className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg"
                    onChange={handleCategoryName}
                    value={categoryName}
                    required
                  />
                  {categoryEditing ? (
                    <button
                      type="button"
                      className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm"
                      onClick={handleUpdate}
                    >
                      Update Category
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm"
                      onClick={handleSubmit}
                    >
                      Create Category
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Category;
