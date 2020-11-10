import { Component, OnInit } from '@angular/core';
import { ClientOrder } from '../../../products/model/clientOrder';
import { OrderService } from '../../../products/services/order.service';
import { MessageToastrService } from '../../../../core/services/toastr/message-toastr.service';
import { CartService } from '../../../products/services/cart.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: ClientOrder[];
  page: number;
  size: number;
  totalElements: number;
  screenWidth: number = window.innerWidth;

  constructor(
    private orderService: OrderService,
    private messageToastrService: MessageToastrService,
    private cartService: CartService,
    private location: Location) { }

  ngOnInit(): void {
    this.page = 1;
    this.size = 20;
    this.getOrders();
    this.cartService.getCartFromStorage();
  }
// api/order
  public getOrders(){
    this.orderService.fetchOrders(this.page - 1, this.size)
      .subscribe(this.processResponse());
  }

  private processResponse(){
    return orderData => {
      this.orders = orderData.content;
      this.totalElements = orderData.totalElements;
    };
  }

  public deleteOrderById(orderId: number){
    if (confirm('Do you want to delete order number: ' + orderId + '?')){
    this.orderService.deleteOrderByOrderId(orderId).subscribe(() => {
      this.getOrders();
      this.messageToastrService.success('Erased order number: ' + orderId);
    });
    }
  }

  public goBack(){
    this.location.back();
  }
}
