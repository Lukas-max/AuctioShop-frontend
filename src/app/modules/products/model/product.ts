export interface Product {
  productId?: number;
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  productImage: any;
  active: boolean;
  unitsInStock: number;
  dateTimeCreated: Date;
  dateTimeUpdated: Date;
  productCategoryId: number;
}
