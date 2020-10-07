import {Injectable} from '@angular/core';
import {CartItem} from '../model/cartItem';
import {Subject} from 'rxjs';
import {MessageToastrService} from '../../../core/services/toastr/message-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Array<CartItem> = [];
  private alreadyExistsInCart: boolean;
  private totalPriceValue: number;
  private totalQuantityValue: number;

  totalQuantity: Subject<number> = new Subject<number>();
  totalPrice: Subject<number> = new Subject<number>();

  constructor(private messageToastrService: MessageToastrService) {
    this.totalPriceValue = 0;
    this.totalQuantityValue = 0;
  }

  public addToCart(cartItem: CartItem, isFromCartDetailsComp: boolean) {
    let existingItem: CartItem;

    if (this.cartItems.length > 0) {
      // jeśli nie znajdzie w tablicy zwraca undefined
      existingItem = this.cartItems.find(item => item.productId === cartItem.productId);
    }
    this.alreadyExistsInCart = (existingItem !== undefined);

    if (this.alreadyExistsInCart) {
      if (existingItem.unitsInStock > existingItem.quantity){
        existingItem.quantity++;
        this.message(isFromCartDetailsComp);
      }
    } else if (cartItem.unitsInStock > 0){
      this.cartItems.push(cartItem);
      this.message(isFromCartDetailsComp);
    }
    this.computeTotals();
  }

  // HELPER METHODS:
  public computeTotals() {
    this.totalPriceValue = 0;
    this.totalQuantityValue = 0;

    for (const item of this.cartItems) {
      this.totalPriceValue += item.unitPrice * item.quantity;
      this.totalQuantityValue += item.quantity;
    }

    this.totalQuantity.next(this.totalQuantityValue);
    this.totalPrice.next(this.totalPriceValue);

    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    localStorage.setItem('totalQuantity', this.totalQuantityValue.toString());
    localStorage.setItem('totalPrice', this.totalPriceValue.toString());
  }

  public decrementItem(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      if (confirm('Czy chcesz usunąć produkt: ' + cartItem.name + '?')) {
        this.removeItem(cartItem);
      } else {
        cartItem.quantity++;
      }
    } else {
      this.computeTotals();
    }
  }

  public removeItem(cartItem: CartItem) {
    const index = this.cartItems.findIndex(item => item.productId === cartItem.productId);

    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.computeTotals();
  }

  public clearCart() {
    this.cartItems.splice(0, this.cartItems.length);
    this.computeTotals();
  }

  public getCartFromStorage(){
    if (localStorage.getItem('cart') !== null &&
        localStorage.getItem('totalQuantity') !== null &&
        localStorage.getItem('totalPrice') !== null){
      this.cartItems = JSON.parse(localStorage.getItem('cart'));
      this.totalQuantityValue = +localStorage.getItem('totalQuantity');
      this.totalPriceValue = +localStorage.getItem('totalPrice');

      this.totalQuantity.next(this.totalQuantityValue);
      this.totalPrice.next(this.totalPriceValue);
    }
  }

  private message(isFromCartDetailsComp: boolean){
    if (!isFromCartDetailsComp) {
      this.messageToastrService.success('Dodano do koszyka');
    }
  }

  // GETTERS:
  public getCartItems() {
    return this.cartItems;
  }
}
