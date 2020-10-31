import { Component, OnInit } from '@angular/core';
import {ClientOrder} from '../../../products/model/clientOrder';
import {OrderService} from '../../../products/services/order.service';
import {MessageToastrService} from '../../../../core/services/toastr/message-toastr.service';

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

  constructor(
    private orderService: OrderService,
    private messageToastrService: MessageToastrService) { }

  ngOnInit(): void {
    this.page = 1;
    this.size = 20;
    this.getOrders();
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
    if (confirm('Czy chcesz usunąć zamówienie numer: ' + orderId + '?')){
    this.orderService.deleteOrderByOrderId(orderId).subscribe(() => {
      this.getOrders();
      this.messageToastrService.success('Pomyślnie usunięto zamówienie numer: ' + orderId);
    });
    }
  }
}
