import { Product } from './product';

export class CartItem {
  productId: number;
  name: string;
  unitPrice: number;
  productImage: Int8Array;
  quantity: number;
  unitsInStock: number;

  constructor(product: Product) {
    this.productId = product.productId;
    this.name = product.name;
    this.unitPrice = product.unitPrice;
    this.productImage = product.productImage;
    this.quantity = 1;
    this.unitsInStock = product.unitsInStock;
  }
}
