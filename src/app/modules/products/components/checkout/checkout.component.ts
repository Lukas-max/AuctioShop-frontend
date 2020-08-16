import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number;
  totalQuantity: number;
  checkoutFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        telephone: [''],
        email: ['', Validators.required]
      }),
      address: this.formBuilder.group({
        country: [''],
        street: [''],
        houseNumber: [''],
        apartmentNumber: [''],
        postalCode: [''],
        city: ['']
      })
    });

    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    this.cartService.computeTotals();
  }

  public submitForm(){
    console.log(this.checkoutFormGroup);
  }
}
