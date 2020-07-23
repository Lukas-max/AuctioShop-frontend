export interface Product {
  productId?: number;
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  productImage: Int8Array;
  active: boolean;
  unitsInStock: number;
  dateTimeCreated: Date;
  dateTimeUpdated: Date;
}
