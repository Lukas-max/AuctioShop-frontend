import {CartItem} from './cartItem';

export class CartItemDto {
  productId: number;
  name: string;
  quantity: number;

  constructor(item: CartItem) {
    this.productId = item.productId;
    this.name = item.name;
    this.quantity = item.quantity;
  }
}
