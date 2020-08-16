import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {CartItem} from '../../model/cartItem';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalQuantity: number;
  totalPrice: number;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.getCartStatus();
  }

  private getCartStatus(){
    this.cartItems = this.cartService.getCartItems();
    this.cartService.totalQuantity.subscribe( data => this.totalQuantity = data);
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.computeTotals();
  }

  public increment(cartItem: CartItem){
    this.cartService.addToCart(cartItem);
  }

  decrement(item: CartItem) {
    this.cartService.decrementItem(item);
  }

  removeItem(item: CartItem){
    if (confirm('Chcesz usunąć produkt: ' + item.name + '?')){
      this.cartService.removeItem(item);
    }
  }
}
