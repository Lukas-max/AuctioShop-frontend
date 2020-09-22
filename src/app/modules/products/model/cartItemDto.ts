import {CartItem} from './cartItem';

export class CartItemDto {
  productId: number;
  name: string;
  unitPrice: number;
  quantity: number;

  constructor(item: CartItem) {
    this.productId = item.productId;
    this.name = item.name;
    this.unitPrice = item.unitPrice;
    this.quantity = item.quantity;
  }
}
