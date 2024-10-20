import { useEffect, useRef, useState } from "react";
import ItemType, { CategoryType } from "../../types/ItemType";
import axios from "axios";
import Swal from "sweetalert2";
import Orders from "./Orders";
import OrdersType from "../../types/OrdersType";
import tkLogo from "../../photos/tkLogo.jpg";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function createOrders() {

    const billRef = useRef<HTMLDivElement>(null);

    const [items, setItems] = useState<ItemType[]>([]);
    const [allCategories, setAllCategories] = useState<CategoryType[]>([]);
    const [quantity, setQuantity] = useState<number[]>([]);
    const [itemId, setItemId] = useState<number[]>([]);
    const [billerName, setBillerName] = useState<string>();
    const today = new Date().toLocaleDateString('en-CA');
    const [orders, setOrders] = useState<OrdersType[]>([]);
    const [lastOrderId, setLastOrderId] = useState<number>();
    const [itemNames, setItemNames] = useState<string[]>([]);
    const [price, setPrice] = useState<number[]>([]);
    const [priceOneUnit, setPriceOneUnit] = useState<number[]>([]);
    const [amount, setAmount] = useState<number[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>();

    useEffect(() => {
        const calculatedTotal = amount.reduce((sum, value) => sum + value, 0);
        setTotalAmount(calculatedTotal);
    }, [amount])

    useEffect(() => {
        if (orders.length > 0) {
            const lastOrder = orders[orders.length - 1];
            setLastOrderId(lastOrder.id + 1); // Assuming each order has an `id` property
        }
    }, [orders]);

    async function loadOrders() {
        try {
            const response = await axios.get("http://localhost:9002/order");
            console.log("Orders loaded:", response.data); // Debugging log
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    }

    async function loadCategories() {
        try {
            const response = await axios.get("http://localhost:9002/categories");
            console.log("Categories loaded:", response.data); // Debugging log
            setAllCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    }

    async function loadItems() {
        try {
            const response = await axios.get("http://localhost:9002/items");
            console.log("Items loaded:", response.data); // Debugging log
            setItems(response.data); // Set the fetched data to state
        } catch (error) {
            console.error("Error fetching items", error);
        }
    }
    useEffect(() => {
        loadCategories(), loadItems(), loadOrders();

    }, []);
    useEffect(() => {
        loadCategories(), loadItems(), loadOrders();

    }, [totalAmount]);



    async function createOrder() {
        // Call the function to load items
        console.log(itemId);
        console.log(quantity);
        try {
            // Prepare the data to be sent
            const orderData = {
                itemIds: itemId,  // Use the state holding the item IDs
                qty: quantity     // Use the state holding the quantities
            };

            // Send the POST request
            const response = await axios.post("http://localhost:9002/order", orderData);

            setTotalAmount(0);
            setAmount([]);
            setPriceOneUnit([]);
            setItemNames([]);
            setQuantity([]);
            setBillerName("");
            setItemId([]);

            // Handle success response
            console.log("Order created successfully:", response.data);
            Swal.fire({
                title: 'Order Created',
                text: 'Your order has been created successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

        } catch (error) {
            // Handle error response
            console.error("Error creating order:", error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to create the order. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }


    function handleRowClick(item: ItemType): void {
        console.log("Editing Item:", item);

        // Log the item being edited

        // Show confirmation message with an input field for quantity
        Swal.fire({
            title: 'Editing Item',
            text: `You are now editing ${item.name}. Please enter the quantity. (Available: ${item.stock.formattedQuantity})`,
            icon: 'info',
            input: 'number', // Use input type 'number' for quantity
            inputPlaceholder: 'Enter quantity',
            confirmButtonText: 'OK',
            showCancelButton: true,
            inputAttributes: {
                min: '1', // Minimum value allowed
                max: item.stock.formattedQuantity.toString(), // Maximum value set to available stock
                step: '1' // Step size (only allow whole numbers)
            },
            inputValidator: (value) => {
                const qty = Number(value);
                if (!value || isNaN(qty) || qty <= 0) {
                    return 'Please enter a valid quantity!';
                }
                if (qty > item.stock.quantity) {
                    return `You cannot enter more than ${item.stock.formattedQuantity}`;
                }
                return null;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const qty = Number(result.value);
                const qtyWithPrice = Number(qty * (item.priceOneUnit));
                // Get the entered quantity
                console.log(`Quantity entered: ${qty}`);

                setQuantity((prevQuantities) => [...prevQuantities, qty]);
                setItemId((prevItemId) => [...prevItemId, item.itemId]);
                setItemNames((prevItemNames) => [...prevItemNames, item.name]);
                setPriceOneUnit((prevPriseOneUnit) => [...prevPriseOneUnit, item.priceOneUnit]);
                setAmount((prevAmount) => [...prevAmount, qtyWithPrice]);
                // Proceed with the logic using the entered quantity
            }
        });
    }


    function handleItemName(event: any) {
        setBillerName(event.target.value);
    }

    const generatePDF = () => {
        const input = billRef.current;
        if (!input) {
            console.error("No input element found.");
            return; // Exit the function if `input` is null
        }

        html2canvas(input, { scale: 2 })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgWidth = 210; // A4 width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save('bill.pdf');
            })
            .catch((error) => {
                console.error("Error generating PDF: ", error);
            });
    };



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
                                        className="block text-lg text-white bg-teal-400 px-6 py-4 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"

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
                        <h1 className="text-5xl font-extrabold mb-6 text-teal-700">Welcome to the Create Order.</h1>
                        <p className="text-xl text-gray-700 pb-5">You Can Create Order Click Items.</p>


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
                                {"Select Items to prepare to bill"}
                            </p>
                            <div>
                                <div>
                                    <div >
                                        <body className="bg-gray-100 p-8">
                                            <div ref={billRef} className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                                                <header className="flex justify-between items-center border-b-2 border-blue-600 pb-4">
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-blue-600">Tk Super Market</h2>
                                                        <p>No: 27</p>
                                                        <p>Panadura, Sri Lanka, 2503</p>
                                                    </div>

                                                    <div>
                                                        <img
                                                            src={tkLogo}
                                                            alt="Company Logo"
                                                            className="w-20 h-20 object-cover rounded-full"
                                                        />
                                                    </div>
                                                </header>

                                                <div className="text-center my-8">
                                                    <h1 className="text-3xl font-semibold text-blue-600">The Bill</h1>
                                                </div>

                                                <section className="flex justify-between mb-8">
                                                    <div className="flex items-center space-x-2">
                                                        <p className="font-semibold text-gray-700">Customer Name:</p>
                                                        <input
                                                            id="customerName"
                                                            type="text"
                                                            className="text-slate-600 text-sm w-56 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                                            onChange={handleItemName}
                                                            value={billerName}
                                                            required
                                                        />
                                                    </div>

                                                    <div>
                                                        <p><span className="font-semibold">OrderId #:</span> {lastOrderId}</p>
                                                        <p><span className="font-semibold">Date:</span> {today}</p>
                                                    </div>
                                                </section>

                                                <table className="w-full border-collapse mb-8">
                                                    <thead>
                                                        <tr className="bg-blue-600 text-white">
                                                            <th className="p-4 text-left">Items</th>
                                                            <th className="p-4 text-left">Quantity</th>
                                                            <th className="p-4 text-left">Price One</th>
                                                            <th className="p-4 text-left">Discount</th>
                                                            <th className="p-4 text-left">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {itemNames.map((itemName, index) => (
                                                            <tr key={index} className="hover:bg-gray-100">
                                                                <td className="p-4">{itemName}</td>
                                                                <td className="p-4">{quantity[index]}&nbsp;*</td>
                                                                <td className="p-4">Rs.{priceOneUnit[index]}</td>
                                                                <td className="p-4">0</td>
                                                                <td className="p-4">Rs.{amount[index]}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>

                                                <section className="mb-8">
                                                    <p className="font-semibold">Notes:</p>
                                                    <p className="italic bg-gray-50 p-4 rounded-lg border border-gray-200">We APPRECIATE {billerName}. Thank you for doing business with TK.</p>
                                                </section>

                                                <footer className="border-t-2 border-blue-600 pt-4">
                                                    <div className="flex justify-between items-center">
                                                        <p className="text-lg font-bold">Total:</p>
                                                        <p className="text-lg font-bold">Rs.{totalAmount}</p>
                                                    </div>
                                                    <p className="text-center text-sm text-gray-500 mt-2">Powered by TK</p>

                                                </footer>
                                            </div>

                                            <div className="flex justify-end mt-4">
                                                <button
                                                    type="button"
                                                    onClick={createOrder}
                                                    className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow transform transition duration-200 ease-in-out hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
                                                >
                                                    Create Order
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={generatePDF}
                                                    className="bg-blue-500 text-white font-bold py-2 px-6 ml-4 rounded-lg shadow transform transition duration-200 ease-in-out hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                >
                                                    Download PDF
                                                </button>
                                            </div>
                                        </body>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default createOrders;