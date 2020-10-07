import { Component, OnInit } from '@angular/core';
import {CartService} from '../../modules/products/services/cart.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartFromStorage();
  }

}
