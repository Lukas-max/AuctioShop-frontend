import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../products/services/order.service';
import {ClientOrder} from '../../../products/model/clientOrder';

@Component({
  selector: 'app-users-orders',
  templateUrl: './users-orders.component.html',
  styleUrls: ['./users-orders.component.css']
})
export class UsersOrdersComponent implements OnInit {
  orders: ClientOrder[];
  page: number;
  size: number;
  totalElements: number;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.page = 1;
    this.size = 20;
    this.getOrders();
  }

  public getOrders(){
    this.orderService.getOrders(this.page - 1, this.size)
      .subscribe(this.processResponse());
  }

  private processResponse(){
    return orderData => {
      this.orders = orderData.content;
      this.totalElements = orderData.totalElements;
      console.log(this.orders);
    };
  }
}
