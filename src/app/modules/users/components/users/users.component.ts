import { Component, OnInit } from '@angular/core';
import { ClientOrder } from '../../../products/model/clientOrder';
import { OrderService } from '../../../products/services/order.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
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
    this.orderService.fetchOrders(this.page - 1, this.size)
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
