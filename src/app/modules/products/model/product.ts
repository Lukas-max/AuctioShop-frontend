export interface Product {
  product_id?: number;
  name: string;
  description: string;
  unitPrice: number;
  productImage: Int8Array;
  active: boolean;
  unitsInStock: number;
  dateTimeCreated: Date;
  dateTimeUpdated: Date;
}
