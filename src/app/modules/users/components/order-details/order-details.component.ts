import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../products/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { ClientOrder } from '../../../products/model/clientOrder';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: ClientOrder;
  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.getOrderByOrderId();
    });
  }

  public getOrderByOrderId(){
    const check: boolean = this.activatedRoute.snapshot.paramMap.has('order_id');
    if (check){
      const orderId = +this.activatedRoute.snapshot.paramMap.get('order_id');
      this.orderService.fetchOrderByOrderId(orderId).subscribe(this.processResponse());
    }
  }

  private processResponse(){
    return order => {
      this.order = order;
    };
  }
}
