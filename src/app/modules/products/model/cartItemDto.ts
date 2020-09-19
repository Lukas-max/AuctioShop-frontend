import {CartItem} from './cartItem';

export class CartItemDto {
  id: number;
  name: string;
  quantity: number;

  constructor(item: CartItem) {
    this.id = item.id;
    this.name = item.name;
    this.quantity = item.quantity;
  }
}
