export default interface StockType{
   stockId : number,
   quantity :number,
   unit : string,
   itemName : string;
   formattedQuantity: string;
   item : item;
   category : CategoryType;
}

export interface item{
   itemId: number;
   name: string;
   priceOneUnit: number;
   category: CategoryType;
   stock: StockType;
}
export interface CategoryType {
   cateId: number;
   name: string;
 }