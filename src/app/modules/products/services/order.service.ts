/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientOrder } from '../model/clientOrder';
import { API_URL,ORDER_URL } from '../../../app.consts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public fetchOrders(page: number, size: number){
    const httpOptions = {
      params: {
        'page': page.toString(),
        'size': size.toString()
      }
    }
    return this.http.get(`${API_URL}/${ORDER_URL}`, httpOptions)
  }

  public fetchOrderByOrderId(id: number){
    return this.http.get(`${API_URL}/${ORDER_URL}/${id}`)
  }

  public deleteOrderByOrderId(orderId: number){
    return this.http.delete(`${API_URL}/${ORDER_URL}/${orderId}`);
  }

  public postOrder(order: ClientOrder): Observable<ClientOrder>{
    return this.http.post<ClientOrder>(`${API_URL}/${ORDER_URL}`, order);
  }
}
