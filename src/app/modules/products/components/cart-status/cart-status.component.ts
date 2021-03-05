import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit, OnDestroy {
  public totalQuantity: number;
  subscriber: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  private updateCartStatus(){
    this.subscriber = this.cartService.totalQuantity.subscribe( data => {
      this.totalQuantity = data;
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
