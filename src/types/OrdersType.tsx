export interface Category {
    cateId: number;
    name: string;
}

// Define an interface for the Stock
export interface Stock {
    stockId: number;
    quantity: number;
    unit: string;
    formattedQuantity: string;
}

// Define an interface for each OrderedProduct
export interface OrderedProduct {
    itemId: number;
    name: string;
    priceOneUnit: number;
    category: Category;
    stock: Stock;
}

// Define the main interface for an Order
export default interface Order {
    id: number;
    getItems: number;
    totalPrice: number;
    orderDateTime: string;
    orderedProducts: OrderedProduct[];
}