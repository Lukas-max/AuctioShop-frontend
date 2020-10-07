import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cartItem';
import { JwtAuthenticationService } from '../../../../core/services/jwt_auth/jwt-authentication.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  activeMessage: string;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private linkRoute: Router,
              private cartService: CartService,
              private jwtAuthenticationService: JwtAuthenticationService) {
  }

  ngOnInit(): void {
    this.cartService.getCartFromStorage();
    this.route.paramMap.subscribe(() => {
      this.getProduct();
    });
  }

  private getProduct() {
    const productId: number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(productId).subscribe(data => {
      this.product = data;
      if (this.product.active) {
        this.activeMessage = 'Produkt dostępny';
      } else {
        this.activeMessage = 'Produkt niedostępny';
      }
    });
  }
  /**
   * Second parameter of addToCart(product: Product) -> It's ProductDetailsComponent not CartDetailsComponent.
   * so -> isFromCartDetailsComp == false.
   * Till it's false Toastr will show messages if added to cart.
   */
  public addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem, false);
  }

  public deleteProductById(productId: any) {
    if (confirm('Czy na pewno chcesz usunąc ten produkt?')) {
      this.productService.deleteProductById(productId).subscribe(() => {
        this.linkRoute.navigate(['products']);
      });
    }
  }

  public isAdminLoggedIn() {
    return this.jwtAuthenticationService.isAdminLoggedIn();
  }
}
