/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientOrder } from '../model/clientOrder';
import { API_URL } from '../../../app.consts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl: string = 'api/order';

  constructor(private http: HttpClient) { }

  public fetchOrders(page: number, size: number){
    const httpOptions = {
      params: {
        'page': page.toString(),
        'size': size.toString()
      }
    }
    return this.http.get(`${API_URL}/${this.orderUrl}`, httpOptions)
  }

  public fetchOrderByOrderId(id: number){
    return this.http.get(`${API_URL}/${this.orderUrl}/${id}`)
  }

  public deleteOrderByOrderId(orderId: number){
    return this.http.delete(`${API_URL}/${this.orderUrl}/${orderId}`);
  }

  public postOrder(order: ClientOrder): Observable<ClientOrder>{
    return this.http.post<ClientOrder>(`${API_URL}/${this.orderUrl}`, order);
  }
}
