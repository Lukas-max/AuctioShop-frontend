import {CartItemDto} from './cartItemDto';
import {CustomerDto} from './customerDto';

export class ClientOrder {

  constructor(
    private items: CartItemDto[],
    private customer: CustomerDto,
    private totalPrice: number,
    private totalQuantity: number,
    private clientId?: number) {
  }
}
