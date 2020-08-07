import { Product } from './product';

export class CartItem {
  id: number;
  name: string;
  unitPrice: number;
  productImage: Int8Array;
  quantity: number;

  constructor(product: Product) {
    this.id = product.productId;
    this.name = product.name;
    this.unitPrice = product.unitPrice;
    this.productImage = product.productImage;
    this.quantity = 1;
  }
}
