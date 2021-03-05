import {Component, OnDestroy, OnInit} from '@angular/core';
import { CartService } from '../../services/cart.service';
import {CartItem} from '../../model/cartItem';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalQuantity: number;
  totalPrice: number;
  subscribeQuantity: Subscription;
  subscribePrice: Subscription;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.getCartFromStorage();
    this.getCartStatus();
  }

  private getCartStatus(){
    this.cartItems = this.cartService.getCartItems();
    this.subscribeQuantity = this.cartService.totalQuantity.subscribe( data => this.totalQuantity = data);
    this.subscribePrice = this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.computeTotals();
  }

  /**
   * Second parameter isFromCartDetailsComp is true. So it will turn off Toastr messeges when on
   * the cart page.
   */
  public increment(cartItem: CartItem){
    this.cartService.addToCart(cartItem, true);
  }

  decrement(item: CartItem) {
    this.cartService.decrementItem(item);
  }

  removeItem(item: CartItem){
    if (confirm('Chcesz usunąć produkt: ' + item.name + '?')){
      this.cartService.removeItem(item);
    }
  }

  ngOnDestroy(): void {
    this.subscribeQuantity.unsubscribe();
    this.subscribePrice.unsubscribe();
  }
}
