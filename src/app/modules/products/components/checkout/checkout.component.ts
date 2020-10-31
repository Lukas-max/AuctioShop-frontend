import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CustomerDto } from '../../model/customerDto';
import { CartItemDto } from '../../model/cartItemDto';
import { ClientOrder } from '../../model/clientOrder';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { MessageToastrService } from '../../../../core/services/toastr/message-toastr.service';
import {JwtAuthenticationService} from '../../../../core/services/jwt_auth/jwt-authentication.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private cartItemDto: Array<CartItemDto> = [];
  private customer: CustomerDto;
  private username: string;
  totalPrice: number;
  totalQuantity: number;
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
  }

  private setForm(){
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        telephone: new FormControl(''),
        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
      }),
      address: this.formBuilder.group({
        country: [''],
        street: ['', [Validators.required]],
        houseNumber: ['', [Validators.required]],
        apartmentNumber: [''],
        postalCode: ['', [Validators.required]],
        city: ['', Validators.required]
      })
    });

    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    this.cartService.computeTotals();
  }

  /**
   * Submit form will take us to makeOrder() and it will take the cart products, customer data,
   * total price and quantity and put it into the ClientOrder class.
   */
  public submitForm(){
    this.makeOrder();
  }

  private makeOrder(){
    this.getUsername();
    this.formatCart();
    this.formatCustomer();
    const order = this.getOrder();

    this.orderService.postOrder(order).subscribe(data => {
      this.checkoutFormGroup.reset();
      this.cartService.clearCart();
      this.route.navigateByUrl(`purchase/${data.orderId}`);
      this.messageToastrService.success('Przyjęto zamówienie.');
    });
  }

  private getUsername() {
    if (this.jwtAuthenticationService.isLoggedIn() || this.jwtAuthenticationService.isAdminLoggedIn()){
      this.username = this.jwtAuthenticationService.getAuthenticatedUser();
    }
  }

  private formatCart(){
    this.cartService.getCartItems()
      .forEach(i => this.cartItemDto.push(new CartItemDto(i)));
  }

  private formatCustomer(){
    this.customer = new CustomerDto();
    this.customer.setFirstName(this.firstName.value);
    this.customer.setLastName(this.lastName.value);
    this.customer.setTelephone(this.telephone.value);
    this.customer.setEmail(this.email.value);
    this.customer.setCountry(this.country.value);
    this.customer.setStreet(this.street.value);
    this.customer.setHouseNumber(this.houseNumber.value);
    this.customer.setApartmentNumber(this.apartmentNumber.value);
    this.customer.setPostalCode(this.postalCode.value);
    this.customer.setCity(this.city.value);
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
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get telephone(){
    return this.checkoutFormGroup.get('customer.telephone');
  }

  get email(){
    return this.checkoutFormGroup.get('customer.email');
  }

  get country(){
    return this.checkoutFormGroup.get('address.country');
  }

  get street(){
    return this.checkoutFormGroup.get('address.street');
  }

  get houseNumber(){
    return this.checkoutFormGroup.get('address.houseNumber');
  }

  get apartmentNumber(){
    return this.checkoutFormGroup.get('address.apartmentNumber');
  }

  get postalCode(){
    return this.checkoutFormGroup.get('address.postalCode');
  }

  get city(){
    return this.checkoutFormGroup.get('address.city');
  }
}
