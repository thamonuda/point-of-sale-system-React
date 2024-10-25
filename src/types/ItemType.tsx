
export interface CategoryType {
   cateId: number;
   name: string;
 }
 
 export interface StockType {
   stockId: number;
   quantity: number;
   unit: string;
   formattedQuantity: string;
 }
 
 export default interface ItemType {
   itemId: number;
   name: string;
   priceOneUnit: number;
   category: CategoryType;
   stock: StockType;
 }
 