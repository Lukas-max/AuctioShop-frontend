import { Injectable } from '@angular/core';
import { CartItem } from '../model/cartItem';
import { Subject } from 'rxjs';

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

  constructor() {
    this.totalPriceValue = 0;
    this.totalQuantityValue = 0;
  }

  // public addToCart(cartItem: CartItem){
  //   if (this.cartItems.length > 0) {
  //     for (const item of this.cartItems){
  //       if (item.id === cartItem.id){
  //         this.alreadyExistsInCart = true;
  //         item.quantity++;
  //         break;
  //       }
  //     }
  //     if (this.alreadyExistsInCart === false){
  //       this.cartItems.push(cartItem);
  //     }
  //
  //   }else {
  //     this.cartItems.push(cartItem);
  //   }
  //
  //   this.alreadyExistsInCart = false;
  //   this.computeTotals();
  // }

  public addToCart(cartItem: CartItem){
    let existingItem: CartItem;

    if (this.cartItems.length > 0){
      // jeśli nie znajdzie w tablicy zwracas undefined
      existingItem = this.cartItems.find(item => item.id === cartItem.id);
    }
    this.alreadyExistsInCart = (existingItem !== undefined);

    if (this.alreadyExistsInCart){
      existingItem.quantity++;
    }else {
      this.cartItems.push(cartItem);
    }

    this.alreadyExistsInCart = false;
    this.computeTotals();
  }

  // HELPER METHODS:
  public computeTotals(){
    this.totalPriceValue = 0;
    this.totalQuantityValue = 0;

    for (const item of this.cartItems){
      this.totalPriceValue += item.unitPrice * item.quantity;
      this.totalQuantityValue += item.quantity;
    }

    this.totalQuantity.next(this.totalQuantityValue);
    this.totalPrice.next(this.totalPriceValue);
  }

  public decrementItem(cartItem: CartItem){
    cartItem.quantity--;

    if (cartItem.quantity === 0){
      if (confirm('Czy chcesz usunąć produkt: ' + cartItem.name + '?')){
        this.removeItem(cartItem);
      }else {
        cartItem.quantity++;
      }
    }else {
      this.computeTotals();
    }
  }

  public removeItem(cartItem: CartItem){
    const index = this.cartItems.findIndex( item => item.id === cartItem.id);

    if (index > -1){
      this.cartItems.splice(index, 1);
    }
    this.computeTotals();
  }

  // GETTERS:
  public getCartItems(){
    return this.cartItems;
  }
}
