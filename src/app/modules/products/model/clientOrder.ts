import {CartItemDto} from './cartItemDto';
import {CustomerDto} from './customerDto';
import {User} from '../../users/model/user';

export class ClientOrder {

  constructor(
    public cartItems: CartItemDto[],
    public customer: CustomerDto,
    public totalPrice: number,
    public totalQuantity: number,
    public username: string,
    public orderId?: number,
    public user?: User) {
  }
}
