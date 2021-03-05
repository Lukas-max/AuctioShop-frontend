import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CustomerDto } from '../../model/customerDto';
import { CartItemDto } from '../../model/cartItemDto';
import { ClientOrder } from '../../model/clientOrder';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { MessageToastrService } from '../../../../core/services/toastr/message-toastr.service';
import {JwtAuthenticationService} from '../../../auth/services/jwt_auth/jwt-authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private cartItemDto: Array<CartItemDto> = [];
  private customer: CustomerDto;
  private username: string;
  totalPrice: number;
  totalQuantity: number;
  subscribePrice: Subscription;
  subscribeQuantity: Subscription;
  checkoutFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private route: Router,
    private messageToastrService: MessageToastrService,
    private jwtAuthenticationService: JwtAuthenticationService) { }

  ngOnInit(): void {
    this.cartService.getCartFromStorage();
    this.setForm();
    this.uploadCartInfo();
  }

  private setForm(){
    this.checkoutFormGroup = this.formBuilder.group({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        telephone: new FormControl(''),
        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
        country: [''],
        street: ['', [Validators.required]],
        houseNumber: ['', [Validators.required]],
        apartmentNumber: [''],
        postalCode: ['', [Validators.required]],
        city: ['', Validators.required]
    });
  }

  private uploadCartInfo(){
    this.subscribePrice = this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.subscribeQuantity = this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    this.cartService.computeTotals();
  }

  /**
   * Submit form will take us to makeOrder() and it will take the cart products, customer data,
   * total price and quantity and put it into the ClientOrder class. Last it will send the order to the server.
   */
  public submitForm(){
    this.getUsername();
    this.formatCart();
    this.customer = this.checkoutFormGroup.value;
    const order = this.getOrder();

    this.orderService.postOrder(order).subscribe(() => {
      this.checkoutFormGroup.reset();
      this.cartService.clearCart();
      this.route.navigate(['/']);
      this.messageToastrService.success('Przyjęto zamówienie.');
    });
  }

  private getUsername() {
    if (this.jwtAuthenticationService.isLoggedIn() || this.jwtAuthenticationService.isAdminLoggedIn()){
      this.username = this.jwtAuthenticationService.getAuthenticatedUser();
    }
  }

  private formatCart(){
    this.cartService.getCartItems().forEach(i => this.cartItemDto.push(new CartItemDto(i)));
  }

  private getOrder(): ClientOrder{
    return new ClientOrder(
      this.cartItemDto,
      this.customer,
      this.totalPrice,
      this.totalQuantity,
      this.username
    );
  }

  /**
   * Getters for reactive form:
   */
  get firstName(){
    return this.checkoutFormGroup.get('firstName');
  }

  get lastName(){
    return this.checkoutFormGroup.get('lastName');
  }

  get telephone(){
    return this.checkoutFormGroup.get('telephone');
  }

  get email(){
    return this.checkoutFormGroup.get('email');
  }

  get country(){
    return this.checkoutFormGroup.get('country');
  }

  get street(){
    return this.checkoutFormGroup.get('street');
  }

  get houseNumber(){
    return this.checkoutFormGroup.get('houseNumber');
  }

  get apartmentNumber(){
    return this.checkoutFormGroup.get('apartmentNumber');
  }

  get postalCode(){
    return this.checkoutFormGroup.get('postalCode');
  }

  get city(){
    return this.checkoutFormGroup.get('city');
  }

  ngOnDestroy(): void {
    this.subscribePrice.unsubscribe();
    this.subscribeQuantity.unsubscribe();
  }
}
