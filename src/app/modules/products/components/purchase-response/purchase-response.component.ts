import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-response',
  templateUrl: './purchase-response.component.html',
  styleUrls: ['./purchase-response.component.css']
})
export class PurchaseResponseComponent implements OnInit {

  isOrderId: boolean;
  orderId: number;
  message: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isOrderId = false;
    this.orderId = undefined;
    this.message = undefined;
    this.activatedRoute.paramMap.subscribe(() => {
      this.sendInfo();
    });
  }

  private sendInfo(){
    this.isOrderId = this.activatedRoute.snapshot.paramMap.has('orderId');
    if (this.isOrderId){
      this.orderId = +this.activatedRoute.snapshot.paramMap.get('orderId');
    }else {
      this.message = 'Nie wysłano lub nie przyjęto zamówienia';
    }
  }
}
