import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../model/product';
import {CartService} from '../../../services/cart.service';
import {CartItem} from '../../../model/cartItem';
import {ProductService} from '../../../services/product.service';
import {MessageToastrService} from '../../../../../core/services/toastr/message-toastr.service';
import {JwtAuthenticationService} from '../../../../auth/services/jwt_auth/jwt-authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  title = `Szczegóły produktu: `;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private messageToastrService: MessageToastrService,
    public jwtAuthenticationService: JwtAuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Second parameter of addToCart(product: Product) -> It's ProductItemComponent not CartDetailsComponent.
   * so -> isFromCartDetailsComp == false.
   * Till it's false Toastr will show messages if added to cart.
   */
  public addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem, false);
  }

  public deleteProductById(productId: number) {
    if (confirm('Czy na pewno chcesz usunąc ten produkt?')) {
      this.productService.deleteProductById(productId).subscribe(() => {
        this.router.navigate(['/']);
        this.messageToastrService.success('Pomyślnie usunięto produkt.');
      });
    }
  }
}
